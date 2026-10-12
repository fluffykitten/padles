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
* `reverse-engineer-anything`: State `installed`

---

### 4. Restart Antigravity IDE
* Completely close and restart Antigravity IDE so the Language Server binds the new MCP tools (`inspect_web_page`, `observe_web_session`, `trace_web_source_location`, etc.).

---

## 🌐 Part 2: Microsoft Edge Remote Debugging Setup (Port 9222)

To allow Antigravity and REA scripts to inspect live Padlet DOM, CSS tokens, SVGs, and network events, Microsoft Edge must be started with the Chrome DevTools Protocol (CDP) port open.

> [!IMPORTANT]
> **Why `--user-data-dir` is required**:
> If Edge is already running with your default profile, passing `--remote-debugging-port=9222` will be silently ignored by Chromium. Providing a dedicated `--user-data-dir` forces Edge to spawn a standalone debug instance that binds to port `9222`.

---

### Option A: Launch via PowerShell / Terminal (Fastest)

Run this command in PowerShell:

```powershell
Start-Process "msedge.exe" -ArgumentList "--remote-debugging-port=9222 --user-data-dir=$env:LOCALAPPDATA\EdgeDebugProfile https://padlet.com"
```

Or in Windows Command Prompt (cmd):

```cmd
start msedge.exe --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile" https://padlet.com
```

---

### Option B: Create a Dedicated Desktop Shortcut (One-Click)

1. Right-click on your Windows Desktop → **New** → **Shortcut**.
2. Paste the following target (adjust path if Edge is installed in `Program Files` instead of `Program Files (x86)`):
   ```text
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile" https://padlet.com
   ```
3. Click **Next**, name the shortcut `Edge Debugger (Padlet)`, and click **Finish**.
4. Double-click this shortcut anytime you want to start Edge for REA and Antigravity automation.

---

### 3. Verify Remote Debugging is Active

Open any browser or terminal and test the CDP endpoint:

* **In browser**: Navigate to `http://127.0.0.1:9222/json`
  * You should see a JSON list of open tabs and their `webSocketDebuggerUrl`.
* **In PowerShell**:
  ```powershell
  Invoke-RestMethod http://127.0.0.1:9222/json/version
  ```
  * Returns:
    ```json
    {
      "Browser": "Edg/...",
      "Protocol-Version": "1.3",
      "User-Agent": "Mozilla/5.0 ...",
      "V8-Version": "...",
      "WebKit-Version": "...",
      "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/browser/..."
    }
    ```

---

## 🎯 Part 3: Live Reverse-Engineering Workflow

Once Edge is running on port 9222 and REA is active:

1. **Tab 1 (Reference)**: Open the real Padlet board in your Edge debug window:
   `https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6/wish/PVKBQOrEoXD5aj5x`
2. **Tab 2 (Local Clone)**: Open your local clone:
   `file:///C:/padles/index.html`
3. **Automate & Compare**:
   Antigravity can now query both tabs via CDP WebSocket:
   * Dump exact computed CSS styles, font families, and color tokens.
   * Extract raw SVGs directly from Padlet's icon buttons.
   * Run side-by-side automated test scripts (like `scratch/test_post_workflow.mjs`).
   * Trigger interactive modal states and take matching screenshots.

---

## 🚀 Quick Launch Helper Script Included

This repository includes a one-click launcher script in the root directory:

* Run [`start-edge-debug.bat`](file:///c:/padles/start-edge-debug.bat) to launch Edge with port 9222 and the EdgeDebugProfile automatically.
