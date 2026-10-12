# Padles — 100% Pixel-Perfect Padlet Shelf Board Clone

A faithful, high-fidelity, and interaction-complete recreation of **Padlet's Shelf / Section Board**, engineered with vanilla HTML, CSS, and modern JavaScript with zero external frameworks or build tooling.

![Padles Overview](docs/screenshots/post_workflow_4_final_board.png)

---

## ✨ Features & Parity Highlights

### 1. Authentic Post Composer
* **Top Bar Controls**: Exact Padlet SVG icons for Close, Expand/Dock toggle, Minimize to dock, and Schedule post.
* **Hot-Pink Publish Button**: Active button transitions to Padlet's signature hot-pink `#ff1f6d` with white text and glowing drop shadow (`box-shadow: 0 4px 14px rgba(255, 31, 109, 0.4)`).
* **Striped Multi-Tool Attachment Bar**: Signature striped SVG diagonal background patterns across tool columns with tooltips and shortcut indicators (`Upload`, `Camera`, `AI Art`, `Link`, `Search`, and `All tools`).
* **Composer Bottom Bar**: Color swatch selector, Section selector pill with official Section glyph, and `Fields` button for custom post properties.

![Post Composer](docs/screenshots/post_workflow_1_composer.png)

### 2. In-Place Edit & Update Post Workflow
* **Hover Controls**: Hovering any card on the board reveals a quick **`Edit`** button, a subtle hairline divider, and the 3-dots action button.
* **Update State**: Clicking `Edit` mounts the post into the active composer with existing title, body, section, color, and custom field values. The submit button switches to **`Update`** in hot-pink `#ff1f6d`, saving modifications directly in place.

### 3. Card 3-Dots Context Menu & Color Circles
* **Inline 6 Pastel Color Circles**: Row of White, Red, Yellow, Green, Blue, and Purple swatches with an active checkmark indicator. Clicking any circle instantly recolors the post on the board.
* **14 Structured Menu Actions**:
  1. `Open post` (Opens fullscreen theater modal)
  2. `Open post in new tab`
  3. `Copy link to post`
  4. `Start slideshow from this post`
  5. *Color Swatch Bar* (6 pastel circles)
  6. `Edit post`
  7. `Add post before`
  8. `Add post after`
  9. `Duplicate post`
  10. `Copy to another padlet`
  11. `Transfer to another padlet`
  12. `Pin / Unpin post`
  13. `Delete post` (Danger red styling)

![Card Context Menu](docs/screenshots/post_workflow_2_context_menu.png)

### 4. Expanded Post Theater View Modal
* **Media Canvas (Left / Center)**: Fullscreen dark overlay with subtle radial dot-grid (`background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`), floating close button, and media player/presentation canvas.
* **Sidebar (Right, 360px)**: Top-right folded corner accent in cyan, board & section metadata, custom fields chips, smiley reaction counter, and an interactive **Comments thread** with real-time comment adding.
* **Navigation Strip (Far-Right, 48px)**: `Post X of Y` counter with Next and Previous buttons to cycle through posts across the board.

![Theater View Modal](docs/screenshots/post_workflow_3_theater.png)

### 5. Slot-Based Multiple Drafts Dock
* **Zero Tab Reordering**: Drafts maintain fixed chronological order. Opening Draft 3 out of 5 expands Draft 3 in place, while Draft 1 and 2 remain on the left and Draft 4 and 5 remain on the right.
* **Speech Bubble Bulk Menu**: Overlapping cards SVG button with pointer tail containing `Publish all drafts` and `Delete all drafts`.
* **Undo Snackbar**: 10-second restoration toast with `Ctrl + Z` keyboard support for accidentally discarded drafts.

### 6. Dual-Scrollbar Section Architecture
* Horizontal scrolling for the multi-column sections track.
* Independent vertical scrolling inside individual section columns, matching Padlet's real layout engine.

---

## 🚀 Quick Start

Padles runs directly in any modern browser without npm, node, or build servers.

1. Clone the repository:
   ```bash
   git clone https://github.com/fluffykitten/padles.git
   cd padles
   ```
2. Open `index.html` in your browser:
   * **Windows**: Double-click `index.html` or run `start index.html`
   * **macOS**: `open index.html`
   * **Linux**: `xdg-open index.html`

---

## 📁 Repository Structure

```
padles/
├── index.html                                                  # Core semantic markup, modals & SVG icons
├── styles.css                                                  # Comprehensive Padlet design system & tokens
├── app.js                                                      # Application logic, state management & UI handlers
├── padles_pixel_perfect_clone_specification_antigravity_blueprint.md  # Detailed feature blueprint specification
├── docs/
│   ├── architecture_comparison_and_migration_plan.md          # Full-stack Node.js vs. Rust architecture plan
│   ├── post_workflow_iteration_report.md                      # Post features parity verification report
│   └── screenshots/                                           # High-resolution verification captures
└── README.md
```

---

## 📐 Plans & Architecture Roadmap

* **[Architectural Evolution Plan: Node.js vs. Rust](docs/architecture_comparison_and_migration_plan.md)**: Deep-dive analysis and phased migration roadmap for transitioning Padles to a production multi-user stack (WebSocket real-time sync, PostgreSQL/SQLite database schema, and S3 media pipeline).
* **[Post Workflow Iteration & Parity Report](docs/post_workflow_iteration_report.md)**: Verification documentation covering tests across post creation, in-place update, context menu actions, and theater view.
* **[Blueprint Specification](padles_pixel_perfect_clone_specification_antigravity_blueprint.md)**: Complete functional and behavioral specification derived from live Padlet reverse engineering.

---

## 🛠️ Built With

* **HTML5**: Semantic markup, dialogs, accessibility roles (`role="dialog"`, `role="menu"`).
* **CSS3**: Custom design tokens, glassmorphism, flexbox/grid layout, smooth bezier transitions.
* **Vanilla JavaScript (ES6+)**: Zero framework dependencies, reactive DOM event delegation, `localStorage` caching.

---

## 📄 License

MIT License. Created by Salman Madani.
