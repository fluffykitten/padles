---
name: padlet-clone-verification
description: >-
  Enforces strict 100% pixel-perfect Padlet clone parity, REA reverse-engineering workflows, CDP browser inspection, and visual screenshot verification for the Padles web application. Always activate this skill when modifying, inspecting, or verifying any UI component, modal, menu, layout, style, or interaction in Padles against the live Padlet board.
---

# Padlet Clone 100% Parity Verification & REA Skill

This skill enforces strict, zero-guesswork reverse engineering and visual verification to ensure `Padles` maintains **100% pixel-perfect fidelity** with the reference Padlet board:
`https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6`

---

## 1. Absolute Directives

1. **Zero Guesswork:** Never assume CSS values, color schemes, or component layouts. Padlet uses clean `#ffffff` surfaces with `#de3163` hot-pink accents; never invent dark modal themes (`#1f2125`) or generic CSS.
2. **REA / CDP Ground Truth:** Live Padlet running in Microsoft Edge with remote debugging on port `9222` is the single source of truth.
3. **Mandatory Visual Screenshot Proof:** You are strictly forbidden from claiming parity or reporting completion without capturing screenshots, viewing them via `view_file`, and verifying side-by-side against reference screenshots.

---

## 2. Environment Setup (On Any Machine)

When cloning or pulling this repository on a new machine:

1. **Start Microsoft Edge in Remote Debugging Mode:**
   Double-click `start-edge-debug.bat` or run:
   ```cmd
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --remote-allow-origins=* --user-data-dir="%LOCALAPPDATA%\Microsoft\Edge\User Data Debug" https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6 http://localhost:8080/index.html
   ```

2. **Start Dev Server:**
   ```cmd
   npx -y serve . -p 8080
   ```

3. **Verify Connection:**
   Run:
   ```cmd
   node .agents/skills/padlet-clone-verification/scripts/verify_parity.js
   ```

---

## 3. Reverse Engineering Live Elements (REA Workflow)

To inspect any component on the live Padlet tab and extract its exact computed styles, bounding box, and HTML:

```bash
node .agents/skills/padlet-clone-verification/scripts/inspect_live_padlet.js "<css-selector>"
```

### Common Selectors for Live Padlet:
- **Board Title:** `"h1"`
- **Section Headers:** `"[data-testid='surfaceSectionHeader']"` or `".section-title-capsule"`
- **Add Post Button:** `"[data-testid='surfaceSectionAddButton']"`
- **Cards:** `"article"`
- **Card 3-dots Button:** `"[data-testid='surfacePostMoreActionsButton']"` or `".card-dots-btn"`
- **Card Context Menu:** `"[data-testid='surfacePostActionMenu']"`
- **Composer / Modal:** `"[data-testid='surfaceComposerCard']"`

---

## 4. Capturing Visual Verification Proofs

Whenever you modify any styling, layout, or interaction in `styles.css`, `app.js`, or `index.html`:

1. **Run the automated capture script:**
   ```bash
   node .agents/skills/padlet-clone-verification/scripts/capture_visual_proof.js
   ```

2. **Review the 4 generated screenshots using `view_file`:**
   - `docs/screenshots/verify_board.png` (Default board layout and columns)
   - `docs/screenshots/verify_docked_composer.png` (Docked composer drawer)
   - `docs/screenshots/verify_card_menu.png` (Card 3-dots context popup)
   - `docs/screenshots/verify_edit_modal.png` (Centered 540px edit modal with dark backdrop)

3. **Confirm Parity:** Check that colors, radii, spacing, buttons, and borders exactly match the reference specifications in [ground_truth_tokens.md](./references/ground_truth_tokens.md).

---

## 5. CDP Best Practices & Gotchas

- **Bring to Front:** Chromium tabs running in the background will hang `Page.captureScreenshot`. Always call `Page.bringToFront` before capturing.
- **Reloading:** When reloading `localhost:8080` to pick up code changes, use `Page.reload({ ignoreCache: true })`, close the WebSocket connection, wait 2 seconds, and reconnect to ensure clean execution contexts.
- **Native WebSockets:** All helper scripts in `scripts/` use Node.js v22+ built-in `fetch` and `WebSocket`. No `npm install` or third-party dependencies are required.
