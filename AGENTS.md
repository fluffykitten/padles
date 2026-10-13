# PADLES — Agent Operating Manual

> [!IMPORTANT]
> **Padles** is a pixel-faithful clone of the live Padlet board at
> [`padlet.com/ezzarscarlet/physics-audio-reflections-…`](https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6).
> All UI must be validated against that live board using REA / CDP — never guess.

---

## 1. Project Architecture

### Tech Stack
- **Single-page app** — no framework, no build step, no bundler.
- **3 core files**: `index.html` (~136 KB), `styles.css` (~143 KB), `app.js` (~234 KB).
- **Font**: Google Fonts `Inter` (loaded via `<link>` in index.html).
- **Backend**: 
  - **Supabase**: Exclusively for PostgreSQL database (boards/sections/posts), Auth & Logins (email/sessions), and Realtime WebSocket sync via `supabase-service.js`. **No Supabase Storage is used.**
  - **Cloudflare R2**: 100% dedicated object storage for all media attachments (photos, videos, audio reflections, screen recordings, drawings, uploads) with $0 egress fees.
  - **Offline/Local**: Falls back to `localStorage` + `IndexedDB` (`PadlesMediaDB`) when offline or unconfigured. Schema: `supabase/schema.sql`.
- **No npm / no node_modules**: The only `npx` usage is the dev server (`npx -y serve . -p 8080`).

### Code Organization (`app.js`)
- **One class**: `PadlesShelfApp` — instantiated once at the bottom of the file.
- **Constructor** caches all DOM element references via `document.getElementById(...)`.
- **`init()`** calls setup methods: `renderBoard()`, `initCardContextMenu()`, `initEmojiPicker()`, `initSlideshow()`, etc.
- **State**: `this.state` (board data — sections, cards, settings) persisted to `localStorage` key `padles_board_exact_v1`. Draft state in `this.composerState`. Edit state in `this.editingCardId`.
- **Rendering**: innerHTML template literals (not `document.createElement`). Board re-renders via `renderBoard()` → `renderSections()` → `renderCards()`.
- **Events**: Mix of direct listeners (set in `attachEventListeners()`) and event delegation on container elements.

### File Map
```
padles/
├── index.html                 # All markup, modal shells, inline SVG icons
├── styles.css                 # All styles (no CSS modules, no preprocessor)
├── app.js                     # All logic (PadlesShelfApp class)
├── supabase-config.js         # Supabase URL + anon key loader
├── supabase-service.js        # Supabase CRUD & realtime sync
├── supabase/schema.sql        # PostgreSQL DDL for boards/sections/posts/comments/reactions
├── start-edge-debug.bat       # Launch Edge with --remote-debugging-port=9222
├── .env.local                 # SUPABASE_URL, SUPABASE_ANON_KEY (gitignored)
├── docs/
│   ├── padles_tools_revamp_plan.md     # Roadmap for AV Studio, Draw, Poll, Location, All Tools
│   ├── architecture_comparison_and_migration_plan.md
│   ├── rea_and_edge_setup_guide.md
│   └── screenshots/
└── .agents/skills/            # Antigravity skills for REA verification
```

---

## 2. Feature Status

| Feature | Status | Notes |
|---|---|---|
| Board layout & aurora wallpaper | ✅ Done | 5-column shelf, centered columns, gradient + radial aurora overlays |
| Section folder tabs | ✅ Done | Skewed tab shape, `#014e62`, `+ Post` pill button |
| Cards (6 color palettes) | ✅ Done | White, Red, Yellow, Green, Blue, Purple swatches. Pinned banner. |
| Card context menu (3-dots) | ✅ Done | 11 items: open, new tab, copy link, slideshow, colors, edit, add before/after, duplicate, pin, delete |
| Docked post composer | ✅ Done | 380px bottom-right, multi-draft dock, minimize/expand, 6-tool attachment bar |
| Expanded / edit post modal | ✅ Done | 540px centered, `#ffffff` bg, `#de3163` Update button, dark backdrop |
| Emoji reactions | ✅ Done | Reaction button on cards, count display |
| Theater / expanded post view | ✅ Done | Detail modal with media canvas, comments thread, prev/next navigation |
| Drag-and-drop reorder | ✅ Partial | Cards within sections. Cross-section drag not yet implemented. |
| Top bar (share, settings, more) | ✅ Partial | Drawer shells exist. Full Padlet settings parity incomplete. |
| Slideshow mode | ✅ Partial | Basic slideshow init exists. Full playback/controls need verification. |
| Supabase cloud sync | ✅ Done | Real-time sync, cloud settings modal, push local → cloud |
| **AV Studio** (Camera/Video/Audio/Screen) | 🔲 TODO | Stubs inject static images. Need real `getUserMedia` / `getDisplayMedia`. See `docs/padles_tools_revamp_plan.md` |
| **Drawing whiteboard** | 🔲 TODO | Stub injects static card. Need canvas with strokes, colors, undo. |
| **Interactive poll creator** | 🔲 TODO | Stub injects static poll. Need question/choice modal + voting UI. |
| **Location map picker** | 🔲 TODO | Stub injects static text. Need Leaflet map + geocoding. |
| **All Tools Hub (revamped)** | 🔲 TODO | Current modal doesn't match Padlet's 4 color-coded tile groups. |
| **AI Art generator modal** | 🔲 TODO | Currently uses `window.prompt()`. Need in-app modal. |
| **Link modal** | 🔲 TODO | Currently uses `window.prompt()`. Need in-app modal with URL preview. |

