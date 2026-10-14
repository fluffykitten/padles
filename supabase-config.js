/**
 * Padles Supabase Backend Configuration Template
 * 
 * Recommended: Store your credentials securely in `.env.local` (which is gitignored).
 * Padles automatically loads `.env.local` at startup.
 * 
 * You can also enter credentials directly in the "Cloud Sync" settings dialog in-app.
 */

window.PADLES_SUPABASE_CONFIG = {
  // Configured via `.env.local` (SUPABASE_URL) or Cloud Sync settings dialog
  url: '',

  // Configured via `.env.local` (SUPABASE_ANON_KEY)
  anonKey: '',

  // Default active board ID
  boardId: 'board-default-physics'
};
