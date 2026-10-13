# PADLES — Agent Operating Manual

> [!IMPORTANT]
> **Padles** is a strict, zero-leeway clone of the live Padlet board at
> [`padlet.com/ezzarscarlet/physics-audio-reflections-…`](https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6).
> **Mandate**: 0 leeway, 0 differences, 0 approximations. The design must be EXACTLY the same as Padlet (the sole exception being the brand name "Padles" instead of "Padlet"). Every layout metric, border radius, typography weight, shadow, SVG icon, and color swatch MUST be directly compared with and extracted from live Padlet on Edge (port 9222) — never guess.

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
| **AV Studio** (Camera/Video/Audio/Screen) | ✅ Done | Viewfinder, countdown timer, mirroring, Web Audio AnalyserNode waveform visualizer, Cloudflare R2 / IndexedDB binary storage. |
| **Drawing whiteboard** | ✅ Done | 10-color palette, 4 stroke sizes, pen/highlighter/eraser, undo/redo stack, dark/white board toggle, PNG export to R2. |
| **Interactive poll creator** | ✅ Done | Question + dynamic options modal, single/multi-choice, live interactive in-card voting with animated progress bars & persistence. |
| **Location map picker** | ✅ Done | OpenStreetMap geocoding search, interactive map preview, pin overlay, card embedding. |
| **All Tools Hub (revamped)** | ✅ Done | Authentic 4 color-coded tile categories (Purple, Blue, Green, Orange), search/URL bar, responsive grid. |
| **AI Art generator modal** | 🔲 TODO | Currently uses `window.prompt()`. Need in-app modal. |
| **Link modal** | 🔲 TODO | Currently uses `window.prompt()`. Need in-app modal with URL preview. |

> Complete implementation specifications and visual proof artifacts in [`docs/padles_tools_revamp_plan.md`](docs/padles_tools_revamp_plan.md).

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

## 4. Strict Zero-Leeway REA Verification Workflow

### Absolute Directives
- **Zero Leeway, 0 Difference, 0 Approximations**: Never guess CSS values, paddings, margins, border radii, or colors. Query live Padlet running on port 9222.
- **The live Padlet board in Edge (`port 9222`) is the single source of truth**: Every component must be compared against `padlet.com/ezzarscarlet/...`.
- **Never claim done without side-by-side screenshot proof**.

### Before You Build or Modify a Component
1. Connect to `http://127.0.0.1:9222/json` to locate the live Padlet tab.
2. Use CDP `Runtime.evaluate` to inspect:
   - `getComputedStyle()` for exact typography, colors, padding, radii, backgrounds, and shadows.
   - `getBoundingClientRect()` for exact widths and heights.
   - Exact SVG markup (`viewBox`, path commands, dimensions).
   - DOM hierarchy and nesting.

### After You Build a Component
1. Capture a screenshot of the clone via CDP `Page.captureScreenshot`.
2. Capture a screenshot of live Padlet under identical dimensions.
3. Visually compare side-by-side and eliminate any diff.

---

## 5. Verified Design Tokens (Extracted from Live Padlet Runtime)

### Board & Wallpaper
- **Gradient**: `linear-gradient(135deg, #012b32 0%, #034857 50%, #001f24 100%)` with aurora radial overlays.
- **Columns**: 5 sections, `272px` wide (`256px` inner), `16px` gap, centered via `first:ms-auto; last:me-auto`.
- **Theme**: For this aurora wallpaper board, live Padlet runs in **Dark Mode** (`dark-mode`).

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

### Post Composer (Docked - Dark Theme on Aurora Board)
- Width `380px`, docked bottom-right.
- Background: `rgb(17, 17, 17)` (`#111111`) / `dark:bg-nightfall-900`.
- Border-radius: `24px 24px 0 0` (docked).
- Submit inactive: `background: rgba(239, 244, 250, 0.14); color: rgba(255, 255, 255, 0.2); border-radius: 16px; height: 40px; padding: 0 20px; font-weight: 600;`.
- Submit active: `#de3163` pink bg, `#ffffff` text.

### All Tools Hub (`#allToolsModal` - Dark Mode Parity)
- **Overlay backdrop**: `background: rgba(36, 37, 39, 0.8)` (`#242527cc`), `z-index: 100000`.
- **Modal card**: `width: 720px; border-radius: 24px; background: rgb(17, 17, 17) (#111111); box-shadow: 0 16px 32px rgba(0, 0, 0, 0.32);`.
- **Close button**: `40px × 40px`, `border-radius: 16px`, transparent bg, hover `rgba(255, 255, 255, 0.1)`, 16px close SVG.
- **Search bar**: `height: 40px`, `border-radius: 16px`, `background: rgb(36, 37, 39)` (`#242527`), width `calc(100% - 112px)`.
  - Placeholder: `"Search web or paste URL"`, `color: rgb(156, 163, 175)`.
- **Paste button**: `40px × 40px`, `border-radius: 16px`, transparent bg, hover `rgba(255, 255, 255, 0.1)`, 20px clipboard SVG.
- **Grid Layout**: 3 columns (`grid-cols-3`), `gap: 12px` (gap-3), with 4 category groups.
- **Tool Buttons**:
  - `height: 40px`, `border-radius: 12px`, `background: rgb(36, 37, 39)` (`#242527`), `padding: 8px 0 8px 12px`.
  - Hover background: `rgb(48, 50, 54)` (`#303236`).
  - Text: `color: rgb(255, 255, 255)`, `font-size: 14px`, `font-weight: 400`, `margin: 0 12px`.
  - **Category Icon Colors**:
    - **Grape (Purple)**: `rgb(148, 102, 232)` (`#9466e8`) — *Padles, Upload, Link*
    - **Oceanic (Blue)**: `rgb(57, 146, 222)` (`#3992de`) — *Camera, Video recorder, Audio recorder, Screen recorder, Draw*
    - **Park (Green)**: `rgb(61, 199, 49)` (`#3dc731`) — *Poll, AI image, AI speech, Photo album*
    - **Photo Album "New" Badge**: `background: rgb(0, 78, 0)` (`#004e00`), text `#ffffff`, `border-radius: 6px`, padding `0 6px`, height `20px`, text "New".
    - **Tangerine (Orange)**: `rgb(255, 131, 62)` (`#ff833e`) — *Image search, GIF, YouTube, Spotify, Web search, Location*

---

## 6. Known Pitfalls & Anti-Patterns to Reject

| Mistake | What Actually Happened | Correct Approach |
|---|---|---|
| Assuming modal color scheme | Agent guessed `#ffffff` for everything because some Padlet boards are light | Always inspect active board theme via CDP: this aurora board uses **Dark Mode** (`#111111` surface, `#242527` pill buttons) |
| Using approximate sizes | Agent used ~16px or arbitrary margins | Query `getBoundingClientRect()` and `getComputedStyle()` for exact pixels |
| Approximate SVG icons | Agent used generic icons | Dump exact SVG paths, `viewBox`, and dimensions from live Padlet DOM |
| Missing clipboard button | Agent only had a search input without the paste clipboard action | Include the exact clipboard paste button on the right of the search bar |
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