> The detailed implementation plan for all TODO tools is in [`docs/padles_tools_revamp_plan.md`](docs/padles_tools_revamp_plan.md).

---

## 3. Code Conventions

Follow these patterns to keep the codebase consistent:

1. **Single-class architecture** — All new features go inside `PadlesShelfApp`. Add an `initFeatureName()` method and call it from `init()`.
2. **DOM references** — Cache elements in the constructor: `this.myElement = document.getElementById('myElement');`
3. **Rendering** — Use innerHTML template literals. Build HTML strings, assign to `.innerHTML`. Don't use `document.createElement` chains.
4. **CSS naming** — kebab-case class names (`.card-context-menu`, `.composer-header`, `.av-recorder-modal`). Use existing CSS custom properties from `styles.css :root` where possible.
5. **No external dependencies** — No npm packages, no CDN libraries (except Google Fonts `Inter`). Use built-in browser APIs (`fetch`, `WebSocket`, `MediaRecorder`, `getUserMedia`, etc.).
6. **Supabase isolation** — All Supabase calls go through `supabase-service.js`. Never import Supabase directly in `app.js`.
7. **State persistence** — Call `this.saveState()` after any mutation to `this.state`. The method serializes to `localStorage` and optionally syncs to Supabase.
8. **Modal pattern** — Modals use a container `div` with `display: none` by default. Show/hide by toggling a `.show` / `.active` class or setting `style.display`. Use `z-index` layering consistent with existing modals (cards: 1000s, menus: 1800, modals: 2000+, overlays: 9000+).

---

## 4. REA Verification Workflow

### Ground Rules
- **Never guess** CSS values, colors, layout metrics, or SVG icons. Extract from live Padlet.
- **Never claim "pixel-perfect" or "done"** without screenshot proof.
- The live Padlet board in Edge (port 9222) is the **single source of truth**.

### Before You Build a Component
1. Connect to `http://127.0.0.1:9222/json` to locate the live Padlet tab.
2. Use CDP `Runtime.evaluate` or REA MCP tools (`inspect_web_page`, `observe_web_execution`) to extract:
   - `getComputedStyle()` for the target element (font, colors, padding, radius, shadows)
   - `getBoundingClientRect()` for exact dimensions
   - Raw SVG `innerHTML` for icons
   - DOM subtree structure for nesting and semantic roles

### After You Build a Component
1. Capture a screenshot of your implementation: `Page.bringToFront` → `Page.captureScreenshot`.
2. Capture a screenshot of the same component on live Padlet.
3. Compare visually. Fix discrepancies in colors, spacing, typography, and border radii.
4. **Acceptable tolerance**: Dynamic content (usernames, timestamps, post counts, avatar images) will differ. Layout geometry, colors, and typography must match.

### Setup on a New Machine
1. **Launch Edge in debug mode**:
   ```cmd
   start-edge-debug.bat
   ```
   Or:
   ```cmd
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --remote-allow-origins=* --user-data-dir="%LOCALAPPDATA%\Microsoft\Edge\User Data Debug" https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6 http://localhost:8080/index.html
   ```
2. **Start dev server**: `npx -y serve . -p 8080`
3. **Verify**: `http://127.0.0.1:9222/json` should list both tabs.

### CDP Gotchas
- Always call `Page.bringToFront` before `Page.captureScreenshot` — background tabs hang.
- After `Page.reload`, close the WebSocket, wait 2 seconds, reconnect.

---

## 5. Verified Design Tokens

These are extracted and verified from live Padlet. Use them as a reference, but **always re-verify against live Padlet** if something looks off.

### Board & Wallpaper
- **Gradient**: `linear-gradient(135deg, #012b32 0%, #034857 50%, #001f24 100%)` with aurora radial overlays.
- **Columns**: 5 sections, `272px` wide (`256px` inner), `16px` gap, centered via `first:ms-auto; last:me-auto`.

