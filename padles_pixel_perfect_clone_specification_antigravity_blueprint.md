# Padles: Complete Engineering Blueprint & Antigravity Prompt Pack

This document provides the exhaustive, pixel-perfect specification for cloning the Padlet board interface (named **Padles**). It covers every visual element, micro-interaction, modal state, data model, and custom field engine shown in the reference recording, followed by modular prompts formatted specifically for execution in Antigravity.

## 1. Visual Design Tokens & Styling System

### 1.1 Color Palette

```
:root {
  /* Canvas & Layout */
  --bg-board-gradient-from: #08282b;
  --bg-board-gradient-to: #0e3d40;
  --bg-topbar: #072224;
  --bg-topbar-border: rgba(255, 255, 255, 0.08);

  /* Section Columns */
  --section-header-bg: #114246;
  --section-header-hover: #154e53;
  --section-header-text: #ffffff;
  --section-add-btn-bg: rgba(255, 255, 255, 0.12);
  --section-add-btn-hover: rgba(255, 255, 255, 0.22);

  /* Cards (Surface) */
  --card-bg-white: #ffffff;
  --card-text-primary: #1e293b;
  --card-text-secondary: #64748b;
  --card-border: #e2e8f0;
  --card-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.18), 0 2px 6px -1px rgba(0, 0, 0, 0.12);

  /* Pinned Pill */
  --badge-pinned-bg: #e0f2fe;
  --badge-pinned-text: #0369a1;

  /* Floating Action Button (FAB) */
  --fab-bg: #ffca28;          /* Vibrant warm yellow */
  --fab-bg-hover: #ffd54f;
  --fab-text: #1a1a1a;
  --fab-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);

  /* Post Composer & Dark Modals */
  --composer-bg: #1e2022;     /* Dark charcoal */
  --composer-border: #2e3236;
  --composer-text: #f3f4f6;
  --composer-subtext: #9ca3af;
  --composer-input-bg: transparent;
  --composer-button-pill: #2a2d31;
  --composer-button-pill-hover: #363a40;
  --composer-publish-active: #ff3366; /* Magenta / Hot Pink */
  --composer-publish-disabled: #374151;

  /* Card Colors (Bottom Bar Palette) */
  --swatch-white: #ffffff;
  --swatch-red: #ffcdd2;
  --swatch-yellow: #fff9c4;
  --swatch-green: #c8e6c9;
  --swatch-blue: #bbdefb;
  --swatch-purple: #e1bee7;

  /* System Accents & Feedback */
  --danger-red: #ef4444;
  --toast-draft-bg: #fef08a;
  --toast-draft-text: #713f12;
}

```

### 1.2 Typography & Radii

* **Font Family**: Inter, `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

* **Board Title**: `font-bold text-xl tracking-tight text-white`

* **Board Subtitle**: `font-normal text-xs text-teal-200/70`

* **Section Headers**: `font-semibold text-sm text-white`

* **Card Titles**: `font-semibold text-base text-slate-900 leading-snug`

* **Card Body**: `font-normal text-sm text-slate-700 leading-relaxed`

* **Card Border Radius**: `16px` (`rounded-2xl`)

* **Modal / Composer Border Radius**: `20px` (`rounded-[20px]`)

* **Pills & Badges**: `9999px` (`rounded-full`)

## 2. Layout & Shell Architecture

```
+-----------------------------------------------------------------------------------------------+
| [<-] [Logo] Title: Physics Audio Reflections...  | [Slideshow] [Share] [*] [Search] [Avatar]   | <- Top Navigation
+-----------------------------------------------------------------------------------------------+
| +----------------+ +----------------+ +----------------+ +----------------+ +----------------+ |
| | Section 1 [:]  | | Section 2 [:]  | | Section 3 [:]  | | Section 4 [:]  | | Section 5 [:]  | |
| |      (+)       | |      (+)       | |      (+)       | |      (+)       | |      (+)       | |
| |                | |                | |                | |                | |                | |
| | [Pinned Card]  | | [Media Card]   | | [Media Card]   | | [Link Card]    | |                | |
| | - Title        | | - Video Embed  | | - Video Embed  | | - Web Preview  | |                | |
| | - Rich text    | | - Caption      | | - Caption      | | - Domain / Fav | |                | |
| |                | |                | |                | |                | |                | |
| | [Text Card]    | | [Audio Card]   | |                | |                | |                | |
| +----------------+ +----------------+ +----------------+ +----------------+ +----------------+ |
|                                                                                               |
| [Draft 1] [Draft 2] [Draft 3]                                                      [+ Post]   | <- Floating Dock
+-----------------------------------------------------------------------------------------------+

