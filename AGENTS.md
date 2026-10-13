# Padles Development & Clone Fidelity Rules

## Zero-Guessing & Strict REA Verification Policy

When working on Padles to replicate or build features from Padlet:

1. **NO GUESSWORK OR APPROXIMATION**:
   - You MUST NOT guess CSS rules, colors, layout dimensions, paddings, margins, border radii, typography metrics, or SVG icon paths.
   - You MUST NOT use generic placeholders or approximate components (e.g., generic toggle switches, standard HTML dialogs).

2. **RUNTIME REA EVIDENCE IS GROUND TRUTH**:
   - Always connect to live runtime instances of Padlet running in Microsoft Edge (`http://127.0.0.1:9222`) or through REA MCP tools (`inspect_web_page`, `observe_web_execution`, `list_browser_targets`).
   - Extract raw `getComputedStyle()` metrics, bounding client rects, exact SVG markup, and DOM tree structures directly from Padlet's live DOM.

3. **100% CLONE FIDELITY CHECKLIST**:
   - **Typography**: Exact font families (`Inter var`, `Inter`), weights, sizes, line heights, and letter spacings.
   - **Colors**: Exact RGB/RGBA hex color codes and alpha transparencies.
   - **Geometry**: Matching container heights, widths, scroll gutters (`color-scheme: dark`), padding, and margins.
   - **Physics & States**: Authentic micro-interactions, focus outlines (e.g. Canary `#fec006`), toggle transitions (`translateX(16px)`), subpanel slides, and keyboard bindings (<kbd>Escape</kbd>).

4. **MANDATORY AUTOMATED PROOF**:
   - Before completing any cloning or UI feature task, you MUST write and execute an automated CDP verification script comparing Padlet vs. Padles.
   - Diff tolerance: **0 strict diffs**.
   - If diffs exist, adjust CSS tokens or DOM structure until 0 diffs remain.
   - Execute interactive scenario testing and visual side-by-side screenshot verification.
