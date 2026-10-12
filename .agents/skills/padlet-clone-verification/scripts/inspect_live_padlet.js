/**
 * Inspect Live Padlet DOM & Computed Styles
 * Usage:
 *   node inspect_live_padlet.js <css-selector>
 * Example:
 *   node inspect_live_padlet.js "[data-testid='surfacePostMoreActionsButton']"
 */
import { findTarget, createCdpClient } from './cdp_helper.js';

async function run() {
  const selector = process.argv[2] || '.surface-post-card';
  console.log(`[REA Inspect] Connecting to live Padlet tab to inspect: "${selector}"...`);

  const target = await findTarget(/padlet\.com/);
  if (!target) {
    console.error('Live Padlet tab not found on port 9222. Ensure Edge is running with Padlet loaded.');
    process.exit(1);
  }

  const client = createCdpClient(target.webSocketDebuggerUrl);
  await client.connect();

  const code = `
    (function() {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return { error: 'Element not found for selector: ' + ${JSON.stringify(selector)} };
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName,
        className: el.className,
        rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
        styles: {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          borderRadius: cs.borderRadius,
          boxShadow: cs.boxShadow,
          padding: cs.padding,
          margin: cs.margin,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          border: cs.border,
          backdropFilter: cs.backdropFilter,
          display: cs.display,
          gap: cs.gap,
          zIndex: cs.zIndex
        },
        innerHTML: el.innerHTML.slice(0, 300)
      };
    })()
  `;

  const result = await client.evaluate(code);
  console.log('\n--- COMPUTED STYLE DATA ---');
  console.log(JSON.stringify(result, null, 2));

  client.close();
}

run().catch(err => {
  console.error('[REA Inspect] Error:', err);
  process.exit(1);
});
