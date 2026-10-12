/**
 * CDP Helper for Node.js (v22+)
 * Uses built-in fetch and WebSocket. Zero external dependencies required.
 */
import fs from 'node:fs';
import path from 'node:path';

export const CDP_HTTP_URL = 'http://127.0.0.1:9222';

/**
 * Fetch all active browser targets from CDP
 */
export async function getTargets() {
  try {
    const res = await fetch(`${CDP_HTTP_URL}/json`);
    if (!res.ok) {
      throw new Error(`CDP HTTP error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(
      `Cannot connect to Microsoft Edge on ${CDP_HTTP_URL}.\n` +
      `Ensure Edge was launched with remote debugging enabled:\n` +
      `Run "start-edge-debug.bat" or launch Edge with --remote-debugging-port=9222`
    );
  }
}

/**
 * Find target matching url or title regex
 */
export async function findTarget(matcher) {
  const targets = await getTargets();
  const pageTargets = targets.filter(t => t.type === 'page');
  const target = pageTargets.find(t => {
    if (typeof matcher === 'string') {
      return t.url.includes(matcher) || t.title.includes(matcher);
    }
    return matcher.test(t.url) || matcher.test(t.title);
  });
  return target || null;
}

/**
 * Create a simple CDP client wrapper over WebSocket
 */
export function createCdpClient(wsUrl) {
  let ws = null;
  let id = 1;
  const pending = new Map();

  return {
    async connect() {
      return new Promise((resolve, reject) => {
        ws = new WebSocket(wsUrl);
        ws.onopen = () => resolve();
        ws.onerror = (err) => reject(err);
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id && pending.has(data.id)) {
              const { resolve: res, reject: rej } = pending.get(data.id);
              pending.delete(data.id);
              if (data.error) {
                rej(new Error(JSON.stringify(data.error)));
              } else {
                res(data.result);
              }
            }
          } catch (e) {
            console.error('CDP message parse error:', e);
          }
        };
      });
    },

    async send(method, params = {}) {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        throw new Error('CDP WebSocket is not connected');
      }
      const msgId = id++;
      const payload = { id: msgId, method, params };
      return new Promise((resolve, reject) => {
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify(payload));
      });
    },

    async evaluate(expression) {
      const result = await this.send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return result?.result?.value;
    },

    async bringToFront() {
      await this.send('Page.bringToFront');
      // small delay for rendering to sync
      await new Promise(r => setTimeout(r, 200));
    },

    async captureScreenshot(outputPath, options = {}) {
      await this.bringToFront();
      const res = await this.send('Page.captureScreenshot', {
        format: options.format || 'png',
        quality: options.quality,
        clip: options.clip,
      });
      const buffer = Buffer.from(res.data, 'base64');
      if (outputPath) {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(outputPath, buffer);
      }
      return buffer;
    },

    async reload(ignoreCache = true) {
      await this.send('Page.reload', { ignoreCache });
      // Wait for page load
      await new Promise(r => setTimeout(r, 1500));
    },

    close() {
      if (ws) {
        try { ws.close(); } catch (_) {}
      }
    }
  };
}
