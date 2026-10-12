# REA & Microsoft Edge DevTools Setup Guide (New PC Migration)

This step-by-step guide explains how to install and configure **REA (Reverse Engineer Anything)** MCP and set up **Microsoft Edge Remote Debugging** on a new computer so you and Antigravity can inspect, reverse-engineer, and test Padlet live.

---

## 🛠️ Part 1: Install REA (Reverse Engineer Anything)

REA provides Antigravity with deep reverse-engineering capabilities across browser runtimes, JavaScript bundles, DOM architectures, and binary artifacts.

### 1. Prerequisites
* **Node.js**: Version 18+ (Node 20 or Node 24 recommended).
  * Check version: `node -v`
  * Download if needed: [nodejs.org](https://nodejs.org/) or run `winget install OpenJS.NodeJS.LTS`
* **Git**: Installed and available in PATH (`git -v`).
* **Antigravity IDE**: Installed on the machine.

---

### 2. Run REA Automated Setup Command
Open PowerShell or Command Prompt (as normal user) and run:

```powershell
npx -y rea-agents@latest setup --client antigravity -y
```

#### What this command does automatically:
1. Registers the `rea` MCP server into Antigravity's MCP configuration file (`~/.gemini/config/mcp_config.json` on Windows).
2. Creates an automatic backup: `mcp_config.json.rea.backup`.
3. Installs the `reverse-engineer-anything` skill and workflow instructions under `~/.gemini/config/skills/reverse-engineer-anything/`.

---

### 3. Verify REA Installation
Run the REA health doctor audit:

```powershell
npx -y rea-agents@latest doctor --client antigravity
```

**Expected output**:
* `antigravity`: State `aligned` / `configured`
* `reverse-engineer-anything`: State `aligned` (installed with 170+ analysis tools)

---

### 4. Restart Antigravity IDE
* Completely close and restart Antigravity IDE so the Language Server binds the new MCP tools (`inspect_web_page`, `observe_web_session`, `trace_web_source_location`, etc.).

---

## 🌐 Part 2: Microsoft Edge Remote Debugging Setup (Port 9222)

To allow Antigravity and REA scripts to inspect live Padlet DOM, CSS tokens, SVGs, and network events, Microsoft Edge must be started with the Chrome DevTools Protocol (CDP) port open.

> [!IMPORTANT]
> **Why `--user-data-dir` is required**:
> If Edge is already running with your default profile or Windows Startup Boost, passing `--remote-debugging-port=9222` alone will be silently ignored by Chromium. Providing a dedicated `--user-data-dir` forces Edge to spawn an isolated debug instance that binds to port `9222`.

---

### Option A: Launch via Helper Batch Script (Recommended & Fastest)

Use the pre-configured launcher in the repository root:

* Run [`start-edge-debug.bat`](file:///e:/VibeCoding/padles/start-edge-debug.bat)

This script automatically:
1. Locates `msedge.exe` (in `Program Files (x86)` or `Program Files`).
2. Creates `%LOCALAPPDATA%\EdgeDebugProfile` if it doesn't already exist.
3. Launches Edge with `--remote-debugging-port=9222`, `--no-first-run`, opening both the Padlet reference board and local Padles clone.
4. Verifies CDP port 9222 availability and prints status in console.

---

### Option B: Launch via PowerShell

Run this command in PowerShell:

```powershell
# Ensure profile folder exists
New-Item -ItemType Directory -Force -Path "$env:LOCALAPPDATA\EdgeDebugProfile"

# Launch Edge with remote debugging
Start-Process "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList @(
  "--remote-debugging-port=9222",
  "--user-data-dir=$env:LOCALAPPDATA\EdgeDebugProfile",
  "--no-first-run",
  "https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6/wish/PVKBQOrEoXD5aj5x",
  "file:///E:/VibeCoding/padles/index.html"
)
```

---

### Option C: Create a Dedicated Desktop Shortcut (One-Click)

1. Right-click on your Windows Desktop → **New** → **Shortcut**.
2. Paste the following target:
   ```text
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile" --no-first-run https://padlet.com
   ```
3. Click **Next**, name the shortcut `Edge Debugger (Padlet)`, and click **Finish**.
4. Double-click this shortcut anytime you want to start Edge for REA and Antigravity automation.

---

### 3. Verify Remote Debugging is Active

Open any browser or terminal and test the CDP endpoint:

* **In browser**: Navigate to `http://127.0.0.1:9222/json`
  * You will see a JSON array of open tabs with their `title`, `url`, and `webSocketDebuggerUrl`.
* **In PowerShell**:
  ```powershell
  Invoke-RestMethod http://127.0.0.1:9222/json/version
  ```
  * Output:
    ```json
    {
      "Browser": "Edg/154.0.4258.37",
      "Protocol-Version": "1.3",
      "User-Agent": "Mozilla/5.0 ...",
      "V8-Version": "15.4.11.5",
      "WebKit-Version": "537.36 ...",
      "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/browser/..."
    }
    ```

---

## 🎯 Part 3: Live Reverse-Engineering Workflow

Once Edge is running on port 9222 and REA is active:

1. **Tab 1 (Reference)**: Real Padlet board:
   `https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6/wish/PVKBQOrEoXD5aj5x`
2. **Tab 2 (Local Clone)**: Local Padles clone:
   `file:///e:/VibeCoding/padles/index.html`

### Useful Programmatic CDP Commands

#### Open a New Tab Programmatically:
```powershell
Invoke-RestMethod -Method Put "http://127.0.0.1:9222/json/new?file:///E:/VibeCoding/padles/index.html"
```

#### List All Open Page Tabs via Node.js:
```javascript
const tabs = await (await fetch('http://127.0.0.1:9222/json')).json();
const pages = tabs.filter(t => t.type === 'page');
console.log(pages.map(p => ({ title: p.title, url: p.url })));
```

#### Evaluate JavaScript in Live Page via WebSocket:
```javascript
const tabs = await (await fetch('http://127.0.0.1:9222/json')).json();
const targetTab = tabs.find(t => t.url.includes('padles/index.html'));
const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: { expression: 'document.title' }
  }));
};

ws.onmessage = (e) => {
  const res = JSON.parse(e.data);
  console.log('Result:', res.result?.result?.value);
  ws.close();
};
```

---

## 🔍 Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Port 9222 refuses connection | Edge running with default profile or Startup Boost | Ensure `--user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile"` is passed, or launch via [`start-edge-debug.bat`](file:///e:/VibeCoding/padles/start-edge-debug.bat). |
| REA tools not appearing in IDE | IDE hasn't reloaded MCP configuration | Fully restart Antigravity IDE after running `npx -y rea-agents@latest setup`. |
| MCP Config missing | Config file blank or corrupted | Run `npx -y rea-agents@latest setup --client antigravity -y` to regenerate. |

---

## ✅ Verified Setup Status on This Machine

* **Node.js**: `v24.12.0` (Verified)
* **Git**: `2.52.0` (Verified)
* **REA MCP Configuration**: Configured in `C:\Users\orin\.gemini\config\mcp_config.json` (Verified)
* **REA Skill**: Installed at `C:\Users\orin\.gemini\config\skills\reverse-engineer-anything` (Verified, 170 tools aligned)
* **Edge CDP Port 9222**: Active on `127.0.0.1:9222` (Verified)
* **Live Session Tabs**:
  * Tab 1: Padlet Reference Board (`padlet.com`) (Active & Connected)
  * Tab 2: Local Padles Board (`file:///E:/VibeCoding/padles/index.html`) (Active & Connected)
