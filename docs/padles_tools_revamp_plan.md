# Padles Tools Revamp Implementation Plan: 100% Reverse-Engineered Fidelity

## 1. Problem Statement & Ground Truth Audit

### Current Limitations in Padles
In Padles (`c:\padles\app.js` and `index.html`), the composer attachment tools currently fail to deliver a functional user experience:
1. **Camera, Video, Audio, and Screen**: Hardcoded dummy stubs that inject static Unsplash stock photos and toast messages without requesting browser media permissions or providing viewfinders.
2. **Draw**: Injects a static placeholder card titled `"Freehand Sketch Drawing"` without opening a canvas whiteboard.
3. **Poll**: Hardcodes a static poll card without an interactive question-and-option creation modal.
4. **Location**: Injects a static location string (`"MIT Physics Lab"`) without an interactive map picker.
5. **Link & AI Art**: Trigger browser-native `window.prompt()` alerts rather than in-app modals.
6. **All Tools Modal**: Does not match Padlet's 4 signature colored tile categories, unified top search/URL bar, or geometry.

### Reverse-Engineered Ground Truth (Live Padlet Runtime)
Direct CDP inspection of live Padlet (`936772306C5181274F50AC3777BC6788`) revealed that tools belong to specific unified dialog subsystems:
* **Unified AV Studio Modal (`avRecorderModal`)**: A single top-mounted modal (`720px × 520px`, `rounded-b-3xl`) managing **Photo (Camera)**, **Video**, **Audio**, and **Screen** via `getUserMedia` and `getDisplayMedia`. Includes shutter capture, recording timers, and a video playback/trimmer review screen (`Playback` | `Trim`).
* **Whiteboard Canvas (`drawModal`)**: A top-mounted drawing canvas with `WHITE` | `BLACK` background toggle, 10 preset color swatches, brush/eraser tools, undo/redo, and PNG export.
* **Interactive Poll Creator (`pollModal`)**: A `540px × 400px` modal with question input, dynamic radio choices (`Choice 1`–`4`, `+ Add option`), and interactive vote cards.
* **Map Location Picker (`locationModal`)**: A `720px × 520px` card with search geocoding (`"Search for a place"`), GPS current location button, style toggle (`Roadmap` | `Satellite` | `Terrain` | `Hybrid`), and pin dropping.
* **All Tools Hub (`moreAttachmentTypesModal`)**: Top input `"Search web or paste URL"` with 21 tools organized into **4 color-coded tile groups** (`#F7EDFF`, `#ECF6FF`, `#EEFFED`, `#FFF5EF`).

---

## 2. Architecture & Subsystem Breakdown

```mermaid
graph TD
    Composer[Post Composer] --> Dock[Attachment Tool Dock]
    Dock --> CamBtn[Camera]
    Dock --> AllBtn[All Tools]
    Dock --> LinkBtn[Link]
    Dock --> SearchBtn[Search]
    Dock --> UpBtn[Upload]

    CamBtn --> AVModal[1. Unified AV Studio Modal<br>Photo | Video | Audio | Screen]
    AllBtn --> AllToolsModal[5. Revamped All Tools Hub<br>4 Color Groups + URL Bar]

    AllToolsModal --> AVModal
    AllToolsModal --> DrawModal[2. Canvas Whiteboard<br>Draw / Sketch]
    AllToolsModal --> PollModal[3. Interactive Poll Creator]
    AllToolsModal --> MapModal[4. Location Map Picker]
    AllToolsModal --> SearchModal[Search & Media Drawer]
    AllToolsModal --> AiArtModal[AI Art Generator Modal]

    AVModal --> AttachPreview[Composer Attachment Card<br>Image / Video / Audio Blob]
    DrawModal --> AttachPreview
    PollModal --> AttachPreview
    MapModal --> AttachPreview
```

---

## 3. Phase-by-Phase Implementation Blueprint

### Phase 1: Unified AV Studio Modal (`#avRecorderModal`)
**Target Tools**: `Camera (Photo)`, `Video recorder`, `Audio recorder`, `Screen recorder`.

#### 1.1 DOM Structure (`index.html`)
- Container: `#avRecorderModal` (`class="av-recorder-modal"`, `720px × 520px`, centered, top-mounted, `border-radius: 0 0 24px 24px`).
- Header:
  - Close button `#avRecorderCloseBtn` (32px squircle `✕`).
  - Centered segmented pill selector: `[ Photo ] [ Video ] [ Audio ] [ Screen ]`.
- Viewport:
  - Live viewfinder video element: `<video id="avVideoPreview" autoplay playsinline muted></video>`.
  - Audio waveform visualizer: `<canvas id="avAudioWaveform"></canvas>`.
  - Screen recording pre-flight configuration card (microphone selector dropdown with audio level meter + time limit pill selector + `Next` button).
