# Padles

A lightweight collaborative board for organizing posts, media, and notes into sections, inspired by Padlet. Built with standard HTML, CSS, and vanilla JavaScript (WIP).

![Padles Overview](docs/screenshots/post_workflow_4_final_board.png)

---

## What is Padles?

Padles is a self-hostable, web-based bulletin board. It organizes content into vertical sections (columns) on a horizontal board, making it easy to brainstorm, collect resources, take notes, or run interactive discussions.

### Key Features

* **Multi-column Shelf Layout**: Add and organize sections horizontally, each with independent vertical scrolling.
* **Post Composer**:
  * Rich editor with title, body, and custom post fields.
  * Card colors (white, red, yellow, green, blue, purple) and section assignment.
  * Attachment support for images, videos, audio recordings, links, drawings, and files.
  * Multi-draft dock at the bottom to switch between drafts without losing work.
* **Card Actions & Context Menu**:
  * Quick edit button on hover.
  * Right-click context menu: color picker, duplicate, pin/unpin, transfer, delete.
  * Expanded theater view modal with media viewer and comments thread.
  * Emoji reactions with counters.
* **Zero Build Setup**: Written in pure browser-compatible code. Open `index.html` in any browser to get started immediately.
* **Optional Backend**: Runs out of the box with `localStorage`, with an optional Supabase integration for multi-user sync and persistence.

---

## Getting Started

No build tools, Node.js, or package managers required.

1. Clone the repository:
   ```bash
   git clone https://github.com/fluffykitten/padles.git
   cd padles
   ```

2. Open `index.html` directly in your browser:
   * **Windows**: Double-click `index.html` or run `start index.html`
   * **macOS**: `open index.html`
   * **Linux**: `xdg-open index.html`

---

## File Structure

```
padles/
├── index.html                                 # Main markup, modal templates, and icons
├── styles.css                                 # App layout, typography, and theme styling
├── app.js                                     # Core board state, rendering, and event handlers
├── supabase-service.js                        # Optional Supabase client for remote sync
├── start-edge-debug.bat                       # Script to launch Edge with remote debugging
├── docs/
│   ├── architecture_comparison_and_migration_plan.md   # Supabase & Cloudflare R2 backend spec
│   ├── padles_tools_revamp_plan.md                    # Roadmap for AV Studio & composer tools
│   ├── rea_and_edge_setup_guide.md                    # Edge debugging setup guide
│   ├── post_workflow_iteration_report.md             # Post feature test report
│   └── screenshots/                                  # UI screenshots
└── README.md
```

---

## Documentation & Roadmap

* **[Tools Revamp Plan](docs/padles_tools_revamp_plan.md)**: Plan for implementing native camera, video, voice recording, and drawing tools.
* **[Backend & Architecture Plan](docs/architecture_comparison_and_migration_plan.md)**: Optional roadmap for Supabase database schemas and Cloudflare R2 file storage.
* **[DevTools Setup Guide](docs/rea_and_edge_setup_guide.md)**: How to run Edge in debug mode for inspecting and testing UI parity.

---

## Tech Stack

* **HTML5**: Semantic markup and accessible dialog elements.
* **CSS3**: Custom properties, flexbox, grid, and dark mode support.
* **JavaScript**: Modern ES6+ with no runtime dependencies.

---

## License

MIT License.
