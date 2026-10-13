# Padles Tools Revamp Implementation Plan: 100% Reverse-Engineered Parity with Supabase & Cloudflare R2

> [!IMPORTANT]
> **Production Parity Mandate & Backend Separation**
> * **Supabase**: Strictly for **PostgreSQL Database** (tables, JSONB metadata, real-time WAL subscriptions) and **Auth & Login System** (email auth, magic links, sessions, guest auth). **NO Supabase Storage is used.**
> * **Cloudflare R2**: **100% dedicated object storage** for all media binaries (photos, video recordings, audio reflections, screen recordings, drawing exports, file attachments) with zero-egress bandwidth costs delivered via Cloudflare CDN.
> * **IndexedDB (`PadlesMediaDB`)**: Local browser binary cache and offline staging queue (zero-dependency).

---

## 1. Ground Truth Audit & Problem Statement

### 1.1 Current Limitations in Padles
1. **Camera, Video, Audio, and Screen**: Dummy stubs inject static Unsplash stock images and toast notifications without requesting browser permissions (`getUserMedia`, `getDisplayMedia`) or displaying viewfinders.
2. **Draw**: Injects a static placeholder card titled `"Freehand Sketch Drawing"` without an interactive drawing canvas.
3. **Poll**: Injects a hardcoded card without an interactive question/choice creation modal or live voting.
4. **Location**: Injects a static string (`"MIT Physics Lab"`) without a map interface or geocoding search.
5. **Link & AI Art**: Trigger browser-native `window.prompt()` popups instead of in-app modals.
6. **All Tools Modal**: Does not match Padlet's 4 signature color-coded tile categories, geometry, or unified search/URL bar.
7. **Storage & Reload Blind Spot**: Storing `blob:` URLs causes broken attachments on page refresh; storing base64 strings in `localStorage` crashes with `QuotaExceededError` (5MB limit).
8. **Incomplete Rendering Pipeline**: `app.js` (`renderCards()` and `cardDetailModal`) only knows how to render static images and YouTube badges; interactive polls, audio waveforms, video players, and maps do not render.

### 1.2 Reverse-Engineered Ground Truth (Live Padlet Runtime)
Direct REA/CDP extraction from live Padlet (`padlet.com/ezzarscarlet/...`) identified 5 unified dialog subsystems:
* **Unified AV Studio (`#avRecorderModal`)**: Centered top modal (`720px × 520px`, `rounded-b-3xl`) managing **Photo (Camera)**, **Video**, **Audio**, and **Screen**. Includes live viewfinders, shutter/record actions, timer displays, and a playback/trimmer review screen (`Playback` | `Trim`).
* **Whiteboard Canvas (`#drawModal`)**: Top modal with `WHITE` | `BLACK` background toggle, 10 preset color swatches, brush/eraser tools, stroke thickness slider, undo/redo, and PNG export.
* **Interactive Poll Creator (`#pollModal`)**: `540px × 420px` centered modal with question input, dynamic radio options (`Choice 1`–`8`, `+ Add option`), and interactive post vote cards with live percentage bars.
* **Map Location Picker (`#locationModal`)**: `720px × 520px` modal with OpenStreetMap geocoding search, GPS button, style toggle (`Roadmap` | `Satellite` | `Terrain`), and pin placement.
* **All Tools Hub (`#allToolsModal`)**: Top input `"Search web or paste URL"` with 21 tools organized into **4 signature colored tile groups** (`#F7EDFF`, `#ECF6FF`, `#EEFFED`, `#FFF5EF`).

---

## 2. Cloud Architecture: Clean Division of Responsibilities

