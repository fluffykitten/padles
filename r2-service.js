/**
 * Padles Cloudflare R2 Media Storage Service
 * 
 * Handles uploading binary media (photos, videos, audio, drawings) to Cloudflare R2.
 * Requests presigned S3 PUT URLs and streams directly to Cloudflare's zero-egress bucket.
 * Seamlessly delegates to PadlesMediaDB (IndexedDB) when offline or in local dev mode.
 */

class PadlesR2Service {
  constructor() {
    this.uploadEndpoint = null; // Cloudflare Worker or Supabase Edge Function URL
    this.publicCdnBase = null;   // Custom domain e.g. https://media.padles.com or R2 dev URL
    this.isConfigured = false;
    this.initFromEnv();
  }

  initFromEnv() {
    // Check if configuration exists in localStorage or window environment
    const savedEndpoint = localStorage.getItem('padles_r2_upload_endpoint');
    const savedCdn = localStorage.getItem('padles_r2_public_cdn');

    if (savedEndpoint) {
      this.uploadEndpoint = savedEndpoint;
      this.publicCdnBase = savedCdn || '';
      this.isConfigured = true;
      console.log('[PadlesR2] Configured with endpoint:', this.uploadEndpoint);
    } else {
      console.log('[PadlesR2] Running in offline-first mode (IndexedDB active)');
    }
  }

  configure(uploadEndpoint, publicCdnBase) {
    this.uploadEndpoint = uploadEndpoint;
    this.publicCdnBase = publicCdnBase;
    this.isConfigured = Boolean(uploadEndpoint);
    if (uploadEndpoint) {
      localStorage.setItem('padles_r2_upload_endpoint', uploadEndpoint);
      if (publicCdnBase) localStorage.setItem('padles_r2_public_cdn', publicCdnBase);
    } else {
      localStorage.removeItem('padles_r2_upload_endpoint');
      localStorage.removeItem('padles_r2_public_cdn');
    }
  }

  /**
   * Upload binary Blob (photo, video, audio recording, canvas sketch)
   * Returns metadata object: { url, storageId, size, mimeType }
   */
  async uploadMedia(blob, options = {}) {
    const {
      type = 'image',
      filename = `${type}_${Date.now()}`,
      boardId = 'board-default-physics'
    } = options;

    // 1. Always store in local IndexedDB first for instant access & offline durability
    let localRecord = null;
    if (window.padlesMediaDB) {
      try {
        localRecord = await window.padlesMediaDB.storeBlob(blob, type, filename);
      } catch (err) {
        console.warn('[PadlesR2] IndexedDB save warning:', err);
      }
    }

    const mimeType = blob.type || 'application/octet-stream';
    const storageId = localRecord ? localRecord.storageId : 'att_' + Date.now();
    const fallbackUrl = localRecord ? localRecord.url : URL.createObjectURL(blob);

    // 2. If Cloudflare R2 endpoint is configured, attempt upload
    if (this.isConfigured && this.uploadEndpoint) {
      try {
        console.log(`[PadlesR2] Requesting presigned PUT URL for ${filename} (${mimeType})...`);
        const presignRes = await fetch(this.uploadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: filename,
            contentType: mimeType,
            fileSize: blob.size,
            boardId
          })
        });

        if (presignRes.ok) {
          const { presignedUrl, publicUrl } = await presignRes.json();
          console.log('[PadlesR2] Streaming binary directly to Cloudflare R2 bucket...');
          
          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': mimeType },
            body: blob
          });

          if (uploadRes.ok) {
            console.log('[PadlesR2] Upload complete! Public URL:', publicUrl);
            if (window.padlesMediaDB) {
              await window.padlesMediaDB.markAsSynced(storageId, publicUrl);
            }
            return {
              url: publicUrl,
              thumbnailUrl: (type === 'image' || type === 'drawing') ? publicUrl : (localRecord?.thumbnailUrl || fallbackUrl),
              storageId,
              size: blob.size,
              mimeType,
              isCloudR2: true
            };
          }
        }
      } catch (err) {
        console.warn('[PadlesR2] Cloudflare R2 upload failed, using local IndexedDB:', err);
      }
    }

    // Return reliable local URL from IndexedDB
    return {
      url: fallbackUrl,
      thumbnailUrl: (type === 'image' || type === 'drawing') ? fallbackUrl : '',
      storageId,
      size: blob.size,
      mimeType,
      isCloudR2: false
    };
  }
}

// Global instance
window.padlesR2 = new PadlesR2Service();
