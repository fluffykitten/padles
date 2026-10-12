/**
 * Automated Visual Proof Capture Tool
 * Captures clean, uncompromised screenshots of all 4 core clone surfaces:
 * 1. Full Board (verify_board.png)
 * 2. Docked Composer (verify_docked_composer.png)
 * 3. Card 3-dots Context Menu (verify_card_menu.png)
 * 4. Centered Edit Post Modal (verify_edit_modal.png)
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findTarget, createCdpClient } from './cdp_helper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../../docs/screenshots');

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('[Visual Proof] Searching for local app tab (localhost:8080)...');
  const target = await findTarget(/localhost:8080/);
  if (!target) {
    console.error('Local app tab (http://localhost:8080) not found in Edge debug session.');
    process.exit(1);
  }

  const client = createCdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  console.log('[Visual Proof] Connected to CDP. Bringing tab to front...');
  await client.bringToFront();

  // 1. Capture Full Board
  console.log('[1/4] Capturing Board View...');
  await client.evaluate(`
    if (window.app) {
      if (window.app.cancelEditPost) window.app.cancelEditPost();
      if (window.app.composerCardWrapper) window.app.composerCardWrapper.hidden = true;
      document.querySelectorAll('.card-action-menu, .modal-backdrop, #editPostModalOverlay').forEach(el => {
        if (el.id === 'editPostModalOverlay') el.hidden = true;
        else if (el.classList.contains('card-action-menu')) el.remove();
      });
    }
  `);
  await wait(400);
  const boardPath = path.join(screenshotsDir, 'verify_board.png');
  await client.captureScreenshot(boardPath);
  console.log(`Saved: ${boardPath}`);

  // 2. Open Docked Composer & Capture
  console.log('[2/4] Opening Docked Composer & Capturing...');
  await client.evaluate(`
    if (window.app && window.app.openComposer) {
      window.app.openComposer();
    } else {
      const addBtn = document.querySelector('.section-add-btn') || document.querySelector('#bottomPlusBtn');
      if (addBtn) addBtn.click();
    }
  `);
  await wait(600);
  const composerPath = path.join(screenshotsDir, 'verify_docked_composer.png');
  await client.captureScreenshot(composerPath);
  console.log(`Saved: ${composerPath}`);

  // 3. Open Card 3-dots Menu & Capture
  console.log('[3/4] Opening Card 3-dots Menu & Capturing...');
  await client.evaluate(`
    // Close composer cleanly
    if (window.app) {
      if (window.app.cancelEditPost) window.app.cancelEditPost();
      if (window.app.composerCardWrapper) window.app.composerCardWrapper.hidden = true;
    }
    const dots = document.querySelectorAll('.card-dots-btn');
    if (dots && dots[0]) {
      dots[0].click();
    }
  `);
  await wait(600);
  const menuPath = path.join(screenshotsDir, 'verify_card_menu.png');
  await client.captureScreenshot(menuPath);
  console.log(`Saved: ${menuPath}`);

  // 4. Trigger Edit Post to open Centered Edit Modal & Capture
  console.log('[4/4] Opening Centered Edit Post Modal & Capturing...');
  await client.evaluate(`
    document.querySelectorAll('.card-action-menu').forEach(el => el.remove());
    if (window.app && window.app.state && window.app.state.sections) {
      const card = window.app.state.sections.find(s => s.cards?.length > 0)?.cards[0];
      if (card && window.app.editPost) {
        window.app.editPost(card.id);
      }
    }
  `);
  await wait(700);
  const editModalPath = path.join(screenshotsDir, 'verify_edit_modal.png');
  await client.captureScreenshot(editModalPath);
  console.log(`Saved: ${editModalPath}`);

  // Cleanup: Cancel edit mode & return board to clean state
  await client.evaluate(`
    if (window.app) {
      if (window.app.cancelEditPost) window.app.cancelEditPost();
      if (window.app.composerCardWrapper) window.app.composerCardWrapper.hidden = true;
      if (window.app.editPostModalOverlay) window.app.editPostModalOverlay.hidden = true;
      document.querySelectorAll('.card-action-menu').forEach(el => el.remove());
    }
  `);

  client.close();
  console.log('\n[Visual Proof] ALL 4 PROOF SCREENSHOTS SUCCESSFULLY CAPTURED:');
  console.log(`- ${boardPath}`);
  console.log(`- ${composerPath}`);
  console.log(`- ${menuPath}`);
  console.log(`- ${editModalPath}`);
}

run().catch(err => {
  console.error('[Visual Proof] Error:', err);
  process.exit(1);
});