```mermaid
graph TD
    Client[Padles Client (app.js)] --> MediaTool[AV Studio / Draw / Upload]
    MediaTool --> BlobData[Binary Blob (JPEG / WebM / PNG)]

    subgraph DedicatedStorage [Media Storage: 100% Cloudflare R2]
        BlobData --> PresignedCheck{Cloud Connected?}
        PresignedCheck -->|Yes| PresignReq[Request Presigned S3 PUT URL]
        PresignReq --> R2Worker[Cloudflare Worker / Edge Presigner]
        R2Worker -->|S3 Presigned PUT URL| Client
        Client -->|Direct Binary PUT| R2[(Cloudflare R2 Bucket)]
        R2 --> CDN[Cloudflare Edge CDN]
        CDN -->|Public Media URL| AttachmentMeta[Attachment Metadata JSON]
    end

    subgraph OfflineStaging [Offline & Local Cache]
        PresignedCheck -->|Offline / No Cloud| IDB[(IndexedDB: PadlesMediaDB)]
        IDB -->|attachmentId| AttachmentMeta
        IDB -.->|Background Sync on Reconnect| R2
    end

    subgraph SupabasePlatform [Database, Realtime & Auth: Supabase]
        AttachmentMeta --> SupaPost[Supabase Database: posts.attachment JSONB]
        SupaPost --> WAL[Postgres WAL Changes]
        WAL --> Realtime[Supabase Realtime Channel]
        Realtime --> OtherUsers[All Collaborators on Board]

        AuthSys[Supabase Auth: Email & Login System] --> UserSession[Contributor Session & Identity]
        UserSession --> SupaPost
    end
```

### 2.1 Dedicated Roles Breakdown
| Component | Provider | Scope of Responsibility |
|---|---|---|
| **Object Storage** | **Cloudflare R2** | **100% of all media storage.** Photos, videos, voice memos, screen captures, drawings, file uploads. $0 egress fees. |
| **CDN Delivery** | **Cloudflare CDN** | Global edge caching and ultra-fast media streaming for board viewers. |
| **Database** | **Supabase (PostgreSQL)** | Boards, sections, posts, comments, reactions, custom fields, poll vote counts, and attachment JSONB metadata. |
| **Auth & Logins** | **Supabase Auth** | User authentication, email login, magic links, session management, and anonymous guest users. |
| **Realtime Sync** | **Supabase Realtime** | Live WebSocket sync of board updates, card reordering, live poll percentages, and collaborator presence. |
| **Offline Cache** | **Browser IndexedDB** | Local binary storage for offline recording and temporary draft attachments before R2 upload. |

### 2.2 Cloudflare R2 Upload Flow
1. **Presigned URL Request**:
   - Client calls upload endpoint with file metadata: `{ fileName, contentType, fileSize, boardId }`.
   - Endpoint returns a presigned S3 `PutObjectCommand` URL (5-minute expiry) targeting the R2 bucket.
2. **Direct Binary Upload**:
   - Client uploads directly to R2 via `fetch(presignedUrl, { method: 'PUT', body: fileBlob, headers: { 'Content-Type': contentType } })`.
   - Bypasses any application servers, eliminating bandwidth bottlenecks.
3. **Public Delivery URL**:
   - The permanent URL (`https://<custom-r2-domain>/attachments/<boardId>/<attachmentId>.<ext>`) is attached to `card.attachment.url`.
4. **Metadata Persistence in Supabase**:
   - The post record is inserted/updated in Supabase `posts` with the R2 URL and metadata stored in the `attachment` JSONB column.
   - Supabase Realtime broadcasts the new post with its R2 media URL to all other collaborators instantly.

### 2.3 IndexedDB Offline Fallback (`PadlesMediaDB`)
* When offline or working in local mode:
  - Binary blobs are saved to IndexedDB object store `media_attachments` keyed by `storageId`.
  - On app load, `PadlesMediaDB.resolveUrl(storageId)` generates fresh working session URLs.
  - `localStorage` only stores the lightweight metadata `{ type: 'audio', storageId: 'att_123', title: '...' }`, never exceeding the 5MB quota.
  - Once the board connects to the cloud, queued IndexedDB attachments are automatically uploaded to Cloudflare R2, and their local URLs are updated to permanent R2 CDN URLs.

---

## 3. Strict Attachment JSON Data Contracts

Every attachment stored in `composerState.attachment`, `card.attachment`, and Supabase `posts.attachment` MUST conform to these schemas:

### 3.1 Photo & Image (`type: 'image'`)
```json
{
  "type": "image",
  "category": "photo" | "ai" | "upload",
  "url": "https://r2.padles.com/attachments/board-1/photo_abc.jpg",
  "thumbnailUrl": "https://r2.padles.com/attachments/board-1/photo_abc.jpg",
  "storageId": "att_photo_123",
  "title": "Camera Snapshot",
  "caption": "",
  "width": 1280,
  "height": 720
}
```

### 3.2 Video & Screen Recording (`type: 'video'`)
```json
{
  "type": "video",
  "category": "camera" | "screen" | "upload",
  "url": "https://r2.padles.com/attachments/board-1/video_xyz.webm",
  "thumbnailUrl": "https://r2.padles.com/attachments/board-1/thumb_xyz.jpg",
  "storageId": "att_video_456",
  "title": "Physics Lab Experiment (0:45)",
  "duration": 45,
  "mimeType": "video/webm"
}
```

### 3.3 Audio Reflection Memo (`type: 'audio'`)
```json
{
  "type": "audio",
  "category": "voice" | "upload",
  "url": "https://r2.padles.com/attachments/board-1/audio_ref.webm",
  "storageId": "att_audio_789",
  "title": "I See, I Think, I Wonder Reflection",
  "duration": 82,
  "waveform": [12, 45, 88, 62, 30, 95, 74, 40, 20, 65, 80, 50],
  "mimeType": "audio/webm"
}
```

### 3.4 Freehand Drawing Canvas (`type: 'drawing'`)
```json
{
  "type": "drawing",
  "category": "canvas",
  "url": "https://r2.padles.com/attachments/board-1/drawing_sketch.png",
  "thumbnailUrl": "https://r2.padles.com/attachments/board-1/drawing_sketch.png",
  "storageId": "att_draw_321",
  "title": "Kinetic Diagram Sketch",
  "width": 1440,
  "height": 1040,
  "background": "white"
}
```

### 3.5 Interactive Poll (`type: 'poll'`)
```json
{
  "type": "poll",
  "question": "Which balloon car travel distance was greatest?",
  "options": [
    { "id": "opt-1", "text": "Car A (Smooth floor)", "votes": 12 },
    { "id": "opt-2", "text": "Car B (Carpet)", "votes": 4 },
    { "id": "opt-3", "text": "Car C (Ramp incline)", "votes": 19 }
  ],
  "totalVotes": 35,
  "voters": {
    "user_abc123": "opt-3"
  }
}
```

### 3.6 Location Map Card (`type: 'location'`)
```json
{
  "type": "location",
  "placeName": "MIT Department of Physics",
  "address": "77 Massachusetts Ave, Cambridge, MA 02139",
  "lat": 42.3598,
  "lng": -71.0921,
  "mapType": "roadmap" | "satellite" | "terrain",
  "showPin": true,
  "thumbnailUrl": "https://staticmap.openstreetmap.de/staticmap.php?center=42.3598,-71.0921&zoom=15&size=600x300&markers=42.3598,-71.0921,red-pushpin"
}
```

---

## 4. End-to-End Rendering Pipeline Specifications

Attachment support requires updates across **3 UI surfaces**:

### 4.1 Surface A: Post Composer Preview (`#activeAttachmentPreview`)
* **Image / Drawing**: Fixed height (`160px`), rounded thumbnail, `✕` remove button on top-right, title badge on bottom.
* **Video**: Viewport thumbnail with centered white play icon + duration pill (`00:45`).
* **Audio**: Waveform pill bar with inline mini-player and duration display (`01:22`).
* **Poll**: Compact option pills with question text and choice badges.
* **Location**: Map snapshot with marker pin and geocoded location chip.

### 4.2 Surface B: Board Card View (`renderCards()` in `app.js`)
* **Audio Player Widget**: Custom styled audio container with play/pause circular button, elapsed time, and dynamic CSS bar visualizer.
* **Video Card**: Full-width video container with custom play overlay. Clicking plays inline or opens theater view.
* **Interactive Poll Card**:
  - Options render as clickable choice capsules.
  - Clicking an option submits vote immediately, updates Supabase in real-time, displays animated percentage fill bars, and locks user's choice with a checkmark.