```

### 2.1 Top Navigation Bar

* **Left Segment**:

  * Back button (`<` arrow).

  * App icon (Padles origami/notebook emblem).

  * Board Title: Editable inline on click.

  * Metadata string: `{Author Name} • {Time ago}` (e.g. `Shannon Mockler • 5h`).

* **Right Segment**:

  * Slideshow button: Rounded pill with Play icon and label `Slideshow`.

  * Share button: Outline pill with user/invite icon.

  * Quick settings gear icon.

  * Search icon (filters posts in real-time).

  * User profile avatar circle.

### 2.2 Sections System (Shelf / Column View)

* **Horizontal Scroll Container**: Flex layout with `overflow-x-auto`, smooth scrolling, custom scrollbar styling, `gap-4 p-4`.

* **Column Width**: Fixed `320px` to `360px` per column.

* **Column Header**:

  * Rounded background pill (`bg-[#114246]`).

  * Column title with inline edit capability.

  * Post count or drag handle.

  * 3-Dots Context Menu (`MoreHorizontal` icon).

  * Hover `+` Button: Full-width button directly underneath header (`Add post to this section`).

#### Section Context Menu Actions (Exact Order from Recording)

 1. `+ Add post` (Opens composer locked to this section)

 2. `Start slideshow from this section`

 3. *Divider*

 4. `New section left` (Inserts adjacent empty column to the left)

 5. `New section right` (Inserts adjacent empty column to the right)

 6. `Move section right` (Reorders column index)

 7. *Divider*

 8. `Rename section`

 9. `Make section default` (Target for global FAB creations)

10. `Copy section name`

11. `Copy breakout room link`

12. *Divider*

13. `Delete section` (Red destructive text `#ef4444`)

## 3. Post Card Component Anatomy

### 3.1 Card Variants & Surface Renderers

1. **Pinned Card**:

   * Header badge: Light blue rounded pill `📌 Pinned` at top left.

   * Actions: Top-right `...` menu on hover (Edit, Copy, Delete, Pin/Unpin, Expand).

   * Title: Bold slate typography.

   * Body: Rich text, rendered with paragraph spacing, bullet list styling, and bold tags.

2. **Video Card (YouTube / Direct MP4)**:

   * 16:9 Aspect ratio thumbnail preview container.

   * Centered rounded play button with backdrop blur.

   * Video title and author footer badge (`YouTube • Balloon car making`).

3. **Web Link Preview Card**:

   * Scraped open-graph image banner.

   * Domain favicon, website URL (`iamascientist.info`), and title (`Classroom Resources • I Am A Scientist`).

4. **Custom Color Card**:

   * Background color tint based on post selection (`white`, `red`, `yellow`, `green`, `blue`, `purple`).

## 4. Post Composer ("Create/Edit Post" Modal)

The composer can appear either as an in-place draft card inside a column or as a focused modal dialog.

```
+------------------------------------------------------------------+
|  [<->] [X]                                        [(Clock)] [Publish] |
|------------------------------------------------------------------|
|  Your name                                                       |
|                                                                  |
|  [ ^ Upload ] [ (o) Camera ] [ Video ] [ Link ] [ Search ] [All] |
|  Ctrl+1       Ctrl+2                                       Ctrl+6|
|                                                                  |
|  Write something fantastic...                                    |
|                                                                  |
|------------------------------------------------------------------|
|  [O White v]        [Section: Balloon Cars v]          [+ Fields] |
+------------------------------------------------------------------+

```

### 4.1 Composer Header

* **Top-Left**:

  * Expand/Compress toggle icon (`Maximize2` / `Minimize2`).

  * Close icon (`X`): Triggers auto-save to bottom draft bar.

* **Top-Right**:

  * Schedule Post icon (`Clock` icon with tooltip `Set a future publish date`).

  * `Publish` Button: Magenta pill (`#ff3366`), disabled with dark grey state until either Title, Body, or Attachment is present.

### 4.2 Composer Fields & Quick Attachment Bar

* **Subject / Title Input**:

  * Transparent borderless input, `text-xl font-bold placeholder-gray-400`.

  * Placeholder configurable via Board Settings (default: `Your name` or `Subject`).

* **Quick Media Attachment Row**:

  * Horizontal bar with 5 circular/pill buttons + `All tools` button:

    1. **Upload** (`UploadCloud` icon, tooltip `Upload | Ctrl + 1`) -> Opens local file picker.

    2. **Camera** (`Camera` icon, tooltip `Camera | Ctrl + 2`) -> Requests webcam snapshot.

    3. **Video recorder** (`Video` icon, tooltip `Record video`) -> Webcam video stream recorder.

    4. **Link** (`Link2` icon, tooltip `Link | Ctrl + 4`) -> URL prompt with instant OpenGraph fetching.

    5. **Image search** (`Search` icon, tooltip `Image search | Ctrl + 5`) -> Unsplash / Web image query modal.

    6. **All tools** (`LayoutGrid` icon, tooltip `All tools | Ctrl + 6`) -> Opens the full tool grid sheet.

* **Body / Description Input**:

  * Multi-line textarea auto-expanding up to max-height, `placeholder: "Write something fantastic..."`.

  * Supports Markdown rendering and inline pasting (images, links).

### 4.3 Composer Footer Controls

* **Card Color Picker**:

  * Dropdown showing selected color swatch preview + label (e.g., `White v`).

  * Dropdown list: Vertical radio list with colored dots for `White`, `Red`, `Yellow`, `Green`, `Blue`, `Purple`.

* **Section Selector**:

  * Pill dropdown showing current target column (e.g. `§ Balloon Cars v`).

  * Allows re-routing the post to any board section prior to publishing.

* **`+ Fields` Button**:

  * Opens the Custom Post Fields Drawer to toggle visibility of standard fields or inject schema-defined custom fields.

## 5. Attachment & Sub-Modal Systems

### 5.1 "All Tools" Modal Grid (21 Built-In Tools)

* **Search Header**:

  * Full-width search input with pill styling: `Search web or paste URL` with gold outline focus ring.

* **Tools Grid (3 columns on desktop, 2 on mobile)**:

   1. `Padlet` (Internal board link)

   2. `Padlet Arcade` *(Badge: "New")*

   3. `Upload`

   4. `Link`

   5. `Camera`

   6. `Video recorder`

   7. `Audio recorder`

   8. `Screen recorder`

   9. `Draw` (Canvas sketch pad)

  10. `Poll` (Quick voting creator)

  11. `Google Drive` (OAuth file picker)

  12. `OneDrive` *(Badge: "New")*

  13. `AI image` (Text-to-image generator)

  14. `AI speech` (Text-to-speech audio note)

  15. `Photo album` *(Badge: "New")*

  16. `Image search`

  17. `GIF` (Tenor/Giphy search)

  18. `YouTube` (Direct search & embed)

  19. `Spotify` (Track/playlist preview embed)

  20. `Web search`

  21. `Location` (Map pin picker)

### 5.2 Schedule Post Modal

* **Title**: `Schedule post`

* **Subtitle**: `Set a future publish date`

* **Input**: Combined Date-Time Picker input box displaying selected timestamp (e.g. `10/12/2026 01:10 PM`).

* **Timezone Footnote**: Automatic local time detection string (e.g. `Timezone: Western Indonesia Time`).

* **Actions**: `Cancel` (ghost button), `Set date` (solid pink/red action button).

## 6. Post Fields Configuration & Custom Fields Engine

The Board Administrator can customize what fields exist on every card via the **Post Fields Drawer**.

### 6.1 Default Field Controls

1. **Subject**:

   * Toggle: `Hide` / `Show`

   * Text Input: `Subject placeholder text` (default: `Your name`)

   * Switch: `Required` (boolean)

2. **Attachment**:

   * Visibility Segment: `None` | `All` | `Custom`

   * Text Input: `Attachment text` (`"Describe the attachment you want added"`)

   * Switch: `Required`

   * Checklist with individual on/off switches for each of the 21 media tools.

3. **Body**:

   * Toggle: `Hide` / `Show`

   * Text Input: `Body placeholder text` (`"Write something fantastic..."`)

   * Switch: `Required`

4. **Color**:

   * Dropdown: `Show` / `Hide`

5. **Location**:

   * Dropdown: `Maps only` / `Always on` / `Hide`

### 6.2 Custom Field Types Specification

Clicking `+ Add custom field` opens a sub-editor with `Field name`, `Field type`, and `Required` toggle:

| **Field Type** | **Configuration Options & Schema** | 
| **Text** | Single line string input. | 
| **Date** | • `Show time` (toggle)  • `Display as`: Day, Month, Year dropdown  • `Formatting`: `Local`, `Friendly`, `MM/DD/YYYY`, `DD/MM/YYYY`, `ISO`, `Timestamp` | 
| **Vote** | • `Vote type`: `Upvote / downvote` OR `Upvote only`  • `Who can vote`: `Anyone with comment permissions`, `Creators and the post's author`, `Creators only` | 
| **Rating** | • `Who can rate`: Role selector  • `Maximum rating`: Numeric 1-10 (Star scale) | 
| **Score** | • `Who can score`: Role selector  • `Maximum score`: Number 1-100 | 
| **User** | Member assignment selector (tags a board collaborator). | 
| **Single select** | • Add/delete option items with labels  • `Default selection option` dropdown | 
| **Number** | • `Formatting`: `Local (1,000,000.00)`, `Comma, period`, `Period, comma`, `Space, comma`, `Space, period`  • `Decimal places`: `As entered`, `Whole number`, `1 decimal`, `2 decimals`, `3 decimals`, `4 decimals`  • `Thousand separators`: toggle  • Live Preview value display | 
| **Email** | Validated email string. | 
| **Phone number** | Formatted phone input. | 
| **URL** | Web address with outbound link button. | 
| **Button** | • `Button name`: Text label  • Action trigger (webhook, URL jump, or state change). | 

## 7. Multi-Draft Engine & Global Post Actions

### 7.1 Bottom Draft Dock

* When a user inputs text or media into the composer and presses the close button or clicks outside:

  * The current state is preserved into local state / indexedDB as a **Draft**.

  * The composer closes, and a pill tab docks at the bottom left: `Draft 1`, `Draft 2`, `Draft 3`.

  * Clicking any draft pill reopens that specific composer session with all attachments intact.

  * Deleting a draft triggers a top toast notification:
    `✓ Draft deleted | Undo | Ctrl + Z` (allows restoration within a 10-second window).

### 7.2 Global Floating Action Button (FAB)

* Position: `fixed bottom-6 right-6 z-40`.

* Style: Pill button with yellow background (`#ffca28`), black text, plus icon, label `+ Post`.

* Tooltip on hover:
  `"Double click anywhere, drag files in, paste from clipboard, or click here to post."`

* Triggers:

  * Clicking FAB opens composer assigned to the *default section*.

  * Double-clicking an empty spot in any column opens the composer inside that column.

  * Dragging and dropping an image/file anywhere onto a column automatically creates a draft card with that file uploaded.

## 8. Data Model & Database Schema (PostgreSQL / D1)

```
-- Boards table
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Untitled Padles',
  description TEXT,
  background_color TEXT DEFAULT '#08282b',
  author_id UUID NOT NULL,
  settings JSONB DEFAULT '{
    "subject_placeholder": "Your name",
    "subject_required": false,
    "body_placeholder": "Write something fantastic...",
    "body_required": false,
    "allow_comments": true,
    "reactions_type": "like"
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Board Sections / Columns
CREATE TABLE board_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom Field Definitions per Board
CREATE TABLE board_custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'text','date','vote','rating','score','select','number','email','url'
  required BOOLEAN DEFAULT false,
  options JSONB DEFAULT '{}'::jsonb, -- holds date formatting, score limits, select options
  position INTEGER NOT NULL DEFAULT 0
);

-- Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  section_id UUID REFERENCES board_sections(id) ON DELETE CASCADE,
  author_id UUID,
  author_name TEXT,
  subject TEXT,
  body TEXT,
  color TEXT DEFAULT 'white',
  is_pinned BOOLEAN DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post Attachments
CREATE TABLE post_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'upload','link','youtube','camera','drawing'
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom Field Values per Post
CREATE TABLE post_custom_field_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  field_id UUID REFERENCES board_custom_fields(id) ON DELETE CASCADE,
  value JSONB NOT NULL,
  UNIQUE(post_id, field_id)
);

```

## 9. Antigravity Execution Plan & Prompts

Copy and paste the following prompts sequentially into Antigravity to build Padles incrementally.

### Prompt 1: Project Setup & Design Token Foundation

```
Initialize a Next.js (App Router) project with Tailwind CSS, Lucide React, and Radix UI primitives.
Configure the design tokens matching Padlet dark/teal theme:
- Deep teal wallpaper canvas (#08282b to #0e3d40)
- Charcoal post composer (#1e2022) with magenta publish button (#ff3366)
- Vibrant yellow FAB button (#ffca28)
- White card components with smooth 16px rounded borders and realistic shadow elevation.
Create the global layout shell featuring:
1. Top Bar: Board title ("Physics Audio Reflections: I see, I think, I wonder"), author metadata, Slideshow button, Share button, Settings gear, and user avatar.
2. Bottom Floating Action Button (FAB) labeled "+ Post" at bottom-right with tooltip.
3. Horizontal scrolling board area that houses section columns.
Make sure the UI is pixel-perfect, clean, and responsive.

```

### Prompt 2: Shelf / Column Layout & Section Context Menus

```
Implement the Shelf/Column system for Padles:
1. Render a horizontal list of columns: "Instructions", "Balloon Cars", "Newton's First Law", "BIPOC Scientists", "Section 5".
2. Section header styling: Pill container with dark teal surface (#114246), white text, and an action trigger.
3. Hover action: Display a "+" button right under the column header with tooltip "Add post to this section".
4. Column 3-dots Context Menu: Build the full 13-item dropdown menu matching Padlet:
   - "+ Add post"
   - "Start slideshow from this section"
   - Dividers
   - "New section left", "New section right", "Move section right"
   - "Rename section", "Make section default", "Copy section name", "Copy breakout room link"
   - Red destructive "Delete section".
5. Wire up state management using Zustand for adding, renaming, reordering, and deleting columns.

```

### Prompt 3: Post Card Component & Media Renderers

```
Build the Post Card components rendered inside columns:
1. Support card variants:
   - Pinned Card: Features light blue "📌 Pinned" pill at top-left, title, formatted text, and hover context menu (Edit, Pin, Delete).
   - YouTube/Video Card: Renders 16:9 thumbnail preview, centered play button overlay, and YouTube title bar.
   - Link Preview Card: Shows scraped open-graph image, domain badge, and hyperlink title.
2. Card surface coloring: Allow cards to have tinted background colors: White, Red (#ffcdd2), Yellow (#fff9c4), Green (#c8e6c9), Blue (#bbdefb), Purple (#e1bee7).
3. Micro-interactions: Subtle scale on hover, smooth shadow lift, and click-to-expand modal view.

```

### Prompt 4: The Post Composer & Draft Management Engine

```
Build the dark-themed Post Composer modal and bottom draft docking engine:
1. Composer Anatomy:
   - Header: Resize icon, Close X, Clock icon (Schedule post), and Pink "Publish" button (#ff3366).
   - Subject Input: Placeholder "Your name", bold borderless text.
   - Quick Media Dock: Upload (Ctrl+1), Camera (Ctrl+2), Video recorder, Link (Ctrl+4), Image search (Ctrl+5), All tools (Ctrl+6).
   - Body textarea: Auto-expanding, placeholder "Write something fantastic...".
   - Footer Bar: Color picker dropdown (with radio dots), Section selector dropdown, and "+ Fields" button.
2. Draft Docking Bar:
   - When the composer is closed with uncommitted input, dock it as a pill at the bottom left ("Draft 1", "Draft 2", "Draft 3").
   - Clicking a draft pill restores the session.
   - When a draft is discarded, show top yellow toast: "✓ Draft deleted | Undo | Ctrl + Z" with restoration capability.
3. Keyboard shortcuts: Wire up Ctrl+1 through Ctrl+6 to trigger their respective attachment handlers.

```

### Prompt 5: Attachment Grid ("All Tools") & Schedule Modal

```
Implement the 21-tool media attachment modal and post scheduling dialog:
1. "All Tools" Modal:
   - Top search input: "Search web or paste URL" with yellow focus ring.
   - Grid items with custom icons and badges: Padlet, Padlet Arcade (New), Upload, Link, Camera, Video recorder, Audio recorder, Screen recorder, Draw, Poll, Google Drive, OneDrive (New), AI image, AI speech, Photo album (New), Image search, GIF, YouTube, Spotify, Web search, Location.
   - Implement functional mockup states for Link, YouTube embed URL, and Drawing canvas.
2. "Schedule Post" Dialog:
   - Triggered by clock icon in composer.
   - Fields: Header "Schedule post", subtext "Set a future publish date", combined date-time input showing "10/12/2026 01:10 PM", local timezone string.
   - "Cancel" and "Set date" action buttons.

```

### Prompt 6: Dynamic Post Fields & Custom Fields Builder

```
Build the Post Fields Drawer and Custom Field schema builder:
1. Post Fields Drawer:
   - Manage default fields: Subject (Show/Hide, placeholder, required), Attachment (None/All/Custom checklist), Body (Show/Hide, placeholder, required), Color (Show/Hide), Location (Maps only/Always on/Hide).
   - "+ Add custom field" button with subtitle "New: Score, vote and rating fields".
2. Custom Field Creator Sub-View:
   - Field name input, Required toggle, Discard & Create actions.
   - Field type dropdown supporting:
     * Text
     * Date (Show time toggle, Display as, 6 date formatters)
     * Vote (Upvote/downvote or Upvote only, voter permissions)
     * Rating (1-10 star rating, role permissions)
     * Score (1-100 numerical score, role permissions)
     * Single select (Dynamic options list with add/delete and default selection)
     * Number (Locale formatting dropdown, Decimal places selector, Thousand separator switch, live preview)
     * Email, Phone, URL, and Action Button.
3. Dynamically render these custom fields inside the Post Composer and onto the published cards.

```