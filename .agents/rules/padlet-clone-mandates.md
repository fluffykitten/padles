# PADLET CLONE 100% PARITY & REA MANDATES

> [!IMPORTANT]
> **STRICT REPOSITORY POLICY FOR ALL AI AGENTS**
> 1. This application (`Padles`) is a strict, **100% pixel-perfect clone** of the live Padlet board (`https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6`).
> 2. **NO GUESSWORK:** You are forbidden from guessing CSS colors, dimensions, borders, shadows, or component structures. Real Padlet uses clean `#ffffff` surfaces with `#de3163` hot-pink accents; never invent dark modal themes or generic styles.
> 3. **GROUND TRUTH REA / CDP:** Always extract live DOM structure and computed styles from the live Padlet instance running in Edge with remote debugging on port `9222`.
> 4. **VISUAL PROOF REQUIRED:** You may NEVER report a task as complete or claim "pixel-perfect" without capturing screenshots of the local app using the verification scripts, viewing them with `view_file`, and verifying side-by-side against reference screenshots.

---

## 1. Ground Truth Design Tokens Quick Reference

- **Board Background:** Starfield galaxy wallpaper with `#012b32` to `#034857` gradient.
- **Section Headers:** Skewed folder tab in teal `#014e62` with `skew-x-[10deg]` wing.
- **Columns:** 5 section columns, `272px` total column width (`256px` inner card width), `16px` column gap.
- **Card Color Schemes:**
  - *Ocean Blue*: Outer `#9addfb`, Inner `#bbeaff`, text `#111111`, radius `12px`.
  - *White*: Outer `#f5f6f7`, Inner `#ffffff`, text `#111111`, radius `12px`.
- **Card Context Menu (3-dots dropdown):**
  - Container: `width: 256px`, `background: #ffffff`, `border-radius: 20px`, `box-shadow: 0 16px 40px rgba(0,0,0,0.18)`, `padding: 8px`.
  - 11 items including 6 color swatches row (White, Red, Orange, Green, Blue, Purple).
- **Docked Post Composer (`+ Post`):**
  - Width: `380px`, docked bottom-right.
  - Header: Close `(X)`, Expand `(↗)`, Minimize `(—)` on left; Submit button on right.
  - Submit button inactive: `#f1f3f4`, `#9ca3af`, `border-radius: 16px`, height `40px`.
  - Submit button active: `#de3163` Padlet Pink, `#ffffff`.
- **Centered Edit Post Modal:**
  - Fixed centered dialog with dark backdrop.
  - Width: `540px !important`, `border-radius: 24px`, `background: #ffffff`, `box-shadow: 0 16px 48px rgba(0,0,0,0.25)`.
  - Header: Single close `(X)` on left, single `Update` button (`#de3163`, `height: 40px`, `border-radius: 16px`) on right.

---

## 2. Mandatory Verification Step

Before reporting any UI change to the user:
1. Run `node .agents/skills/padlet-clone-verification/scripts/capture_visual_proof.js`
2. View the resulting image files using `view_file`.
3. If any element differs from the live Padlet screenshot, fix it immediately.
