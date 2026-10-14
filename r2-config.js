/**
 * Padles Cloudflare R2 Media Storage Configuration Template
 * 
 * Recommended: Store your endpoint and CDN URL securely in `.env.local` (which is gitignored).
 * Padles automatically loads `.env.local` at startup.
 * 
 * If left empty, Padles automatically runs in offline-first mode using
 * local IndexedDB (PadlesMediaDB), guaranteeing zero data loss.
 */

window.PADLES_R2_CONFIG = {
  // Configured via `.env.local` (R2_UPLOAD_ENDPOINT) or Storage settings dialog
  uploadEndpoint: '',

  // Configured via `.env.local` (R2_PUBLIC_CDN)
  publicCdnBase: ''
};
