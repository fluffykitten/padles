/**
 * Padles Cloudflare R2 Media Storage Configuration
 *
 * 100% dedicated object storage for all photos, videos,
 * audio reflections, screen recordings, drawings, and file attachments ($0 egress fees).
 * 
 * If left empty, Padles automatically runs in offline-first mode using
 * local IndexedDB (PadlesMediaDB), guaranteeing zero data loss.
 */

window.PADLES_R2_CONFIG = {
  // Your Cloudflare Worker upload endpoint (e.g. 'https://padles-r2.yourname.workers.dev')
  uploadEndpoint: '',

  // Your Cloudflare R2 Public Domain or R2.dev URL (e.g. 'https://pub-xxxxxx.r2.dev' or 'https://media.padles.dev')
  publicCdnBase: ''
};
