# PADLES: 100% PADLET CLONE PARITY MANDATES & REA WORKFLOW

> [!IMPORTANT]
> **STRICT PROJECT MANDATE FOR ALL AGENTS ON ANY MACHINE**
> This project (`Padles`) is a strict, **100% pixel-perfect clone** of the live Padlet reference board (`https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6`).
> **DO NOT modify or iterate features based on guesswork, approximations, or assumptions.** All UI components, modals, menus, colors, dimensions, and interactions must be validated against the live reference board using **Reverse Engineering & CDP (Chrome DevTools Protocol)**.

---

## 1. Absolute Behavioral Rules & Zero-Guessing Policy

1. **Zero Guesswork & Zero Hallucinated Designs**
   - **Never guess colors, themes, or layouts.** In previous sessions, an agent hallucinated a dark theme (`#1f2125`) for the Edit Post modal, claiming it was "pixel perfect", which was false and rejected by the user. Real Padlet uses clean `#ffffff` surfaces with `#de3163` Padlet Pink accents.
   - You MUST NOT guess CSS rules, colors, layout dimensions, paddings, margins, border radii, typography metrics, or SVG icon paths.
   - You MUST NOT use generic placeholders or approximate components (e.g., generic toggle switches, standard HTML dialogs).
   - Every CSS property, font size, border radius, padding, and box-shadow must come directly from computed styles extracted from live Padlet.

2. **Reverse Engineering Anything (REA) as Ground Truth**
   - Live Padlet running in Microsoft Edge with remote debugging (`--remote-debugging-port=9222`) or through REA MCP tools (`inspect_web_page`, `observe_web_execution`, `list_browser_targets`) is the **single source of truth**.
   - Whenever building, fixing, or checking a component, query `http://127.0.0.1:9222/json` to connect to the live Padlet tab and extract actual `getComputedStyle()` metrics, bounding client rects, exact SVG markup, and DOM tree structures directly from Padlet's live DOM.

3. **100% Clone Fidelity Checklist**
   - **Typography**: Exact font families (`Inter var`, `Inter`), weights, sizes, line heights, and letter spacings.
   - **Colors**: Exact RGB/RGBA hex color codes and alpha transparencies.
   - **Geometry**: Matching container heights, widths, scroll gutters (`color-scheme: dark`), padding, and margins.
   - **Physics & States**: Authentic micro-interactions, focus outlines (e.g. Canary `#fec006`), toggle transitions (`translateX(16px)`), subpanel slides, and keyboard bindings (<kbd>Escape</kbd>).

4. **Mandatory Automated Proof & Visual Screenshot Verification**
   - **Never claim parity or completion without proof.** You are strictly forbidden from reporting "pixel-perfect" or "task complete" without first capturing screenshot artifacts of the local app (`Page.captureScreenshot`), viewing them via `view_file`, and verifying side-by-side with live Padlet reference screenshots.
   - Before completing any cloning or UI feature task, write and execute an automated CDP verification script comparing Padlet vs. Padles.
   - Diff tolerance: **0 strict diffs**.
   - If diffs exist, adjust CSS tokens or DOM structure until 0 diffs remain.
   - Execute interactive scenario testing and visual side-by-side screenshot verification.

5. **Preserve Documentation & Parity Core**
   - Maintain documentation integrity and preserve working features.
   - Do not break the multiple drafts docking system, drag-and-drop, or Supabase backend sync.

---

## 2. Verified Ground-Truth Design System Tokens

Extracted and verified from live Padlet:

### A. Board & Wallpaper
- **Wallpaper**: Aurora star galaxy wallpaper (`linear-gradient(135deg, #012b32 0%, #034857 50%, #001f24 100%)` with aurora radial gradients).
- **Sections Layout**: 5 columns centered horizontally via `first:ms-auto; last:me-auto;`. Column width: `272px` (`256px` inner). Gap: `16px`.

### B. Section Folders (Tabs)
- **Shape**: Skewed folder tab (`rgb(1, 78, 98)` / `#014e62`), skewed right wing `skew-x-[10deg]`.
- **Add Post Button**: Rounded pill button under header with `+` icon (`background: rgba(0, 0, 0, 0.24)`, `backdrop-filter: blur(4px)`).

