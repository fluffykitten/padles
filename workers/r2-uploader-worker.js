/**
 * Cloudflare Worker: Padles R2 Media Uploader (Multi-User Production Ready)
 * 
 * Features:
 * 1. Multi-User Partitioning: Isolated storage keys by board and user:
 *    - Boards: boards/{boardId}/users/{userId}/{timestamp}_{rand}_{fileName}
 *    - Avatars: users/{userId}/avatars/{timestamp}_{fileName}
 *    - Drafts: users/{userId}/drafts/{timestamp}_{rand}_{fileName}
 * 2. Supabase Auth Verification: Validates Supabase JWTs to guarantee authentic
 *    user identities and prevent user impersonation in R2.
 * 3. File Safety & Limits: Enforces max file sizes (100MB) and blocks executable files.
 * 4. Object Deletion: DELETE /upload/:key endpoint with user ownership verification.
 * 5. Secure CDN Streaming: Zero-egress direct delivery with XSS sandbox protection for SVGs.
 * 
 * Cloudflare Dashboard Setup:
 * 1. Workers & Pages -> Create Worker.
 * 2. Paste this code.
 * 3. Worker Settings -> Variables -> R2 Bucket Bindings:
 *    - Variable name: BUCKET
 *    - R2 Bucket: (select your R2 bucket)
 * 4. Environment Variables:
 *    - PUBLIC_CDN_BASE: https://pub-xxxxxx.r2.dev (or custom domain)
 *    - SUPABASE_URL: (optional) https://your-project.supabase.co
 *    - SUPABASE_ANON_KEY: (optional) your-anon-key
 */

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const BLOCKED_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'sh', 'php', 'cgi', 'jar', 'app', 'vbs', 'scr', 'msi', 'com'
]);

async function verifySupabaseUser(request, env) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { isAuthenticated: false, user: null };
  }

  const token = authHeader.substring(7).trim();
  if (!token || !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const supabaseUrl = env.SUPABASE_URL.replace(/\/+$/, '');
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': env.SUPABASE_ANON_KEY
      }
    });

    if (userRes.ok) {
      const user = await userRes.json();
      return { isAuthenticated: true, user };
    }
  } catch (err) {
    console.error('Supabase JWT verification error:', err);
  }

  return { isAuthenticated: false, user: null };
}