* **Location Card**: Interactive OpenStreetMap snippet or high-resolution map snapshot with destination pin and address caption.

### 4.3 Surface C: Expanded Theater View (`#cardDetailModal`)
* **Media Canvas (`#detailMediaCanvas`)**:
  - Audio: Large central audio player with interactive seekbar and full-fidelity dynamic waveform visualization.
  - Video: Native HTML5 `<video controls playsinline>` with playback rate selector streaming directly from Cloudflare R2 CDN.
  - Drawing / Photo: Full-res lightbox canvas with zoom/pan.
  - Poll: Full-width live voting view with live avatar heads of voters (via Supabase Realtime).
  - Location: Interactive full-screen map with zoom controls and directions link.

---

## 5. Media Hardware Lifecycle & Resource Protection

```javascript
// Hardware Cleanup Protocol
stopActiveMediaStreams() {
  if (this.activeMediaStream) {
    this.activeMediaStream.getTracks().forEach(track => {
      track.stop();
      console.log(`[AVStudio] Stopped track: ${track.kind}`);
    });
    this.activeMediaStream = null;
  }
}

cleanupAudioContext() {
  if (this.audioContext && this.audioContext.state !== 'closed') {
    this.audioContext.close();
    this.audioContext = null;
  }
}
```

### Critical Rules:
1. **Always Stop Tracks on Modal Close**: When user clicks `✕`, presses `Escape`, or switches tabs inside `#avRecorderModal`, immediately call `stopActiveMediaStreams()`.
2. **AudioContext Recycling**: Never instantiate `new AudioContext()` without calling `.close()` on the previous instance. Limit active instances to 1.
3. **Graceful Permission Failures**: If `getUserMedia` rejects with `NotAllowedError` or `NotFoundError`:
   - Display an in-modal friendly banner: *"Camera or Microphone blocked. Please enable access in browser settings."*
   - Never freeze the modal or throw unhandled exceptions.

---

## 6. Implementation Phasing & Step-by-Step Deliverables

Phasing is ordered by **infrastructure & entry points first**, followed by tool subsystems:

```mermaid
timeline
    title Padles Tools Implementation Phasing
    Phase 1 : Storage Core & All Tools Hub : IndexedDB MediaStore + Cloudflare R2 upload pipeline + 4-color All Tools Hub
    Phase 2 : Unified AV Studio Modal : Photo, Video, Audio, Screen via WebRTC & Web Audio with direct R2 uploads
    Phase 3 : Whiteboard Drawing Canvas : High-DPI canvas, 10 palettes, undo/redo, PNG R2 export
    Phase 4 : Interactive Poll Creator : Poll modal + live in-card voting with Supabase Realtime sync
    Phase 5 : Location Map Picker : Interactive geocoding search, map layers, pin drop
    Phase 6 : Card & Theater Rendering : Update renderCards() and cardDetailModal for all 6 media types
    Phase 7 : Automated CDP Verification : End-to-end parity script testing all 21 tools with screenshots
```

### Phase 1: Storage Core & Revamped All Tools Hub
* **1.1 IndexedDB Media Store (`PadlesMediaDB`)**: Local Blob persistence module.
* **1.2 Cloudflare R2 Storage Adapter (`r2-service.js` / `supabase-service.js`)**: Direct presigned S3 PUT upload pipeline for files and Blobs to Cloudflare R2.
* **1.3 Revamped All Tools Modal (`#allToolsModal`)**:
  - Authentic Padlet dimensions and layout.
  - Top search input `"Search web or paste URL"` with instant URL preview parser.
  - 4 color-coded tile groups:
    - **Purple (`#F7EDFF`)**: Padles, Padles Arcade, Upload, Link.
    - **Blue (`#ECF6FF`)**: Camera, Video recorder, Audio recorder, Screen recorder, Draw.
    - **Green (`#EEFFED`)**: Poll, Google Drive, OneDrive, AI image, AI speech, Photo album.
    - **Orange (`#FFF5EF`)**: Image search, GIF, YouTube, Spotify, Web search, Location.

