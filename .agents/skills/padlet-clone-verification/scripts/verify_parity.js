/**
 * Parity Verifier
 * Compares computed styles between the local app and live Padlet for critical layout elements.
 */
import { findTarget, createCdpClient } from './cdp_helper.js';

async function getElementStyles(target, selector) {
  const client = createCdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  const styles = await client.evaluate(`
    (function() {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        width: Math.round(r.width),
        height: Math.round(r.height),
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight
      };
    })()
  `);
  client.close();
  return styles;
}

async function run() {
  console.log('[Parity Check] Fetching targets...');
  const localTarget = await findTarget(/localhost:8080/);
  const liveTarget = await findTarget(/padlet\.com/);

  if (!localTarget) {
    console.error('Local app (http://localhost:8080) not found.');
    process.exit(1);
  }
  if (!liveTarget) {
    console.warn('Live Padlet tab not found on port 9222. Skipping live comparison.');
    process.exit(0);
  }

  const comparisons = [
    { name: 'Board Title (H1)', selector: 'h1' },
    { name: 'Section Header Tab', localSelector: '.section-title-capsule', liveSelector: '.section-title-capsule, [class*="skew"]' },
    { name: 'Card Container (Article)', selector: 'article' },
  ];

  console.log('\n--- COMPUTED STYLE PARITY REPORT ---');
  for (const item of comparisons) {
    const locSel = item.localSelector || item.selector;
    const livSel = item.liveSelector || item.selector;

    const [locStyles, livStyles] = await Promise.all([
      getElementStyles(localTarget, locSel),
      getElementStyles(liveTarget, livSel)
    ]);

    console.log(`\nComponent: ${item.name}`);
    console.log(`  Local (${locSel}):`, locStyles || 'NOT FOUND');
    console.log(`  Live  (${livSel}):`, livStyles || 'NOT FOUND');
  }

  console.log('\n[Parity Check] Complete.');
}

run().catch(err => {
  console.error('[Parity Check] Error:', err);
  process.exit(1);
});