- Bottom Action Dock:
  - Photo mode: 64px circular shutter button (`#avShutterBtn`), flip camera button, 3s/10s timer toggle.
  - Video mode: Red circular record button (`#avRecordVideoBtn`), pause button, recording timer display (`00:00`).
  - Audio mode: Central red microphone record button, timer display, max limit (15m).
  - Screen mode: Floating `Stop` button bar during screen capture.
- Review / Trimmer Viewport (`#avReviewView`):
  - Segmented top bar: `< Back`, `Playback` | `Trim` toggle, Pink `Save` button (`#avSaveBtn`).
  - Video/Audio player controls with playback scrubber, speed (`1x`), volume.
  - Draggable trim handles (`startTrimLineButton`, `endTrimLineButton`).

#### 1.2 JavaScript Implementation (`app.js`)
- **Camera/Photo Capture Flow**:
  - Request stream: `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 } }, audio: false })`.
  - Draw frame to hidden `<canvas>` on shutter click.
  - Transition to review state (`Save` vs `Retake`).
  - On `Save`: Convert canvas to JPEG Blob (`canvas.toBlob(...)`), generate Object URL / Supabase upload, and inject into `composerState.attachment`.
- **Video Recorder Flow**:
  - Request stream: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`.
  - Initialize `new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' })`.
  - Collect chunks into `Blob(['video/webm'])`.
  - Transition to video playback & trimmer review screen before saving.
- **Audio Recorder Flow**:
  - Request stream: `navigator.mediaDevices.getUserMedia({ audio: true })`.
  - Connect stream to Web Audio API `AudioContext` & `AnalyserNode` to draw live dynamic frequency bars on `#avAudioWaveform`.
  - Record via `MediaRecorder` into `audio/webm` / `audio/wav`.
  - Preview audio with waveform seekbar on review.
- **Screen Recorder Flow**:
  - Call `navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio: true })`.
  - Combine screen stream + selected microphone stream via `AudioContext.createMediaStreamDestination()`.
  - Record via `MediaRecorder`, listen for `stream.getVideoTracks()[0].onended` to auto-stop when user stops sharing.
  - Present video trimmer review screen before attaching.

---

### Phase 2: Drawing Whiteboard Canvas (`#drawModal`)
**Target Tool**: `Draw`.

#### 2.1 DOM & UI Specifications
- Modal size: `720px × 520px`, top-mounted, `border-radius: 24px`.
- Top Header:
  - Left: Pink text button `CLOSE`.
  - Center: `Undo` & `Redo` icons.
  - Center-right: Background switch segmented pill: **`WHITE` | `BLACK`**.
  - Right: Pink filled pill button `SAVE`.
- Canvas Body: `<canvas id="drawingCanvas">` with high-DPI scaling (`window.devicePixelRatio`).
- Bottom Palette Dock:
  - **10 preset color swatches**: Black (`#000000`), Red (`#ef4444`), Blue (`#3b82f6`), Yellow (`#eab308`), Green (`#22c55e`), Pink (`#ec4899`), Purple (`#a855f7`), Cyan (`#06b6d4`), Orange (`#f97316`), Brown (`#854d0e`).
  - Active color indicator ring (`box-shadow: 0 0 0 2px #fff, 0 0 0 4px #f59e0b`).
  - Pen tool, Eraser tool, Brush stroke thickness slider (2px, 6px, 12px, 24px).

#### 2.2 JavaScript Implementation
- Pointer event listeners (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) supporting mouse, touch, and stylus pen.
- Quadratic Bezier curves for stroke smoothing.
- Undo/Redo stack storing canvas image snapshots (`ImageData` / path strokes).
- On `SAVE`: Call `canvas.toBlob('image/png')` and attach as high-res drawing card to the post composer.

---

### Phase 3: Interactive Poll Creator (`#pollModal`)
**Target Tool**: `Poll`.

#### 3.1 DOM & UI Specifications
- Modal size: `540px × 420px`, centered, `border-radius: 24px`.
- Header: Squircle close `✕`, Title `"Poll"`, Pink `"Add"` button (disabled while question is blank).
- Form Body:
  - Question input: `"Ask a question..."` (`font-size: 16px; font-weight: 600; border: none; outline: none;`).
  - Option items list:
    - `Choice 1` (radio dot + input)
    - `Choice 2` (radio dot + input)
    - `Choice 3 (optional)`
    - `Choice 4 (optional)`
  - `+ Add option` button (allows up to 8 choices).

