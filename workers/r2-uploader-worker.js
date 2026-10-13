/**
 * Cloudflare Worker: Padles R2 Media Uploader
 * 
 * Instructions:
 * 1. Create a Worker in Cloudflare Dashboard -> Workers & Pages -> Create Application -> Worker.
 * 2. Paste this code into the Worker editor.
 * 3. In Worker Settings -> Variables -> R2 Bucket Bindings:
 *    - Variable name: BUCKET
 *    - R2 Bucket: (select your R2 bucket)
 * 4. (Optional) Under Environment Variables:
 *    - Variable name: PUBLIC_CDN_BASE
 *    - Value: https://pub-xxxxxx.r2.dev (or your custom domain)
 * 5. Deploy the Worker and copy its URL (e.g. https://padles-r2.yourname.workers.dev).
 * 6. Paste the URL into padles `r2-config.js` or the Cloud Settings modal!
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // 1. POST / or POST /upload: Request upload URL or initiate presign
    if (request.method === 'POST') {
      try {
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
          const body = await request.json();
          const cleanName = (body.fileName || 'media').replace(/[^a-zA-Z0-9._-]/g, '_');
          const ext = cleanName.includes('.') ? cleanName.split('.').pop() : 'bin';
          const uniqueKey = `${body.boardId || 'board'}/${Date.now()}_${cleanName}`;
          
          const uploadUrl = `${url.origin}/upload/${encodeURIComponent(uniqueKey)}`;
          const publicUrl = env.PUBLIC_CDN_BASE 
            ? `${env.PUBLIC_CDN_BASE.replace(/\/+$/, '')}/${uniqueKey}`
            : uploadUrl;

          return new Response(JSON.stringify({
            presignedUrl: uploadUrl,
            publicUrl: publicUrl,
            key: uniqueKey
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 2. PUT /upload/:key: Binary stream directly into R2 bucket
    if (request.method === 'PUT') {
      try {
        const key = decodeURIComponent(url.pathname.replace(/^\/upload\//, ''));
        if (!key) {
          return new Response(JSON.stringify({ error: 'Missing object key' }), { status: 400, headers: corsHeaders });
        }

        const contentType = request.headers.get('content-type') || 'application/octet-stream';

        await env.BUCKET.put(key, request.body, {
          httpMetadata: { contentType }
        });

        const publicUrl = env.PUBLIC_CDN_BASE 
          ? `${env.PUBLIC_CDN_BASE.replace(/\/+$/, '')}/${key}`
          : `${url.origin}/upload/${encodeURIComponent(key)}`;

        return new Response(JSON.stringify({ success: true, key, publicUrl }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 3. GET /upload/:key: Direct read proxy if custom domain is not yet active
    if (request.method === 'GET') {
      try {
        const key = decodeURIComponent(url.pathname.replace(/^\/upload\//, ''));
        const object = await env.BUCKET.get(key);

        if (!object) {
          return new Response('Media attachment not found', { status: 404, headers: corsHeaders });
        }

        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return new Response(object.body, { headers });
      } catch (err) {
        return new Response('Error retrieving object', { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