### Phase 2: Unified AV Studio Modal (`#avRecorderModal`)
* **2.1 Photo (Camera)**: Viewfinder, shutter, 3s/10s timer, canvas capture, review screen, Cloudflare R2 upload.
* **2.2 Video Recorder**: Live stream, 1080p recording, pause/resume, playback & trimmer review screen, direct R2 upload.
* **2.3 Audio Recorder**: Live frequency waveform via Web Audio `AnalyserNode`, timer, seekbar review, direct R2 upload.
* **2.4 Screen Recorder**: `getDisplayMedia`, microphone mix option, auto-stop on screen share termination, direct R2 upload.

### Phase 3: Whiteboard Canvas (`#drawModal`)
* High-DPI `<canvas id="drawingCanvas">` with pointer event smoothing (Bezier curves).
* 10 preset color swatches, White/Black canvas toggle, undo/redo stack, export to PNG Blob and upload to Cloudflare R2.

### Phase 4: Interactive Poll Creator (`#pollModal`) & Multiplayer Voting
* Creation modal with 2–8 dynamic options.
* Real-time post card voting with animated percentage bars.
* Supabase Realtime listener updating poll counts live across all open sessions via PostgreSQL.

### Phase 5: Location Map Picker (`#locationModal`)
* Search geocoding via OpenStreetMap Nominatim with 300ms debounce.
* GPS current location button (`navigator.geolocation`).
* Layer switcher (Roadmap / Satellite / Terrain).
* Zero CDN dependency: Uses local lightweight Leaflet vendor bundle in `vendor/leaflet/`.

### Phase 6: Post Card & Theater View Rendering Upgrades
* Update `renderCards()` in `app.js` to render authentic audio players, video players, interactive polls, maps, and drawings.
* Update `openCardDetailModal()` to render full-fidelity media canvases for all 6 attachment types.

### Phase 7: Automated Verification & 0-Regression Testing
* Execute CDP automation script (`verify_tools_runtime.js`) testing the end-to-end creation, storage, and rendering of all tools.
* Visual screenshot comparison against live Padlet.

---

## 7. Implementation Status & CDP Visual Proofs

All 7 phases have been executed, verified via Chrome DevTools Protocol (CDP) on the live Edge debugger, and committed.

| Subsystem | Phase | Status | Verification & Proof Artifact |
|---|---|---|---|
| **IndexedDB & R2 Pipeline** | Phase 1 | ✅ Verified | `media-db.js`, `r2-service.js` with direct S3 PUT & fallback to local IDB |
| **All Tools Hub** | Phase 1 | ✅ Verified | [`proof_all_tools_hub.png`](screenshots/proof_all_tools_hub.png) (4 color-coded tile categories) |
| **AV Studio (Photo/Video/Audio/Screen)** | Phase 2 | ✅ Verified | [`proof_av_studio_photo.png`](screenshots/proof_av_studio_photo.png) (viewfinder, pill tabs, audio visualizer) |
| **Drawing Whiteboard** | Phase 3 | ✅ Verified | [`proof_draw_modal.png`](screenshots/proof_draw_modal.png), [`proof_draw_modal_stroked.png`](screenshots/proof_draw_modal_stroked.png) |
| **Interactive Poll Creator** | Phase 4 | ✅ Verified | [`proof_poll_modal.png`](screenshots/proof_poll_modal.png) (dynamic option rows, single/multi toggle) |
| **Location Map Picker** | Phase 5 | ✅ Verified | [`proof_location_modal.png`](screenshots/proof_location_modal.png) (geocoding search, interactive map preview) |
| **Shelf & Card Rendering** | Phase 6 | ✅ Verified | [`proof_board_with_poll_and_audio.png`](screenshots/proof_board_with_poll_and_audio.png) (live poll & audio card) |
| **Expanded Theater View** | Phase 6 | ✅ Verified | [`proof_theater_poll.png`](screenshots/proof_theater_poll.png) (full voting canvas & thread in theater modal) |