#### 3.2 Post Card Interactive Rendering
- Renders poll card inside post with clickable choice options.
- Clicking an option updates vote counts, computes percentage bars, and highlights the user's vote.

---

### Phase 4: Map Location Picker (`#locationModal`)
**Target Tool**: `Location`.

#### 4.1 DOM & UI Specifications
- Modal size: `720px × 520px`, top-mounted, `border-radius: 24px`.
- Top Header:
  - Close button `✕`.
  - Search input: `"Search for a place"` with GPS location icon button (`Search for my current location`).
  - Pink `Save` button.
- Bottom Toolbar:
  - Segmented layer toggle: **`Roadmap` | `Satellite` | `Terrain` | `Hybrid`**.
  - Checkbox toggle: `[x] Show pin`.
- Viewport: Interactive Leaflet map container (`#leafletMapContainer`) with center pin marker.

#### 4.2 JavaScript Implementation
- Embed lightweight Leaflet.js with OpenStreetMap (Roadmap) and Esri World Imagery (Satellite) tiles.
- Search input integration querying OpenStreetMap Nominatim API with 300ms debounce.
- GPS button calling `navigator.geolocation.getCurrentPosition(...)`.
- On `Save`: Captures coordinates, address text, and a static map thumbnail, attaching to composer as a rich location card.

---

### Phase 5: Search Modal, AI Art Generator & All Tools Hub Upgrades
**Target Tools**: `Link`, `AI image`, `Image search`, `GIF`, `YouTube`, `Spotify`, `Web search`, `Padlet`, `Arcade`.

#### 5.1 Revamped All Tools Hub (`#allToolsModal`)
- Replace current unstyled modal with Padlet's exact layout:
  - Top search input: `"Search web or paste URL"` with purple focus border and submit arrow `->`.
  - Pasting any valid URL (`http://` or `https://`) auto-activates the arrow button to attach link immediately without separate prompt.
  - **4 Categorized Colored Tile Groups**:
    - **Purple (`#F7EDFF`)**: Padles, Padles Arcade, Upload, Link.
    - **Blue (`#ECF6FF`)**: Camera, Video recorder, Audio recorder, Screen recorder, Draw.
    - **Green (`#EEFFED`)**: Poll, Google Drive, OneDrive, AI image, AI speech, Photo album.
    - **Orange (`#FFF5EF`)**: Image search, GIF, YouTube, Spotify, Web search, Location.

#### 5.2 AI Art Generator Modal (`#aiArtModal`)
- Header: Close `✕`, Input `"Write what you want to draw"`, Submit `->`.
- Inspiration preview card with sample image, italicized prompt, and `"Try this example"` button.
- Submit generates artwork and attaches directly to composer.

---

## 4. Testing & REA Verification Protocol

1. **Automated CDP Verification Script**:
   - Write `verify_tools_runtime.js` to test every tool:
     - Open composer -> Click Camera -> Ensure `video` stream initializes with active tracks.
     - Shutter click -> Verify canvas snapshot generated -> Save -> Verify image attachment attached to draft.
     - Open Video recorder -> Verify `MediaRecorder` state changes to `recording` -> Stop -> Save -> Verify video attachment.
     - Open Draw -> Simulate pointer strokes -> Save -> Verify drawing attachment.
     - Open Poll -> Enter question & 2 choices -> Add -> Verify poll attached and interactive.
     - Open Location -> Search "Paris" -> Verify map updates -> Save -> Verify location card attached.
2. **Visual Side-by-Side Comparison**:
   - Capture screenshots of each tool modal in Padles vs Padlet.
   - Strict 0-diff tolerance on dimensions, border radii, colors, and typography.

---

## 5. Execution Schedule

| Step | Scope | Expected Deliverable |
| :--- | :--- | :--- |
| **Step 1** | **Unified AV Studio Modal (`#avRecorderModal`)** | Functional Camera, Video, Audio, and Screen recorders with live viewfinder, shutter, timers, and playback/trimmer review. |
| **Step 2** | **Whiteboard Canvas Modal (`#drawModal`)** | Functional drawing board with smooth strokes, 10 color swatches, undo/redo, white/black toggle, and save. |
| **Step 3** | **Interactive Poll Creator (`#pollModal`)** | Functional poll modal with dynamic choices and interactive in-post voting cards. |
| **Step 4** | **Location Map Picker (`#locationModal`)** | Functional Leaflet map with Nominatim search, satellite/roadmap toggle, and pin drop. |
| **Step 5** | **All Tools Hub & AI Art Modal** | Authentic 4-group colored tile layout with unified URL search bar and AI art modal. |
| **Step 6** | **CDP Verification & Regression Test** | Automated test script verifying all 21 tools with screenshots. |
