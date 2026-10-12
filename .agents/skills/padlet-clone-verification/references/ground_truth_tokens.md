# Padlet Ground Truth Design Tokens & Component Specifications

Extracted directly via Chrome DevTools Protocol from live Padlet (`https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6`).

---

## 1. Board & Column Architecture
- **Wallpaper:** Starry galaxy aurora (`linear-gradient(135deg, #012b32 0%, #034857 50%, #001f24 100%)` with radial glows).
- **Columns:** 5 horizontal shelf sections, horizontally centered with auto margins (`first:ms-auto; last:me-auto;`).
- **Column Sizing:** Total column width `272px`, card width `256px`, column gap `16px`.
- **Vertical Scrolling:** Posts inside a section column expand naturally without clipping or internal card scrollbars. Vertical scrolling occurs between posts in the section, not inside individual cards.

---

## 2. Section Headers (Folder Tabs)
- **Folder Body:** `background: #014e62` (`rgb(1, 78, 98)`), height `40px`, border-radius `5px 0 0 5px`.
- **Right Wing:** `skew-x-[10deg]`, `background: #014e62`, border-radius `0 5px 5px 0`.
- **Section Menu Button (3-dots):** Transparent circle with subtle hover tint.
- **Add Post Pill (`+`):** `background: rgba(0, 0, 0, 0.24)`, `backdrop-filter: blur(4px)`, height `32px`, pill radius `9999px`.

---

## 3. Card Styles & Color Themes
- **Ocean Blue Palette (Default for first section):**
  - Outer article: `background: #9addfb` (`rgb(154, 221, 251)`), radius `12px`.
  - Inner content: `background: #bbeaff`, radius `12px`, text color `#111111`.
- **White Palette:**
  - Outer article: `background: #f5f6f7`, radius `12px`.
  - Inner content: `background: #ffffff`, radius `12px`, text color `#111111`.
- **Pinned Badge:** Top banner with thumbtack icon and `"Pinned"` label.
- **Card 3-dots Button:** `class="card-dots-btn"`, 32px height, top-right absolute positioning.

---

## 4. Card Context Menu (3-Dots Popup)
- **Container:**
  - `width: 256px`
  - `background: #ffffff`
  - `border-radius: 20px`
  - `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18)`
  - `padding: 8px`
  - `z-index: 1800`
- **11 Menu Items:**
  1. `Open post` (expand icon)
  2. `Open post in new tab` (external link icon)
  3. `Copy link to post` (link icon)
  4. `Start slideshow from this post` (play icon)
  5. **Color Swatches Row:** 6 pastel circles (White, Red, Orange/Yellow, Green, Blue, Purple) with checkmark on active color.
  6. `Edit post` (pencil icon)
  7. `Add post before` (insert above icon)
  8. `Add post after` (insert below icon)
  9. `Duplicate post` / `Copy to another` / `Transfer`
  10. `Pin post` / `Unpin post`
  11. `Delete post` (`color: #ef4444`, hover `#fef2f2`, trash icon)

---

## 5. Docked Post Composer (`+ Post`)
- **Docking:** Docked bottom-right drawer, `width: 380px`.
- **Header:**
  - Left controls: Close `(X)`, Expand `(↗)`, Minimize `(—)`.
  - Right control: `Submit` button (`border-radius: 16px`, height `40px`).
    - Disabled state: `background: #f1f3f4`, `color: #9ca3af`.
    - Enabled state: `background: #de3163` (Padlet Pink), `color: #ffffff`.
- **Fields:**
  - Title: Placeholder `"Your name"`, bold 16px.
  - Multi-Tool Striped Picker: 6 pinstriped vertical tools (Upload, Camera, AI Art, Link, Search, All tools), dashed border `#e2e2e2`, height `165px`.
  - Body: Rich text / textarea with placeholder `"Write something beautiful..."`.
  - Bottom Pills: `"White ▾"`, `"§ Instructions ▾"`.

---

## 6. Centered Edit Post Modal ("Update" Workflow)
- **Backdrop:** Fixed dark backdrop (`background: rgba(0, 0, 0, 0.55)`, `backdrop-filter: blur(4px)`).
- **Dialog Container:**
  - Centered: `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`
  - `width: 540px !important; max-width: min(540px, calc(100vw - 32px));`
  - `background: #ffffff !important;`
  - `border-radius: 24px !important;`
  - `box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25) !important;`
- **Header:**
  - Left: Single circular close button `(X)` (`40px x 40px`, `#f1f3f4`, `#4b5563`).
  - Right: Single `Update` button (`background: #de3163`, `color: #ffffff`, `height: 40px`, `border-radius: 16px`, `padding: 0 20px`).
- **Attachment Preview:**
  - If card has an existing attachment, replaces the 6-tool striped picker with a rich attachment preview card showing media title, thumbnail/badge, and remove button `(X)`.