### C. Cards
- **Oceanic Blue Palette**:
  - Outer article: `background: #9addfb; border-radius: 12px;`
  - Inner content: `background: #bbeaff; border-radius: 12px; color: #111111;`
- **Default White Palette**:
  - Outer article: `background: #f5f6f7; border-radius: 12px;`
  - Inner content: `background: #ffffff; border-radius: 12px; color: #111111;`
- **Pinned Banner**: Top banner with `Pinned` text and thumbtack icon.
- **Card Context Menu Trigger**: 3-dots vertical button on the top right of each card.

### D. Card Context Menu (3-Dots Dropdown)
- **Container**: `width: 256px; background: #ffffff; border-radius: 20px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18); padding: 8px; z-index: 1800;`
- **Menu Items**:
  1. Open post (post_expand icon)
  2. Open post in new tab (post_open icon)
  3. Copy link to post (post_copy_link icon)
  4. Start slideshow from this post (play_outline icon)
  5. 6 Pastel Color Swatches row (White with checkmark, Red, Orange/Yellow, Green, Blue, Purple)
  6. Edit post (pencil_outline icon)
  7. Add post before (post_add_left icon)
  8. Add post after (post_add_right icon)
  9. Duplicate post / Copy to another / Transfer
  10. Pin / Unpin post
  11. Delete post (`color: #ef4444; hover: #fef2f2;` with trash icon)

### E. Post Composer & Centered Edit Modal
- **Docked Composer** (New Post via `+ Post`):
  - Width: `380px`, docked bottom-right.
  - Header: Close `(X)`, Expand `(↗)`, Minimize `(—)` on left; Submit button on right.
  - Submit button inactive: `#f1f3f4` background, `#9ca3af` text, `border-radius: 16px`, height `40px`.
  - Submit button active: `#de3163` Padlet Pink, `#ffffff` text.
  - Title: Placeholder `"Your name"`, 16px font-semibold.
  - Striped Attachment Multi-Tool: 6 pinstriped columns (Upload, Camera, AI Art, Link, Search, All tools), `border: 1px dashed #e2e2e2; border-radius: 16px; height: 165px;`. Below: `"Add an image, video, audio, link, or file."`.
  - Body: Placeholder `"Write something beautiful..."` / `"Write something fantastic..."`.
  - Bottom Pills: `"White ▾"`, `"§ Instructions ▾"`.
- **Expanded / Edit Post Modal** (Clicking "Edit post" or Expand):
  - Position: Fixed centered dialog with dark backdrop.
  - Width: `540px !important; max-width: min(540px, calc(100vw - 32px));`
  - Background: `#ffffff !important; border-radius: 24px !important; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;`
  - Header: Single close button `(X)` on top-left (`40px x 40px`, `#f1f3f4`), Single `Update` button on top-right (`#de3163`, `#ffffff`, `height: 40px`, `border-radius: 16px`).
  - Swaps empty 6-tool picker with actual media attachment card preview if card has an attachment.

---

## 3. Remote Debugging & REA Setup on a New PC

When working on a new machine:

1. **Launch Microsoft Edge in Remote Debugging Mode**:
   Run the provided batch file or command:
   ```cmd
   start-edge-debug.bat
   ```
   Or directly in terminal:
   ```cmd
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --remote-allow-origins=* --user-data-dir="%LOCALAPPDATA%\Microsoft\Edge\User Data Debug" https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6 http://localhost:8080/index.html
   ```

2. **Run Local Dev Server**:
   ```cmd
   npx -y serve . -p 8080
   ```

3. **Verify Connection**:
   Check `http://127.0.0.1:9222/json` to confirm both tabs are active:
   - Target 1: `padlet.com/ezzarscarlet/...` (Live Ground Truth)
   - Target 2: `http://localhost:8080/index.html` (Local App)

4. **CDP Stability Rules**:
   - Always call `Page.bringToFront` before `Page.captureScreenshot`. Background Chromium tabs hang screenshots.
   - When triggering `Page.reload`, close the WebSocket, wait 2 seconds, and connect afresh to avoid broken execution contexts.
