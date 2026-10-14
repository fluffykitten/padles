/**
 * Padles Cloudflare R2 Media Storage Service (Multi-User Production Ready)
 * 
 * Handles uploading binary media (photos, videos, audio reflections, drawings, files)
 * directly to Cloudflare R2 with multi-user isolation and Supabase Auth integration.
 * Seamlessly delegates to PadlesMediaDB (IndexedDB) when offline or in local dev mode.
 */

class PadlesR2Service {
  constructor() {
    this.uploadEndpoint = null; // Cloudflare Worker endpoint
    this.publicCdnBase = null;   // Custom domain or R2 dev CDN URL
    this.isConfigured = false;
    this.initFromEnv();
  }

  parseEnvText(content) {
    const env = {};
    if (!content) return env;
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx !== -1) {
        const key = line.substring(0, eqIdx).trim();
        let val = line.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        env[key] = val;
      }
    }
    return env;
  }

  async loadEnvFile() {
    const filesToTry = ['env.local', '.env.local', 'env', '.env'];
    for (const filename of filesToTry) {
      try {
        const resp = await fetch(filename, { cache: 'no-cache' });
        if (resp.ok) {
          const text = await resp.text();
          const parsed = this.parseEnvText(text);
          const endpoint = (parsed.R2_UPLOAD_ENDPOINT || parsed.CLOUDFLARE_R2_UPLOAD_ENDPOINT || '').trim();
          const cdn = (parsed.R2_PUBLIC_CDN || parsed.CLOUDFLARE_R2_PUBLIC_CDN || '').trim();
          if (endpoint) {
            return { endpoint, cdn, filename };
          }
        }
      } catch (_) {}
    }
    return null;
  }

  async initFromEnv() {
    // 1. Try env.local / .env.local first
    try {
      const envConfig = await this.loadEnvFile();
      if (envConfig && envConfig.endpoint) {
        this.uploadEndpoint = envConfig.endpoint;
        this.publicCdnBase = envConfig.cdn || '';
        this.isConfigured = true;
        console.log(`[PadlesR2] Configured via ${envConfig.filename}:`, this.uploadEndpoint);
        return;
      }
    } catch (_) {}

    // 2. Check window config or localStorage
    const config = window.PADLES_R2_CONFIG || {};
    const savedEndpoint = localStorage.getItem('padles_r2_upload_endpoint') || config.uploadEndpoint || '';
    const savedCdn = localStorage.getItem('padles_r2_public_cdn') || config.publicCdnBase || '';

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
   * Upload binary Blob (photo, video, audio recording, canvas sketch, file)
   * Options:
   *  - type: 'image' | 'video' | 'audio' | 'drawing' | 'file'
   *  - filename: string
   *  - boardId: string
   *  - userId: string
   *  - authToken: string (Supabase JWT access_token)
   *  - category: 'board' | 'avatar' | 'draft'
   * Returns metadata object: { url, thumbnailUrl, storageId, key, size, mimeType, isCloudR2 }
   */
  async uploadMedia(blob, options = {}) {
    const {
      type = 'image',
      filename = `${type}_${Date.now()}`,
      boardId = 'board-default-physics',
      userId = null,
      authToken = null,
      category = 'board'
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

    // 2. If Cloudflare R2 endpoint is configured, attempt direct upload
    if (this.isConfigured && this.uploadEndpoint) {
      try {
        console.log(`[PadlesR2] Requesting upload URL for ${filename} (${mimeType}) [User: ${userId || 'guest'}]...`);
        
        const presignHeaders = { 'Content-Type': 'application/json' };
        if (authToken) {
          presignHeaders['Authorization'] = `Bearer ${authToken}`;
        }

        const presignRes = await fetch(this.uploadEndpoint, {
          method: 'POST',
          headers: presignHeaders,
          body: JSON.stringify({
            fileName: filename,
            contentType: mimeType,
            fileSize: blob.size,
            boardId,
            userId: userId || 'guest',
            category
          })
        });

        if (presignRes.ok) {
          const { presignedUrl, publicUrl, key } = await presignRes.json();
          console.log('[PadlesR2] Streaming binary directly to Cloudflare R2 bucket at key:', key);
          
          const putHeaders = { 'Content-Type': mimeType };
          if (authToken) {
            putHeaders['Authorization'] = `Bearer ${authToken}`;
          }

          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            headers: putHeaders,
            body: blob
          });

          if (uploadRes.ok) {
            const finalPublicUrl = (this.publicCdnBase && key)
              ? `${this.publicCdnBase.replace(/\/+$/, '')}/${key}`
              : publicUrl;

            console.log('[PadlesR2] Upload complete! Public CDN URL:', finalPublicUrl);
            if (window.padlesMediaDB) {
              await window.padlesMediaDB.markAsSynced(storageId, finalPublicUrl);
            }

            return {
              url: finalPublicUrl,
              thumbnailUrl: (type === 'image' || type === 'drawing') ? finalPublicUrl : (localRecord?.thumbnailUrl || fallbackUrl),
              storageId,
              key: key || null,
              size: blob.size,
              mimeType,
              isCloudR2: true
            };
          } else {
            console.warn('[PadlesR2] PUT to presignedUrl returned non-200 status:', uploadRes.status);
          }
        } else {
          const errData = await presignRes.json().catch(() => ({}));
          console.warn('[PadlesR2] Presign request failed:', presignRes.status, errData);
        }
      } catch (err) {
        console.warn('[PadlesR2] Cloudflare R2 upload error, falling back to local IndexedDB:', err);
      }
    }

    // Return reliable local URL from IndexedDB
    return {
      url: fallbackUrl,
      thumbnailUrl: (type === 'image' || type === 'drawing') ? fallbackUrl : '',
      storageId,
      key: null,
      size: blob.size,
      mimeType,
      isCloudR2: false
    };
  }

  /**
   * Delete media object from Cloudflare R2
   * Accepts either an object key ('boards/.../file.png') or full URL
   */
  async deleteMedia(keyOrUrl, options = {}) {
    if (!this.isConfigured || !this.uploadEndpoint || !keyOrUrl) return false;

    let key = keyOrUrl;
    if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
      try {
        const u = new URL(keyOrUrl);
        // Strip out domain and /upload/ prefix
        key = decodeURIComponent(u.pathname.replace(/^\/upload\//, '').replace(/^\/+/, ''));
      } catch (_) {
        return false;
      }
    }

    if (!key) return false;

    const endpointBase = this.uploadEndpoint.replace(/\/+$/, '');
    const deleteUrl = `${endpointBase}/upload/${encodeURIComponent(key)}`;
    const headers = {};
    if (options.authToken) {
      headers['Authorization'] = `Bearer ${options.authToken}`;
    }

    try {
      console.log('[PadlesR2] Deleting object from R2 bucket:', key);
      const res = await fetch(deleteUrl, { method: 'DELETE', headers });
      if (res.ok) {
        console.log('[PadlesR2] Object deleted successfully:', key);
        return true;
      }
    } catch (err) {
      console.warn('[PadlesR2] Delete request error:', err);
    }
    return false;
  }

  /**
   * Sync any pending local offline blobs to Cloudflare R2 once online
   */
  async syncPendingBlobs(getAuthContextFn = null) {
    if (!this.isConfigured || !window.padlesMediaDB) return 0;
    try {
      const unsynced = await window.padlesMediaDB.listUnsynced();
      if (!unsynced || unsynced.length === 0) return 0;

      console.log(`[PadlesR2] Syncing ${unsynced.length} pending local attachments to Cloudflare R2...`);
      let syncedCount = 0;

      for (const record of unsynced) {
        if (!record.blob) continue;
        const auth = getAuthContextFn ? getAuthContextFn() : {};
        const res = await this.uploadMedia(record.blob, {
          type: record.type,
          filename: record.filename,
          userId: auth.userId,
          authToken: auth.authToken,
          boardId: auth.boardId
        });

        if (res.isCloudR2) {
          syncedCount++;
        }
      }
      return syncedCount;
    } catch (err) {
      console.warn('[PadlesR2] Offline sync error:', err);
      return 0;
    }
  }
}

// Global instance
window.padlesR2 = new PadlesR2Service();