### Section Folder Tabs
- **Tab background**: `#014e62`, right wing skewed `skew-x-[10deg]`.
- **Add Post pill**: `background: rgba(0, 0, 0, 0.24)`, `backdrop-filter: blur(4px)`.

### Cards
| Palette | Outer bg | Inner bg | Text |
|---|---|---|---|
| White (default) | `#f5f6f7` | `#ffffff` | `#111111` |
| Oceanic Blue | `#9addfb` | `#bbeaff` | `#111111` |
- **Border radius**: `12px` on both outer and inner.
- **Pinned banner**: Top bar with thumbtack icon + `Pinned` text.

### Card Context Menu
- `width: 256px; background: #ffffff; border-radius: 20px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18); padding: 8px;`
- Delete item: `color: #ef4444; hover background: #fef2f2`.

### Post Composer (Docked)
- Width `380px`, docked bottom-right.
- Submit inactive: `#f1f3f4` bg, `#9ca3af` text, `border-radius: 16px`, height `40px`.
- Submit active: `#de3163` bg, `#ffffff` text.
- Attachment tool bar: 6 pinstriped columns, `border: 1px dashed #e2e2e2; border-radius: 16px; height: 165px`.

### Edit Post Modal (Expanded/Centered)
- `width: 540px; max-width: min(540px, calc(100vw - 32px))`.
- `background: #ffffff; border-radius: 24px; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25)`.
- Close button: `40px × 40px`, `#f1f3f4` bg, top-left.
- Update button: `#de3163` bg, `#ffffff` text, `border-radius: 16px`, top-right.

### Typography
- Font stack: `"Inter var", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- Card titles: `16px`, `font-weight: 600`.
- Card body: `14px`, `font-weight: 400`.

---

## 6. Known Pitfalls (Don't Repeat These)

| Mistake | What Actually Happened | Correct Approach |
|---|---|---|
| Dark theme hallucination | Agent used `#1f2125` background for edit modal, claimed "pixel perfect" | Padlet modals are `#ffffff` with `#de3163` pink accents |
| `window.prompt()` for links | Agent used browser-native prompt for URL input | Padlet uses in-app modals with URL preview cards |
| Dummy media stubs | Camera/video/audio tools injected static stock photos | Must use real `getUserMedia` / `getDisplayMedia` with viewfinder |
| Generic HTML `<dialog>` | Agent used native dialog element | Padlet uses custom div-based modals with specific border-radius and shadows |
| Composer dark theme | Old blueprint spec listed `--composer-bg: #1e2022` | Live Padlet composer has `#ffffff` surface (was outdated/wrong) |
| Claiming done without screenshots | Agent reported "pixel-perfect parity" with no visual proof | Always capture and compare screenshots before reporting |

---

## 7. Supabase & Cloudflare R2 Backend Reference

- **Supabase (Database, Auth, Email)**:
  - **Schema**: `supabase/schema.sql` — tables: `boards`, `sections`, `posts`, `comments`, `reactions`, `custom_fields`.
  - **Config**: `.env.local` contains `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
  - **Service layer**: `supabase-service.js` handles CRUD, real-time subscriptions, presence, and auth.
  - **No Storage**: Supabase is strictly for PostgreSQL, Auth/Logins, and Email. Do NOT use Supabase Storage.
- **Cloudflare R2 (100% Media Storage)**:
  - Dedicated zero-egress object storage for all photos, video recordings, audio reflections, screen recordings, drawings, and file attachments.
  - Presigned S3 PUT URL pipeline for direct browser-to-bucket binary streaming.
- **Offline-first**: The app always works with `localStorage` + `IndexedDB` (`PadlesMediaDB`). Cloud sync is opt-in via the cloud settings modal.
- **When to touch Supabase**: Only when adding new data model fields (update schema + service). For pure UI work, local state is sufficient.

---

## 8. Related Documentation

| Doc | Purpose |
|---|---|
| [`docs/padles_tools_revamp_plan.md`](docs/padles_tools_revamp_plan.md) | Detailed implementation plan for AV Studio, Draw, Poll, Location, and All Tools Hub |
| [`docs/architecture_comparison_and_migration_plan.md`](docs/architecture_comparison_and_migration_plan.md) | Supabase + Cloudflare R2 backend architecture |
| [`docs/rea_and_edge_setup_guide.md`](docs/rea_and_edge_setup_guide.md) | Edge remote debugging setup guide |
| [`.agents/skills/padlet-clone-verification/`](.agents/skills/padlet-clone-verification/SKILL.md) | Automated CDP verification scripts |
| [`.agents/skills/strict-rea-clone/`](.agents/skills/strict-rea-clone/SKILL.md) | REA clone protocol (4-phase operational workflow) |
| `docs/archive/` | Archived/stale specs (do not use as ground truth) |