function getCorsHeaders(request, env) {
  const requestOrigin = request.headers.get('Origin') || '';
  let allowedOrigin = '*';

  if (env.ALLOWED_ORIGINS) {
    const list = env.ALLOWED_ORIGINS.split(',').map(s => s.trim().toLowerCase());
    if (list.includes(requestOrigin.toLowerCase())) {
      allowedOrigin = requestOrigin;
    } else {
      allowedOrigin = list[0] || '*';
    }
  } else if (requestOrigin) {
    try {
      const u = new URL(requestOrigin);
      if (
        u.hostname === 'localhost' ||
        u.hostname === '127.0.0.1' ||
        u.hostname === 'padles.dev' ||
        u.hostname.endsWith('.padles.dev')
      ) {
        allowedOrigin = requestOrigin;
      }
    } catch (_) {}
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function extractUserIdFromKey(key) {
  // Key formats:
  // users/{userId}/avatars/...
  // users/{userId}/drafts/...
  // boards/{boardId}/users/{userId}/...
  const matchUsers = key.match(/^users\/([^\/]+)\//);
  if (matchUsers) return matchUsers[1];
  const matchBoards = key.match(/^boards\/[^\/]+\/users\/([^\/]+)\//);
  if (matchBoards) return matchBoards[1];
  return null;
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // 1. POST / or POST /upload: Request upload URL / presign
    if (request.method === 'POST') {
      try {
        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          return new Response(JSON.stringify({ error: 'Expected application/json' }), { status: 400, headers: corsHeaders });
        }

        const body = await request.json();
        const rawFileName = body.fileName || 'media';
        const cleanName = rawFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const ext = cleanName.includes('.') ? cleanName.split('.').pop().toLowerCase() : 'bin';

        // Block dangerous executable extensions
        if (BLOCKED_EXTENSIONS.has(ext)) {
          return new Response(JSON.stringify({ error: `File type .${ext} is not permitted.` }), { status: 400, headers: corsHeaders });
        }

        // File size check if provided in metadata
        if (body.fileSize && body.fileSize > MAX_FILE_SIZE) {
          return new Response(JSON.stringify({ error: `File size exceeds the 100MB limit.` }), { status: 413, headers: corsHeaders });
        }

        // Verify user identity strictly via Supabase JWT
        const { isAuthenticated, user } = await verifySupabaseUser(request, env);
        let resolvedUserId = 'guest';

        if (isAuthenticated && user?.id) {
          resolvedUserId = user.id;
        }

        const category = body.category || 'board';

        // Avatars strictly require authentication
        if (category === 'avatar' && !isAuthenticated) {
          return new Response(JSON.stringify({ error: 'Unauthorized: You must be logged in to upload an avatar.' }), {
            status: 401,
            headers: corsHeaders
          });
        }

        const boardId = (body.boardId || 'board-default-physics').replace(/[^a-zA-Z0-9_-]/g, '_');
        const timestamp = Date.now();
        const randSuffix = (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36)).substring(0, 8);

        // Partition by user and context
        let uniqueKey;
        if (category === 'avatar') {
          uniqueKey = `users/${resolvedUserId}/avatars/${timestamp}_${cleanName}`;
        } else if (category === 'draft') {
          uniqueKey = `users/${resolvedUserId}/drafts/${timestamp}_${randSuffix}_${cleanName}`;
        } else {
          // Standard board attachment
          uniqueKey = `boards/${boardId}/users/${resolvedUserId}/${timestamp}_${randSuffix}_${cleanName}`;
        }

        const uploadUrl = `${url.origin}/upload/${encodeURIComponent(uniqueKey)}`;
        const publicUrl = env.PUBLIC_CDN_BASE 
          ? `${env.PUBLIC_CDN_BASE.replace(/\/+$/, '')}/${uniqueKey}`
          : uploadUrl;

        return new Response(JSON.stringify({
          presignedUrl: uploadUrl,
          publicUrl: publicUrl,
          key: uniqueKey,
          userId: resolvedUserId
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
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

        // Validate extension
        const cleanName = key.split('/').pop() || '';
        const ext = cleanName.includes('.') ? cleanName.split('.').pop().toLowerCase() : '';
        if (BLOCKED_EXTENSIONS.has(ext)) {
          return new Response(JSON.stringify({ error: `File type .${ext} is blocked.` }), { status: 400, headers: corsHeaders });
        }

        // Check namespace ownership
        const targetUserId = extractUserIdFromKey(key);
        if (targetUserId && targetUserId !== 'guest' && !targetUserId.startsWith('guest_')) {
          if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
            const { isAuthenticated, user } = await verifySupabaseUser(request, env);
            if (!isAuthenticated || !user || user.id !== targetUserId) {
              return new Response(JSON.stringify({ error: 'Forbidden: You do not have permission to upload to this user storage path.' }), {
                status: 403,
                headers: corsHeaders
              });
            }
          }
        }

        // Basic payload validation
        const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
        if (contentLength > MAX_FILE_SIZE) {
          return new Response(JSON.stringify({ error: 'Payload exceeds 100MB limit' }), { status: 413, headers: corsHeaders });
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

    // 3. DELETE /upload/:key: Delete object from R2 bucket
    if (request.method === 'DELETE') {
      try {
        const key = decodeURIComponent(url.pathname.replace(/^\/upload\//, ''));
        if (!key) {
          return new Response(JSON.stringify({ error: 'Missing object key' }), { status: 400, headers: corsHeaders });
        }

        const targetUserId = extractUserIdFromKey(key);
        if (targetUserId && targetUserId !== 'guest' && !targetUserId.startsWith('guest_')) {
          const { isAuthenticated, user } = await verifySupabaseUser(request, env);
          if (!isAuthenticated || !user || user.id !== targetUserId) {
            return new Response(JSON.stringify({ error: 'Forbidden: You do not own this media.' }), {
              status: 403,
              headers: corsHeaders
            });
          }
        } else if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
          const { isAuthenticated } = await verifySupabaseUser(request, env);
          if (!isAuthenticated) {
            return new Response(JSON.stringify({ error: 'Unauthorized: Authentication required to delete media.' }), {
              status: 401,
              headers: corsHeaders
            });
          }
        }

        await env.BUCKET.delete(key);

        return new Response(JSON.stringify({ success: true, deletedKey: key }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 4. GET /upload/:key: Direct read proxy with XSS protections
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
        headers.set('X-Content-Type-Options', 'nosniff');

        const detectedType = headers.get('content-type') || '';
        // Sandboxing for SVG to prevent Stored XSS
        if (detectedType.includes('svg') || detectedType.includes('xml')) {
          headers.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
        }

        return new Response(object.body, { headers });
      } catch (err) {
        return new Response('Error retrieving object', { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }
};
