/**
 * Padles — Shelf / Section Board Application
 * Features Padlet-authentic Dark Post Composer, multi-tool attachments bar,
 * color & section selectors, and real-time live search integration.
 */

// Available Color Palettes for Cards
// Available Color Palettes for Cards (Picture 2: White + Pastel Red, Yellow, Green, Blue, Purple)
const PALETTES = [
  { id: 'white', name: 'White', hex: '#ffffff', dot: '#ffffff', cardBg: '#ffffff', border: '#e2e8f0', textColor: '#0f172a' },
  { id: 'red', name: 'Red', hex: '#ff5c5c', dot: '#ff5c5c', cardBg: '#ffe4e6', border: '#fecdd3', textColor: '#881337' },
  { id: 'yellow', name: 'Yellow', hex: '#fbbf24', dot: '#fbbf24', cardBg: '#fef9c3', border: '#fef08a', textColor: '#713f12' },
  { id: 'green', name: 'Green', hex: '#34d399', dot: '#34d399', cardBg: '#dcfce7', border: '#bbf7d0', textColor: '#14532d' },
  { id: 'blue', name: 'Blue', hex: '#38bdf8', dot: '#38bdf8', cardBg: '#e0f2fe', border: '#bae6fd', textColor: '#0c4a6e' },
  { id: 'purple', name: 'Purple', hex: '#a855f7', dot: '#a855f7', cardBg: '#f3e8ff', border: '#e9d5ff', textColor: '#581c87' }
];

// 21 Built-In Media Tools (Blueprint Section 5.1)
const ALL_TOOLS = [
  { id: 'padles', name: 'Padles', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { id: 'arcade', name: 'Padles Arcade', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m8-2h.01m3 0h.01"/></svg>' },
  { id: 'upload', name: 'Upload', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' },
  { id: 'link', name: 'Link', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' },
  { id: 'camera', name: 'Camera', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' },
  { id: 'video', name: 'Video recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' },
  { id: 'audio', name: 'Audio recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' },
  { id: 'screen', name: 'Screen recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
  { id: 'draw', name: 'Draw', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>' },
  { id: 'poll', name: 'Poll', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
  { id: 'gdrive', name: 'Google Drive', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 17 9 7 15 17 3 17"/><polygon points="9 7 15 7 21 17 15 17 9 7"/></svg>' },
  { id: 'onedrive', name: 'OneDrive', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>' },
  { id: 'ai-image', name: 'AI image', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>' },
  { id: 'ai-speech', name: 'AI speech', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' },
  { id: 'album', name: 'Photo album', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { id: 'image-search', name: 'Image search', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
  { id: 'gif', name: 'GIF', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 8H7v8h3v-3H8.5m6-5v8m3.5-8h-3v8m0-4h2.5"/></svg>' },
  { id: 'youtube', name: 'YouTube', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>' },
  { id: 'spotify', name: 'Spotify', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.208-2.35-1.436-5.308-1.76-8.793-.963-.334.077-.67-.13-.746-.465-.077-.334.13-.67.465-.746 3.808-.87 7.076-.505 9.723 1.11.295.18.387.562.208.856zm1.224-2.724c-.227.37-.714.487-1.084.26-2.69-1.653-6.79-2.132-9.972-1.166-.417.127-.863-.109-.99-.526-.127-.417.109-.863.526-.99 3.633-1.103 8.147-.568 11.26 1.34.37.226.487.713.26 1.082zm.106-2.835C14.692 8.93 9.38 8.754 6.297 9.69c-.495.15-1.023-.13-1.173-.625-.15-.495.13-1.023.625-1.173 3.551-1.077 9.426-.874 13.14 1.33.447.265.592.848.327 1.295-.265.447-.848.592-1.295.327z"/></svg>' },
  { id: 'web-search', name: 'Web search', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { id: 'location', name: 'Location', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' }
];

class PadlesShelfApp {
  constructor() {
    this.storageKey = 'padles_board_exact_v1';
    this.sectionsTrack = document.getElementById('sectionsTrack');
    this.postModal = document.getElementById('composerCardWrapper');
    this.composerCardWrapper = this.postModal;
    this.editPostModalOverlay = document.getElementById('editPostModalOverlay');
    this.composerCard = document.getElementById('composerCard');
    this.titleInput = document.getElementById('composerTitleInput');
    this.bodyInput = document.getElementById('composerBodyInput');
    this.publishBtn = document.getElementById('publishBtn');
    this.colorPickerPill = document.getElementById('colorPickerPill');
    this.sectionSelectorPill = document.getElementById('sectionSelectorPill');
    this.currentColorDot = document.getElementById('currentColorDot');
    this.currentColorLabel = document.getElementById('currentColorLabel');
    this.currentSectionLabel = document.getElementById('currentSectionLabel');
    this.colorPaletteDropdown = document.getElementById('colorSelectPopover');
    this.activeAttachmentPreview = document.getElementById('activeAttachmentPreview');
    this.previewTypeBadge = document.getElementById('previewTypeBadge');
    this.previewTitleText = document.getElementById('previewTitleText');
    this.removeAttachmentBtn = document.getElementById('removeAttachmentBtn');

    // Color Popover (Picture 2)
    this.colorSelectPopover = document.getElementById('colorSelectPopover');
    this.colorOptionsList = document.getElementById('colorOptionsList');

    // Section Popover (Picture 3)
    this.sectionSelectPopover = document.getElementById('sectionSelectPopover');
    this.sectionOptionsList = document.getElementById('sectionOptionsList');
    this.popoverNewSectionBtn = document.getElementById('popoverNewSectionBtn');

    // Post Fields Modal (Picture 4)
    this.postFieldsModal = document.getElementById('postFieldsModal');
    this.composerFieldsBtn = document.getElementById('composerFieldsBtn');
    this.closePostFieldsBtn = document.getElementById('closePostFieldsBtn');
    this.addCustomFieldBtn = document.getElementById('addCustomFieldBtn');

    // Multiple Drafts Dock Elements
    this.dockableModalsContainer = document.getElementById('dockableModalsContainer');
    this.dockedTabsTrack = document.getElementById('dockedTabsTrack');
    this.dockBulkActionWrapper = document.getElementById('dockBulkActionWrapper');
    this.dockBulkActionBtn = document.getElementById('dockBulkActionBtn');
    this.draftsBulkMenu = document.getElementById('draftsBulkMenu');
    this.bulkPublishAllBtn = document.getElementById('bulkPublishAllBtn');
    this.bulkDeleteAllBtn = document.getElementById('bulkDeleteAllBtn');
    this.expandModalBtn = document.getElementById('expandModalBtn');
    this.minimizeModalBtn = document.getElementById('minimizeModalBtn');
    this.schedulePostBtn = document.getElementById('schedulePostBtn');

    // Search Submodal
    this.searchAttachmentModal = document.getElementById('searchAttachmentModal');
    this.mediaQueryInput = document.getElementById('mediaQueryInput');
    this.mediaSearchResults = document.getElementById('mediaSearchResults');

    // Top Header Search
    this.searchOverlay = document.getElementById('searchOverlay');
    this.boardSearchInput = document.getElementById('boardSearchInput');
    this.toastEl = document.getElementById('toast');

    // Supabase Cloud Backend & Presence Elements
    this.backend = window.padlesBackend || null;
    this.cloudSyncBtn = document.getElementById('cloudSyncBtn');
    this.cloudStatusDot = document.getElementById('cloudStatusDot');
    this.cloudStatusText = document.getElementById('cloudStatusText');
    this.collaboratorsStrip = document.getElementById('collaboratorsStrip');
    this.cloudSettingsModal = document.getElementById('cloudSettingsModal');
    this.closeCloudSettingsBtn = document.getElementById('closeCloudSettingsBtn');
    this.cloudConfigForm = document.getElementById('cloudConfigForm');
    this.supabaseUrlInput = document.getElementById('supabaseUrlInput');
    this.supabaseKeyInput = document.getElementById('supabaseKeyInput');
    this.supabaseBoardIdInput = document.getElementById('supabaseBoardIdInput');
    this.toggleKeyVisibilityBtn = document.getElementById('toggleKeyVisibilityBtn');
    this.testConnectionBtn = document.getElementById('testConnectionBtn');
    this.modalStatusDot = document.getElementById('modalStatusDot');
    this.modalStatusLabel = document.getElementById('modalStatusLabel');
    this.disconnectCloudBtn = document.getElementById('disconnectCloudBtn');
    this.pushLocalToCloudBtn = document.getElementById('pushLocalToCloudBtn');
    this.guideAccordionToggle = document.getElementById('guideAccordionToggle');
    this.guideAccordionContent = document.getElementById('guideAccordionContent');
    this.copySchemaPathBtn = document.getElementById('copySchemaPathBtn');

    // Section Context Menu (Blueprint Section 2.2)
    this.sectionContextMenu = document.getElementById('sectionContextMenu');
    this.activeSectionContextId = null;

    // Schedule Post Modal (Blueprint Section 5.2)
    this.schedulePostModal = document.getElementById('schedulePostModal');
    this.closeScheduleBtn = document.getElementById('closeScheduleBtn');
    this.cancelScheduleBtn = document.getElementById('cancelScheduleBtn');
    this.confirmScheduleBtn = document.getElementById('confirmScheduleBtn');
    this.scheduleDateTimeInput = document.getElementById('scheduleDateTimeInput');
    this.scheduleTimezoneText = document.getElementById('scheduleTimezoneText');

    // All Tools Modal (Blueprint Section 5.1: 21 Built-In Tools)
    this.allToolsModal = document.getElementById('allToolsModal');
    this.allToolsSearchInput = document.getElementById('allToolsSearchInput');
    this.closeAllToolsBtn = document.getElementById('closeAllToolsBtn');
    this.allToolsGrid = document.getElementById('allToolsGrid');

    // Custom Field Builder (Blueprint Section 6.2)
    this.customFieldBuilderModal = document.getElementById('customFieldBuilderModal');
    this.backCustomFieldBtn = document.getElementById('backCustomFieldBtn');
    this.closeCustomFieldModalBtn = document.getElementById('closeCustomFieldModalBtn');
    this.customFieldNameInput = document.getElementById('customFieldNameInput');
    this.customFieldTypeSelect = document.getElementById('customFieldTypeSelect');
    this.customFieldTypeOptions = document.getElementById('customFieldTypeOptions');
    this.customFieldRequiredToggle = document.getElementById('customFieldRequiredToggle');
    this.cancelCustomFieldBtn = document.getElementById('cancelCustomFieldBtn');
    this.saveCustomFieldBtn = document.getElementById('saveCustomFieldBtn');
    this.customFieldsList = document.getElementById('customFieldsList');
    this.composerCustomFieldsArea = document.getElementById('composerCustomFieldsArea');

    // Draft Discard Undo Toast (Blueprint Section 7.1)
    this.draftUndoToast = document.getElementById('draftUndoToast');
    this.draftUndoBtn = document.getElementById('draftUndoBtn');
    this.lastDiscardedDraft = null;
    this.draftUndoTimeout = null;

    // Card Context Menu (Padles Authentic 14-Item Menu & 6 Swatches)
    this.cardContextMenu = document.getElementById('cardContextMenu');
    this.cardMenuColorRow = document.getElementById('cardMenuColorRow');
    this.pinActionLabel = document.getElementById('pinActionLabel');
    this.activeContextCard = null;

    // Post Detail / Expanded Theater View Modal
    this.cardDetailModal = document.getElementById('cardDetailModal');
    this.closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
    this.detailMediaCanvas = document.getElementById('detailMediaCanvas');
    this.detailSectionTitle = document.getElementById('detailSectionTitle');
    this.detailPostSubject = document.getElementById('detailPostSubject');
    this.detailPostBody = document.getElementById('detailPostBody');
    this.detailCustomFieldsBox = document.getElementById('detailCustomFieldsBox');
    this.detailReactionBtn = document.getElementById('detailReactionBtn');
    this.detailReactionCount = document.getElementById('detailReactionCount');
    this.detailCommentsList = document.getElementById('detailCommentsList');
    this.detailCommentForm = document.getElementById('detailCommentForm');
    this.detailCommentInput = document.getElementById('detailCommentInput');
    this.detailCurrentNum = document.getElementById('detailCurrentNum');
    this.detailTotalNum = document.getElementById('detailTotalNum');
    this.detailNextBtn = document.getElementById('detailNextBtn');
    this.detailPrevBtn = document.getElementById('detailPrevBtn');
    this.activeDetailCardId = null;

    // Active Composer / Draft State & Edit Mode State
    this.activeDraftId = null;
    this.editingCardId = null;
    this.composerState = {
      selectedSectionId: null,
      selectedColor: 'white',
      attachment: null
    };

    this.draggedCard = null;
    this.dragSourceSectionId = null;

    this.state = this.loadState();
    this.init();
  }

  init() {
    this.renderBoard();
    this.renderDraftsDock();
    this.initPaletteSwatches();
    this.initSectionContextMenu();
    this.initCardContextMenu();
    this.initCardDetailModal();
    this.initScheduleModal();
    this.initAllToolsModal();
    this.initCustomFieldBuilder();
    this.initCloudBackendUI();
    this.initSlideshow();
    this.initShareDrawer();
    this.initSettingsDrawer();
    this.applyLoadedSettings();
    this.initMoreDrawer();
    this.attachEventListeners();

    if (this.backend && this.backend.isConnected) {
      this.syncFromCloud();
    }
  }

  loadState() {
    let state = null;
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        state = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load board state:', e);
    }

    if (!state) {
      state = {
        author: 'Salman Madani',
        title: 'Physics Audio Reflections: I see, I think, I wonder',
        sections: [
        {
                "id": "section-395446119",
                "title": "Instructions",
                "cards": [
                        {
                                "id": "surface-post-subject-c4085710932",
                                "pinned": false,
                                "subject": "Student Instructions",
                                "title": "Student Instructions",
                                "body": "<p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li><li><p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li></ul></li></ul></li></ul></li></ul></li></ul></li></ul><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li></ul>",
                                "color": "blue",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-subject-c4093588220",
                                "pinned": false,
                                "subject": "sd",
                                "title": "sd",
                                "body": "",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446117",
                "title": "Balloon Cars",
                "cards": [
                        {
                                "id": "wish-4085710930",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F50a8c8a452dce013523c4b39bbff35c11e701888%2F36fbb66b68e499a179acc8dda4bf30fc-h-6eadd3623412573bd65fb0421c008910.jpg",
                                        "caption": "balloon car making",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "wish-4085710931",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F523e034bb6995f36504d9755f945d1d9ae81d269%2Ff077ecdd468c21922402c4922b8de6e2-h-3f78d5625cb4750592bd47158ebbf09e.jpg",
                                        "caption": "Balloon car: Newton’s third law",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-body-c4093947677",
                                "pinned": false,
                                "subject": "",
                                "title": "",
                                "body": "<p>asd</p>",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446120",
                "title": "Newton's First Law",
                "cards": [
                        {
                                "id": "wish-4085710929",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F452a86f942f6d7288eb3d37de942f70a61267e26%2Fc9ddbbc6aa2870fbbd586558643951db-h-72c024387febcc80e85323797288811e.jpg",
                                        "caption": "Newtons First Law Of Motion : Egg Drop",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446118",
                "title": "BIPOC Scientists",
                "cards": [
                        {
                                "id": "wish-4085710927",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.8703241895261846%2Cc_lfill%2Cdpr_1%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F82782ec566665fe6b49709a0beb62ca368fc9c2d%2Fa40a39f56f16f6666c7728af7c6ee2bd-h-c365868814cf236ba4dadd17a1b721e2.png",
                                        "caption": "Classroom Resources - I Am A Scientist",
                                        "provider": "iamascientist.info",
                                        "category": "iamascientist.info"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446173",
                "title": "Section 5",
                "cards": [
                        {
                                "id": "surface-post-subject-c4093588317",
                                "pinned": false,
                                "subject": "sd",
                                "title": "sd",
                                "body": "",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-body-c_new47",
                                "pinned": false,
                                "subject": "",
                                "title": "",
                                "body": "<p>This is a test post for editing. - updated</p>",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        }
],
        drafts: [],
        customFields: []
      };
    }

    if (!state.drafts) {
      state.drafts = [];
    }

    if (!state.customFields) {
      state.customFields = [];
    }

    if (!state.settings) {
      state.settings = {
        title: state.title || 'Physics Audio Reflections: I see, I think, I wonder',
        description: state.description || '',
        icon: state.icon || '',
        wallpaper: state.wallpaperTheme || 'aurora',
        colorScheme: 'dark',
        font: 'niagara',
        postSize: 'standard',
        layoutFormat: 'columns',
        sortBy: 'manual',
        newPostPosition: 'last',
        showAuthorAndTime: true,
        commentsEnabled: true,
        reactionsPreset: 'all',
        moderation: 'auto',
        copyProtection: 'none',
        url: window.location.href
      };
    }

    return state;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  /* ========================================================================
     Rendering Board Sections & Cards
     ======================================================================== */

  renderBoard() {
    this.sectionsTrack.innerHTML = '';

    this.state.sections.forEach(section => {
      const sectionCol = document.createElement('div');
      sectionCol.className = 'section-column';
      sectionCol.id = section.id;

      // Section Header (Padlet Folder Tab)
      const headerBox = document.createElement('div');
      headerBox.className = 'section-header-box';
      headerBox.innerHTML = `
        <div class="section-title-capsule">
          <div class="section-title-body">
            <h2 class="section-title-text" title="${this.escapeHtml(section.title)}">${this.escapeHtml(section.title)}</h2>
          </div>
          <div class="section-title-skew"></div>
          <button class="section-menu-btn" title="Section actions" aria-label="Section actions" data-section-id="${section.id}">
            <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M16 10a3.143 3.143 0 1 1 0-6.286A3.143 3.143 0 0 1 16 10m0 9.143a3.143 3.143 0 1 1 0-6.286 3.143 3.143 0 0 1 0 6.286m-3.143 6a3.143 3.143 0 1 0 6.286 0 3.143 3.143 0 0 0-6.286 0"/></svg>
          </button>
        </div>
        <button class="section-add-btn" title="Add post to ${this.escapeHtml(section.title)}" aria-label="Add post to ${this.escapeHtml(section.title)}">
          <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M15.984 3.319A1 1 0 0 0 15 4.333V15H4.333a1 1 0 0 0-.936.614A1 1 0 0 0 4.333 17H15v10.667a1 1 0 0 0 .614.937q.185.077.386.077a.8.8 0 0 0 .386-.077 1 1 0 0 0 .542-.55c.049-.123.074-.255.072-.387V17h10.667a1 1 0 0 0 .716-.288 1.004 1.004 0 0 0 0-1.424 1 1 0 0 0-.716-.288H17V4.333a1 1 0 0 0-.293-.722 1 1 0 0 0-.722-.292z"/></svg>
        </button>
      `;

      const menuBtn = headerBox.querySelector('.section-menu-btn');
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openSectionContextMenu(section.id, menuBtn);
      });

      const addBtn = headerBox.querySelector('.section-add-btn');
      addBtn.addEventListener('click', () => {
        this.openComposer(section.id);
      });

      // Cards Stack Container
      const cardsStack = document.createElement('div');
      cardsStack.className = 'section-cards-stack';
      cardsStack.dataset.sectionId = section.id;

      this.setupDropZone(cardsStack, section.id);

      // Render cards in this section
      section.cards.forEach(card => {
        const cardEl = this.renderCardElement(card, section.id);
        cardsStack.appendChild(cardEl);
      });

      sectionCol.appendChild(headerBox);
      sectionCol.appendChild(cardsStack);
      this.sectionsTrack.appendChild(sectionCol);
    });
  }

  renderCardElement(card, sectionId) {
    const el = document.createElement('article');
    const colorClass = card.color === 'blue' ? 'color-blue' : (card.color === 'white' || card.color === 'default' ? 'color-default' : `color-${card.color || 'default'}`);
    el.className = `padlet-card ${colorClass}`;
    el.id = card.id;
    el.dataset.color = card.color || 'default';
    el.draggable = true;
    el.addEventListener('mouseenter', () => el.classList.add('is-hovered'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-hovered'));

    // Apply custom palette if not default/blue
    if (card.color && card.color !== 'blue' && card.color !== 'white' && card.color !== 'default') {
      const pal = this.getPalette(card.color);
      if (pal) {
        el.style.backgroundColor = pal.cardBg;
      }
    }

    let pinnedHtml = '';
    if (card.pinned) {
      pinnedHtml = `
        <div class="card-pinned-banner" tabindex="0" aria-label="Pinned">
          <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M28.091 10.344 21.657 3.91c-1.77-1.77-4.753-1.286-5.872.953l-3.247 6.495a1 1 0 0 1-.568.498l-5.555 1.919a1.666 1.666 0 0 0-.634 2.754l4.139 4.139-5.919 5.919v1.414h1.414l5.919-5.919 4.139 4.139c.871.87 2.352.529 2.754-.634l1.919-5.555a1 1 0 0 1 .498-.568l6.495-3.247c2.239-1.119 2.723-4.103.953-5.872z"/></svg>
          </span>
          <span>Pinned</span>
        </div>
      `;
    }

    const cornerActionsHtml = `
      <div class="card-corner-actions" data-testid="surfacePostCornerActions">
        <div class="card-edit-btn-wrapper">
          <button type="button" class="card-edit-btn" title="Edit" aria-label="Edit this post" data-testid="surfacePostEditButton">
            <span>Edit</span>
          </button>
        </div>
        <div class="card-actions-divider"></div>
        <button type="button" class="card-dots-btn" title="More post actions" aria-label="More post actions" data-testid="surfacePostMoreActionsButton">
          <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M16 10a3.143 3.143 0 1 1 0-6.286A3.143 3.143 0 0 1 16 10m0 9.143a3.143 3.143 0 1 1 0-6.286 3.143 3.143 0 0 1 0 6.286m-3.143 6a3.143 3.143 0 1 0 6.286 0 3.143 3.143 0 0 0-6.286 0"/></svg>
        </button>
      </div>
    `;

    let attachmentHtml = '';
    if (card.attachment && card.attachment.thumbnailUrl) {
      if (card.attachment.category === 'iamascientist.info' || card.type === 'link') {
        attachmentHtml = `
          <div class="media-attachment-link">
            <img src="${card.attachment.thumbnailUrl}" class="link-thumb" alt="${this.escapeHtml(card.attachment.caption || '')}" />
            <div class="youtube-badge">${this.escapeHtml(card.attachment.category || 'link')}</div>
          </div>
        `;
      } else {
        attachmentHtml = `
          <div class="media-attachment-video">
            <img src="${card.attachment.thumbnailUrl}" class="video-thumb" alt="${this.escapeHtml(card.attachment.caption || '')}" />
            <div class="play-overlay-btn" title="Play">
              <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M7 23.54V8.46c0-2.017 2.152-3.304 3.929-2.349l14.033 7.54c1.873 1.006 1.873 3.692 0 4.698l-14.033 7.54C9.152 26.844 7 25.557 7 23.54"/></svg>
            </div>
            <div class="youtube-badge">${this.escapeHtml(card.attachment.provider || 'YouTube')}</div>
          </div>
        `;
      }
    }

    let captionHtml = card.attachment && card.attachment.caption ? `<p class="card-caption">${this.escapeHtml(card.attachment.caption)}</p>` : '';

    let subjectText = card.subject || card.title || '';
    let subjectHtml = subjectText ? `<h3 class="card-title">${this.escapeHtml(subjectText)}</h3>` : '';

    let bodyHtml = '';
    if (card.body) {
      bodyHtml = `<div class="card-text-content">${card.body}</div>`;
    } else if (card.content) {
      bodyHtml = `
        <div class="card-text-content">
          ${card.content.intro ? `<p>${card.content.intro}</p>` : ''}
          ${card.content.body ? `<p>${card.content.body}</p>` : ''}
          ${card.content.bullets ? `
            <ul>
              ${card.content.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }

    let customFieldsHtml = '';
    if (card.customFieldValues && Object.keys(card.customFieldValues).length > 0) {
      customFieldsHtml = '<div class="card-custom-fields-box">';
      for (const [cfId, val] of Object.entries(card.customFieldValues)) {
        if (val !== undefined && val !== null && val !== '') {
          const fieldDef = (this.state.customFields || []).find(f => f.id === cfId);
          const fieldName = fieldDef ? fieldDef.name : 'Field';
          let displayVal = val;
          if (fieldDef && fieldDef.type === 'rating') {
            const num = Math.min(10, Math.max(1, parseInt(val, 10) || 0));
            displayVal = '★'.repeat(num);
          }
          customFieldsHtml += `<span class="card-cf-chip"><strong>${this.escapeHtml(fieldName)}:</strong> ${this.escapeHtml(String(displayVal))}</span>`;
        }
      }
      customFieldsHtml += '</div>';
    }

    const bottomBarHtml = `
      <div class="card-bottom-bar">
        <button class="reaction-btn ${card.hasReacted ? 'has-reacted' : ''}" title="Add reaction" aria-label="Add reaction">
          <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
            <path d="M11.168 3c0.657 0 1.299 0.064 1.92 0.188-0.171 0.455-0.287 0.937-0.342 1.437-0.511-0.098-1.038-0.151-1.578-0.151-4.616 0-8.359 3.743-8.359 8.359s3.743 8.358 8.359 8.358c4.616 0 8.358-3.742 8.358-8.358 0-0.54-0.053-1.068-0.151-1.579 0.5-0.055 0.982-0.172 1.437-0.342 0.123 0.622 0.189 1.264 0.189 1.922-0 5.431-4.403 9.833-9.833 9.833s-9.833-4.402-9.833-9.833c0-5.431 4.402-9.833 9.833-9.833z"/>
            <path d="M6.654 15.447c0.32-0.252 0.783-0.196 1.035 0.124 0.835 1.059 2.105 1.689 3.479 1.689 1.373-0 2.64-0.628 3.475-1.685 0.252-0.32 0.717-0.375 1.037-0.122s0.373 0.717 0.121 1.036c-1.112 1.407-2.804 2.246-4.633 2.246-1.831 0-3.525-0.841-4.637-2.251-0.252-0.32-0.197-0.784 0.122-1.036z"/>
            <path d="M8.219 9.638c0.678 0 1.228 0.551 1.228 1.229s-0.55 1.228-1.228 1.228-1.228-0.55-1.228-1.228c0-0.678 0.549-1.229 1.228-1.229z"/>
            <path d="M14.119 9.638c0.26 0 0.501 0.081 0.699 0.219 0.050 0.043 0.101 0.085 0.152 0.126 0.232 0.223 0.376 0.537 0.376 0.884-0 0.678-0.55 1.228-1.228 1.228s-1.229-0.55-1.229-1.228c0-0.678 0.551-1.229 1.229-1.229z"/>
            <path d="M19.163 7.111c0.61 0.85 1.089 1.8 1.404 2.823-0.452 0.181-0.936 0.298-1.441 0.34-0.155-0.481-0.351-0.944-0.586-1.383 0.026 0.010 0.051 0.023 0.078 0.029l0.092 0.009c0.251-0 0.453-0.204 0.453-0.454v-1.363z"/>
            <path d="M17.981 5.746c0.093 0.090 0.185 0.18 0.275 0.273v2.383c-0.673-1.074-1.583-1.983-2.658-2.656h2.383z"/>
            <path d="M14.067 3.434c1.023 0.315 1.972 0.795 2.823 1.405h-1.362l-0.091 0.008c-0.207 0.042-0.363 0.226-0.363 0.445 0 0.059 0.011 0.115 0.031 0.167-0.437-0.234-0.898-0.429-1.378-0.583 0.042-0.506 0.159-0.99 0.34-1.441z"/>
            <path d="M18.667 0.333c-2.761 0-5 2.239-5 5s2.239 5 5 5c2.761 0 5-2.239 5-5s-2.239-5-5-5zM18.667 1.697c0.251 0 0.455 0.204 0.455 0.455v2.727h2.727c0.251 0 0.454 0.204 0.454 0.455s-0.204 0.455-0.454 0.455h-2.727v2.727c0 0.251-0.204 0.455-0.455 0.455s-0.455-0.204-0.455-0.455v-2.727h-2.727c-0.251 0-0.455-0.204-0.455-0.455s0.204-0.455 0.455-0.455h2.727v-2.727c0-0.251 0.204-0.455 0.455-0.455z"/>
          </svg>
          ${card.reactions > 0 ? `<span>${card.reactions}</span>` : ''}
        </button>
      </div>
    `;

    el.innerHTML = `
      ${pinnedHtml}
      <div class="card-inner-surface">
        ${cornerActionsHtml}
        ${attachmentHtml}
        ${captionHtml}
        ${subjectHtml}
        ${bodyHtml}
        ${customFieldsHtml}
        ${bottomBarHtml}
      </div>
    `;

    // Corner Edit and 3-dots actions
    const editBtn = el.querySelector('.card-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editPost(card.id);
      });
    }

    const dotsBtn = el.querySelector('.card-dots-btn');
    if (dotsBtn) {
      dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCardContextMenu(card, dotsBtn);
      });
    }

    // Reaction click handler
    const reactBtn = el.querySelector('.reaction-btn');
    reactBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.hasReacted = !card.hasReacted;
      card.reactions = (card.reactions || 0) + (card.hasReacted ? 1 : -1);
      reactBtn.classList.toggle('has-reacted', card.hasReacted);
      const span = reactBtn.querySelector('span');
      if (card.reactions > 0) {
        if (!span) {
          const s = document.createElement('span');
          s.textContent = card.reactions;
          reactBtn.appendChild(s);
        } else {
          span.textContent = card.reactions;
        }
      } else if (span) {
        span.remove();
      }
      this.saveState();
      this.showToast(card.hasReacted ? 'Reaction added' : 'Reaction removed');
    });

    // In Padles, left clicking a card does nothing (detail view opened via context menu / actions)
    // Right clicking a card opens post actions context menu at cursor position
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openCardContextMenu(card, el, e);
    });

    // Drag start
    el.addEventListener('dragstart', (e) => {
      this.draggedCard = card;
      this.dragSourceSectionId = sectionId;
      el.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.id);
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('is-dragging');
      this.draggedCard = null;
      this.dragSourceSectionId = null;
    });

    return el;
  }

  setupDropZone(stackEl, targetSectionId) {
    stackEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    stackEl.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!this.draggedCard) return;

      const sourceSection = this.state.sections.find(s => s.id === this.dragSourceSectionId);
      const targetSection = this.state.sections.find(s => s.id === targetSectionId);

      if (!sourceSection || !targetSection) return;

      const movedCard = this.draggedCard;
      sourceSection.cards = sourceSection.cards.filter(c => c.id !== movedCard.id);
      targetSection.cards.push(movedCard);

      this.saveState();
      this.renderBoard();
      this.showToast(`Moved to ${targetSection.title}`);

      if (this.backend && this.backend.isConnected) {
        this.backend.reorderPost(movedCard.id, targetSectionId, 1000.0);
      }
    });
  }

  /* ========================================================================
     Padles-Authentic Multiple Drafts & Composer Management
     ======================================================================== */

  openComposer(targetSectionId = null) {
    this.createNewDraft(targetSectionId);
  }

  createNewDraft(targetSectionId = null) {
    // If we were editing a card, cancel edit mode
    if (this.editingCardId) {
      this.cancelEditPost();
    }

    // If there's an active draft open, sync its state first
    if (this.activeDraftId) {
      this.syncActiveDraftFromInputs();
    }

    const secId = targetSectionId || this.state.sections[0]?.id;
    const maxNum = this.state.drafts.reduce((max, d) => Math.max(max, d.draftNumber || 0), 0);
    const newDraft = {
      id: 'draft-' + Date.now(),
      draftNumber: maxNum + 1,
      title: '',
      body: '',
      color: 'white',
      sectionId: secId,
      attachment: null
    };

    // Appended to the end of drafts array (chronological order)
    this.state.drafts.push(newDraft);
    this.activeDraftId = newDraft.id;
    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.saveState();
    this.openDraftInComposer(newDraft);
  }

  openDraftInComposer(draft) {
    this.activeDraftId = draft.id;
    this.editingCardId = null;
    this.titleInput.value = draft.title || '';
    this.bodyInput.value = draft.body || '';
    this.composerState.selectedColor = draft.color || 'white';
    this.composerState.selectedSectionId = draft.sectionId || this.state.sections[0]?.id;
    this.composerState.attachment = draft.attachment || null;

    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.updateColorPickerUI();
    this.updateSectionSelectorUI();
    this.updateAttachmentPreviewUI();
    this.updatePublishButtonState();
    this.renderComposerCustomFields(draft);

    this.renderDraftsDock();
    this.titleInput.focus();
  }

  /* ========================================================================
     Edit Existing Post in Composer ("Update" Workflow)
     ======================================================================== */

  editPost(cardId) {
    const data = this.findCardAndSection(cardId);
    if (!data) return;
    const { card, section } = data;

    this.editingCardId = card.id;

    this.titleInput.value = card.title || '';
    if (card.content) {
      let bodyText = card.content.body || '';
      if (card.content.intro) bodyText = card.content.intro + '\n\n' + bodyText;
      this.bodyInput.value = bodyText.trim();
    } else if (card.attachment && card.attachment.caption) {
      this.bodyInput.value = card.attachment.caption;
    } else {
      this.bodyInput.value = '';
    }

    this.composerState.selectedColor = card.color || 'white';
    this.composerState.selectedSectionId = section.id;
    this.composerState.attachment = card.attachment || null;

    this.updateColorPickerUI();
    this.updateSectionSelectorUI();
    this.updateAttachmentPreviewUI();

    // Set button to Update mode with Padlet hot-pink #ff1f6d
    this.publishBtn.textContent = 'Update';
    this.publishBtn.title = 'Update post';
    this.publishBtn.setAttribute('aria-label', 'Update post');
    this.publishBtn.disabled = false;
    this.publishBtn.classList.add('is-active', 'is-update');

    this.renderComposerCustomFields(card);

    // Apply authentic dark edit mode styling to composerCard
    this.composerCard.className = 'composer-card is-editing-mode';

    // Mount composer card into centered edit overlay (Padlet Authentic Centered Modal)
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.appendChild(this.composerCard);
      this.editPostModalOverlay.hidden = false;
    } else if (this.composerCardWrapper) {
      this.composerCardWrapper.hidden = false;
      this.composerCardWrapper.appendChild(this.composerCard);
    }
    this.composerCard.hidden = false;

    this.adjustBodyTextareaHeight();
    this.bodyInput.focus();
    this.showToast(`Editing "${card.title || 'post'}"`);
  }

  adjustBodyTextareaHeight() {
    if (!this.bodyInput) return;
    this.bodyInput.style.height = 'auto';
    const newHeight = Math.max(160, Math.min(420, this.bodyInput.scrollHeight));
    this.bodyInput.style.height = `${newHeight}px`;
  }

  cancelEditPost() {
    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.className = 'composer-card';
    this.composerCard.hidden = true;

    // Return composer card to bottom drafts wrapper
    if (this.composerCardWrapper) {
      this.composerCardWrapper.appendChild(this.composerCard);
      this.composerCardWrapper.hidden = true;
    }
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.hidden = true;
    }

    // Reset composer inputs
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.composerState.attachment = null;
    this.updateAttachmentPreviewUI();
  }

  async saveEditedCard() {
    const data = this.findCardAndSection(this.editingCardId);
    if (!data) return;
    const { card, section: oldSection } = data;

    const newTitle = this.titleInput.value.trim();
    const newBody = this.bodyInput.value.trim();
    const targetSectionId = this.composerState.selectedSectionId || oldSection.id;
    const newColor = this.composerState.selectedColor || 'white';

    card.title = newTitle;
    card.color = newColor;

    if (this.composerState.attachment) {
      card.type = this.composerState.attachment.type;
      card.attachment = this.composerState.attachment;
      if (newBody) card.attachment.caption = newBody;
    } else {
      card.type = 'text';
      card.attachment = null;
      card.content = {
        body: newBody
      };
    }

    if (!card.customFieldValues) card.customFieldValues = {};
    if (this.composerCustomFieldsArea) {
      this.composerCustomFieldsArea.querySelectorAll('[data-cf-id]').forEach(input => {
        card.customFieldValues[input.dataset.cfId] = input.value;
      });
    }

    // Move to new section if changed
    if (targetSectionId !== oldSection.id) {
      oldSection.cards = oldSection.cards.filter(c => c.id !== card.id);
      const targetSec = this.state.sections.find(s => s.id === targetSectionId);
      if (targetSec) {
        targetSec.cards.push(card);
      }
    }

    const savedCardId = this.editingCardId;
    this.editingCardId = null;

    // Clean up UI & return composer card to dock
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.className = 'composer-card';
    this.composerCard.hidden = true;
    if (this.composerCardWrapper) {
      this.composerCardWrapper.appendChild(this.composerCard);
      this.composerCardWrapper.hidden = true;
    }
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.hidden = true;
    }

    this.saveState();
    this.renderBoard();
    this.showToast('Post updated!');

    // Sync to backend / Supabase
    if (this.backend && this.backend.isConnected) {
      try {
        await this.backend.updatePost(card, targetSectionId);
      } catch (err) {
        console.warn('Backend update failed:', err);
      }
    }
  }

  syncActiveDraftFromInputs() {
    if (!this.activeDraftId) return;
    const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
    if (!draft) return;

    draft.title = this.titleInput.value.trim();
    draft.body = this.bodyInput.value.trim();
    draft.color = this.composerState.selectedColor;
    draft.sectionId = this.composerState.selectedSectionId;
    draft.attachment = this.composerState.attachment;

    if (!draft.customFieldValues) draft.customFieldValues = {};
    if (this.composerCustomFieldsArea) {
      this.composerCustomFieldsArea.querySelectorAll('[data-cf-id]').forEach(input => {
        draft.customFieldValues[input.dataset.cfId] = input.value;
      });
    }
  }

  minimizeActiveDraft() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    if (!this.activeDraftId) return;

    this.syncActiveDraftFromInputs();
    this.activeDraftId = null;
    this.colorPaletteDropdown.hidden = true;
    this.saveState();
    this.renderDraftsDock();
    this.showToast('Draft minimized to bottom dock');
  }

  closeActiveDraft() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    if (this.activeDraftId) {
      this.discardDraft(this.activeDraftId);
    }
  }

  closeComposer() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    this.minimizeActiveDraft();
  }

  activateDraft(draftId) {
    if (this.editingCardId) {
      this.cancelEditPost();
    }
    if (this.activeDraftId === draftId) return;

    if (this.activeDraftId) {
      this.syncActiveDraftFromInputs();
    }

    const target = this.state.drafts.find(d => d.id === draftId);
    if (!target) return;

    this.openDraftInComposer(target);
  }

  discardDraft(draftId, e) {
    if (e) e.stopPropagation();
    const idx = this.state.drafts.findIndex(d => d.id === draftId);
    if (idx === -1) return;
    const discarded = this.state.drafts[idx];
    this.lastDiscardedDraft = { draft: { ...discarded }, index: idx };

    this.state.drafts = this.state.drafts.filter(d => d.id !== draftId);
    if (this.activeDraftId === draftId) {
      this.activeDraftId = null;
    }
    this.colorPaletteDropdown.hidden = true;
    this.saveState();
    this.renderDraftsDock();
    this.showDraftUndoToast();
  }

  showDraftUndoToast() {
    if (!this.draftUndoToast) return;
    this.draftUndoToast.hidden = false;
    clearTimeout(this.draftUndoTimeout);
    this.draftUndoTimeout = setTimeout(() => {
      if (this.draftUndoToast) this.draftUndoToast.hidden = true;
      this.lastDiscardedDraft = null;
    }, 10000);
  }

  undoDiscardDraft() {
    if (!this.lastDiscardedDraft) return;
    const { draft, index } = this.lastDiscardedDraft;
    const insertIdx = Math.min(index, this.state.drafts.length);
    this.state.drafts.splice(insertIdx, 0, draft);
    this.lastDiscardedDraft = null;
    if (this.draftUndoToast) this.draftUndoToast.hidden = true;
    clearTimeout(this.draftUndoTimeout);
    this.saveState();
    this.renderDraftsDock();
    this.showToast('Draft restored!');
  }

  toggleComposerExpanded() {
    this.composerCard.classList.toggle('is-expanded');
    const isExp = this.composerCard.classList.contains('is-expanded');
    this.expandModalBtn.title = isExp ? 'Dock post' : 'Expand post';
    this.expandModalBtn.setAttribute('aria-label', isExp ? 'Dock post' : 'Expand post');

    const svg = document.getElementById('expandModalSvg');
    if (svg) {
      if (isExp) {
        svg.innerHTML = '<path d="M26.279 28h.006c.391.002.784-.126 1.099-.385.36-.28.593-.689.595-1.141q.019-.18 0-.361l.02-14.571c0-.809-.779-1.56-1.704-1.541-.926 0-1.705.731-1.705 1.54l-.007 10.65L6.882 4.478c-.625-.625-1.756-.655-2.395.015-.655.655-.64 1.77-.015 2.395l9.12 9.105 8.593 8.604-12.195-.015c-.884 0-1.704.778-1.683 1.704 0 .926.799 1.705 1.682 1.705l16.289.01z"/>';
      } else {
        svg.innerHTML = '<path d="M5.721 4h-.006a1.72 1.72 0 0 0-1.099.385c-.36.28-.593.689-.595 1.141q-.02.18 0 .361l-.02 14.571c0 .809.779 1.56 1.704 1.541.926 0 1.705-.731 1.705-1.54l.007-10.65 17.701 17.713c.625.625 1.756.655 2.395-.015.655-.655.64-1.77.015-2.395l-9.12-9.105-8.593-8.604 12.195.015c.884 0 1.704-.778 1.683-1.704 0-.926-.799-1.705-1.682-1.705l-16.289-.01z"/>';
      }
    }

    const activeSlot = this.dockedTabsTrack?.querySelector('.dock-slot-item.is-active-slot');
    if (activeSlot) {
      activeSlot.classList.toggle('is-expanded', isExp);
    }
  }

  /**
   * Slot-based in-place draft rendering:
   * Keeps chronological order of drafts fixed.
   * When opening Draft 3 out of 5, Draft 1 and Draft 2 stay on the left,
   * Draft 3 expands in-place into the active composer, and Draft 4 and 5 stay on the right.
   * Zero tab reordering!
   */
  renderDraftsDock() {
    if (!this.dockedTabsTrack) return;
    this.dockedTabsTrack.innerHTML = '';

    const totalDrafts = this.state.drafts.length;
    this.dockBulkActionWrapper.hidden = totalDrafts === 0;

    if (totalDrafts === 0) {
      if (this.composerCardWrapper) {
        this.composerCardWrapper.hidden = true;
        this.composerCardWrapper.appendChild(this.composerCard);
      }
      return;
    }

    // Render every draft strictly in array order
    this.state.drafts.forEach((draft, idx) => {
      const slot = document.createElement('div');
      slot.className = 'dock-slot-item';
      slot.dataset.draftId = draft.id;
      slot.dataset.slotIndex = idx;

      if (draft.id === this.activeDraftId) {
        // ACTIVE DRAFT: Mount the composer card inside this exact slot!
        slot.classList.add('is-active-slot');
        if (this.composerCard.classList.contains('is-expanded')) {
          slot.classList.add('is-expanded');
        }

        // Mount composer card inside this slot
        slot.appendChild(this.composerCard);
        this.composerCard.hidden = false;

        // Smooth pop-in animation
        this.composerCard.classList.remove('composer-pop-in');
        void this.composerCard.offsetWidth;
        this.composerCard.classList.add('composer-pop-in');
      } else {
        // INACTIVE DRAFT: Render minimized tab button
        const tab = document.createElement('button');
        tab.className = 'dock-tab-btn';
        const labelText = draft.title ? draft.title : `Draft ${draft.draftNumber}`;
        tab.title = labelText;
        tab.setAttribute('data-testid', 'composerModalMinimizedButton');
        tab.innerHTML = `
          <span class="dock-tab-title">${this.escapeHtml(labelText)}</span>
          <span class="dock-tab-close-btn" title="Discard ${this.escapeHtml(labelText)}">&times;</span>
        `;

        tab.querySelector('.dock-tab-close-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.discardDraft(draft.id, e);
        });

        tab.addEventListener('click', () => {
          this.activateDraft(draft.id);
        });

        slot.appendChild(tab);
      }

      this.dockedTabsTrack.appendChild(slot);
    });

    // If no draft is active, keep composerCard parked inside composerCardWrapper (hidden)
    if (!this.activeDraftId && this.composerCardWrapper) {
      this.composerCardWrapper.hidden = true;
      this.composerCardWrapper.appendChild(this.composerCard);
    }
  }

  publishActiveDraft() {
    if (this.editingCardId) {
      this.saveEditedCard();
      return;
    }
    this.syncActiveDraftFromInputs();
    const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
    if (!draft) return;

    const title = draft.title;
    const body = draft.body;
    const section = this.state.sections.find(s => s.id === draft.sectionId) || this.state.sections[0];

    const newCard = {
      id: 'card-' + Date.now(),
      title: title || (draft.attachment ? draft.attachment.title : 'Note'),
      pinned: false,
      color: draft.color || 'cyan',
      reactions: 0,
      hasReacted: false
    };

    if (draft.attachment) {
      newCard.type = draft.attachment.type;
      newCard.attachment = draft.attachment;
    } else {
      newCard.type = 'text';
      newCard.content = {
        body: body || 'Reflection entry'
      };
    }

    if (draft.customFieldValues && Object.keys(draft.customFieldValues).length > 0) {
      newCard.customFieldValues = { ...draft.customFieldValues };
    }

    section.cards.push(newCard);

    // Remove draft from drafts list
    this.state.drafts = this.state.drafts.filter(d => d.id !== draft.id);
    this.activeDraftId = null;
    this.colorPaletteDropdown.hidden = true;

    this.saveState();
    this.renderBoard();
    this.renderDraftsDock();
    this.showToast(`Post published to ${section.title}!`);

    if (this.backend && this.backend.isConnected) {
      this.backend.createPost(newCard, section.id);
    }
  }

  publishAllDrafts() {
    this.syncActiveDraftFromInputs();
    if (this.state.drafts.length === 0) return;

    let publishedCount = 0;
    this.state.drafts.forEach((draft, idx) => {
      const section = this.state.sections.find(s => s.id === draft.sectionId) || this.state.sections[0];
      const newCard = {
        id: 'card-' + Date.now() + '-' + idx,
        title: draft.title || (draft.attachment ? draft.attachment.title : `Draft Note ${draft.draftNumber}`),
        pinned: false,
        color: draft.color || 'cyan',
        reactions: 0,
        hasReacted: false
      };

      if (draft.attachment) {
        newCard.type = draft.attachment.type;
        newCard.attachment = draft.attachment;
      } else {
        newCard.type = 'text';
        newCard.content = {
          body: draft.body || 'Audio reflection notes'
        };
      }

      section.cards.push(newCard);
      publishedCount++;

      if (this.backend && this.backend.isConnected) {
        this.backend.createPost(newCard, section.id);
      }
    });

    this.state.drafts = [];
    this.activeDraftId = null;
    this.postModal.hidden = true;
    this.postModal.classList.remove('is-open');
    this.draftsBulkMenu.hidden = true;

    this.saveState();
    this.renderBoard();
    this.renderDraftsDock();
    this.showToast(`Published all ${publishedCount} drafts!`);
  }

  deleteAllDrafts() {
    const count = this.state.drafts.length;
    this.state.drafts = [];
    this.activeDraftId = null;
    this.postModal.hidden = true;
    this.postModal.classList.remove('is-open');
    this.draftsBulkMenu.hidden = true;

    this.saveState();
    this.renderDraftsDock();
    this.showToast(`Deleted ${count} drafts`);
  }

  updatePublishButtonState() {
    const hasContent = this.titleInput.value.trim().length > 0 || 
                       this.bodyInput.value.trim().length > 0 || 
                       this.composerState.attachment !== null;

    this.publishBtn.disabled = !hasContent;
    this.publishBtn.classList.toggle('is-active', hasContent);
    if (this.editingCardId) {
      this.publishBtn.textContent = 'Update';
      this.publishBtn.title = 'Update post';
      this.publishBtn.setAttribute('aria-label', 'Update post');
      this.publishBtn.classList.add('is-update');
    } else {
      this.publishBtn.textContent = 'Publish';
      this.publishBtn.title = 'Submit post';
      this.publishBtn.setAttribute('aria-label', 'Submit post');
      this.publishBtn.classList.remove('is-update');
    }
  }

  getPalette(colorId) {
    if (colorId === 'cyan') colorId = 'blue';
    if (colorId === 'pink') colorId = 'red';
    return PALETTES.find(p => p.id === colorId) || PALETTES[0];
  }

  /* ========================================================================
     Color Popover (Picture 2: Pastel Colors List with Radio Indicator)
     ======================================================================== */

  renderColorPopover() {
    if (!this.colorOptionsList) return;
    this.colorOptionsList.innerHTML = '';

    PALETTES.forEach(pal => {
      const isSelected = this.composerState.selectedColor === pal.id;
      const row = document.createElement('div');
      row.className = `color-option-row ${isSelected ? 'is-selected' : ''}`;
      row.innerHTML = `
        <div class="color-option-left">
          <span class="color-swatch-circle" style="background-color: ${pal.dot};"></span>
          <span class="color-option-name">${this.escapeHtml(pal.name)}</span>
        </div>
        <div class="color-radio-ring"></div>
      `;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        this.composerState.selectedColor = pal.id;
        if (this.editingCardId) {
          this.composerCard.className = `composer-card is-editing-mode palette-${pal.id}`;
        } else {
          this.syncActiveDraftFromInputs();
        }
        this.updateColorPickerUI();
        this.closeAllPopovers();
        this.showToast(`Color set to ${pal.name}`);
      });

      this.colorOptionsList.appendChild(row);
    });
  }

  toggleColorPopover(e) {
    if (e) e.stopPropagation();
    const isHidden = !this.colorSelectPopover || this.colorSelectPopover.hidden;
    this.closeAllPopovers();
    if (isHidden && this.colorSelectPopover) {
      this.renderColorPopover();
      this.colorSelectPopover.hidden = false;
    }
  }

  initPaletteSwatches() {
    // Header palette icon syncs with color popover
  }

  updateColorPickerUI() {
    const pal = this.getPalette(this.composerState.selectedColor);
    if (this.currentColorDot) this.currentColorDot.style.backgroundColor = pal.dot;
    if (this.currentColorLabel) this.currentColorLabel.textContent = pal.name;
  }

  updateSectionSelectorUI() {
    const sec = this.state.sections.find(s => s.id === this.composerState.selectedSectionId) || this.state.sections[0];
    this.currentSectionLabel.textContent = sec ? sec.title : 'Section';
  }

  /* ========================================================================
     Section Popover (Picture 3: List of Sections with Yellow Checkmark)
     ======================================================================== */

  renderSectionPopover() {
    if (!this.sectionOptionsList) return;
    this.sectionOptionsList.innerHTML = '';

    this.state.sections.forEach(sec => {
      const isSelected = this.composerState.selectedSectionId === sec.id;
      const row = document.createElement('div');
      row.className = `section-option-row ${isSelected ? 'is-selected' : ''}`;
      row.innerHTML = `
        <span class="section-option-title">${this.escapeHtml(sec.title)}</span>
        <span class="section-check-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
      `;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        this.composerState.selectedSectionId = sec.id;
        if (!this.editingCardId) {
          this.syncActiveDraftFromInputs();
        }
        this.updateSectionSelectorUI();
        this.closeAllPopovers();
        this.showToast(`Section set to ${sec.title}`);
      });

      this.sectionOptionsList.appendChild(row);
    });
  }

  toggleSectionPopover(e) {
    if (e) e.stopPropagation();
    const isHidden = !this.sectionSelectPopover || this.sectionSelectPopover.hidden;
    this.closeAllPopovers();
    if (isHidden && this.sectionSelectPopover) {
      this.renderSectionPopover();
      this.sectionSelectPopover.hidden = false;
    }
  }

  /* ========================================================================
     Post Fields Modal (Picture 4: Post Fields Panel)
     ======================================================================== */

  openPostFieldsModal(e) {
    if (e) e.stopPropagation();
    this.closeAllPopovers();
    if (this.postFieldsModal) {
      this.renderCustomFieldsList();
      this.postFieldsModal.hidden = false;
    }
  }

  closePostFieldsModal() {
    if (this.postFieldsModal) {
      this.postFieldsModal.hidden = true;
    }
  }

  closeAllPopovers() {
    if (this.colorSelectPopover) this.colorSelectPopover.hidden = true;
    if (this.sectionSelectPopover) this.sectionSelectPopover.hidden = true;
    if (this.colorPaletteDropdown) this.colorPaletteDropdown.hidden = true;
    if (this.sectionContextMenu) this.sectionContextMenu.hidden = true;
    if (this.cardContextMenu) this.cardContextMenu.hidden = true;
  }

  /* ========================================================================
     Section Column Context Menu (Blueprint Section 2.2: 13-Item Actions)
     ======================================================================== */

  initSectionContextMenu() {
    if (!this.sectionContextMenu) return;

    this.sectionContextMenu.querySelectorAll('.menu-action-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const sectionId = this.activeSectionContextId;
        const sectionIndex = this.state.sections.findIndex(s => s.id === sectionId);
        const section = this.state.sections[sectionIndex];

        this.closeSectionContextMenu();
        if (!section && action !== 'add-post') return;

        switch (action) {
          case 'add-post':
            this.openComposer(sectionId);
            break;
          case 'start-slideshow':
            this.showToast(`Starting slideshow from ${section.title}`);
            break;
          case 'new-section-left': {
            const nextNum = this.state.sections.length + 1;
            const newSec = { id: 'sec-' + Date.now(), title: `Section ${nextNum}`, cards: [] };
            this.state.sections.splice(sectionIndex, 0, newSec);
            this.saveState();
            this.renderBoard();
            this.showToast(`Created section to the left`);
            if (this.backend && this.backend.isConnected) {
              this.backend.createSection(newSec);
            }
            break;
          }
          case 'new-section-right': {
            const nextNum = this.state.sections.length + 1;
            const newSec = { id: 'sec-' + Date.now(), title: `Section ${nextNum}`, cards: [] };
            this.state.sections.splice(sectionIndex + 1, 0, newSec);
            this.saveState();
            this.renderBoard();
            this.showToast(`Created section to the right`);
            if (this.backend && this.backend.isConnected) {
              this.backend.createSection(newSec);
            }
            break;
          }
          case 'move-section-right': {
            if (sectionIndex < this.state.sections.length - 1) {
              const [removed] = this.state.sections.splice(sectionIndex, 1);
              this.state.sections.splice(sectionIndex + 1, 0, removed);
              this.saveState();
              this.renderBoard();
              this.showToast(`Moved section right`);
            } else {
              this.showToast(`Already at the rightmost position`);
            }
            break;
          }
          case 'rename-section': {
            const newTitle = prompt('Enter new section name:', section.title);
            if (newTitle && newTitle.trim()) {
              section.title = newTitle.trim();
              this.saveState();
              this.renderBoard();
              this.updateSectionSelectorUI();
              this.showToast(`Renamed to ${section.title}`);
              if (this.backend && this.backend.isConnected) {
                this.backend.renameSection(section.id, section.title);
              }
            }
            break;
          }
          case 'make-default':
            this.state.sections.forEach(s => s.isDefault = (s.id === sectionId));
            this.saveState();
            this.showToast(`${section.title} is now default section`);
            break;
          case 'copy-section-name':
            navigator.clipboard?.writeText(section.title);
            this.showToast('Section name copied to clipboard!');
            break;
          case 'copy-breakout-link':
            navigator.clipboard?.writeText(`${window.location.href.split('#')[0]}#sec-${section.id}`);
            this.showToast('Breakout room link copied!');
            break;
          case 'delete-section': {
            if (this.state.sections.length <= 1) {
              alert('Cannot delete the only section on the board.');
              return;
            }
            if (confirm(`Are you sure you want to delete "${section.title}" and all its posts?`)) {
              this.state.sections = this.state.sections.filter(s => s.id !== sectionId);
              this.saveState();
              this.renderBoard();
              this.updateSectionSelectorUI();
              this.showToast(`Deleted ${section.title}`);
              if (this.backend && this.backend.isConnected) {
                this.backend.deleteSection(sectionId);
              }
            }
            break;
          }
        }
      });
    });
  }

  openSectionContextMenu(sectionId, targetEl) {
    this.closeAllPopovers();
    this.activeSectionContextId = sectionId;
    if (!this.sectionContextMenu || !targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const menuWidth = 270;
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 16) {
      left = window.innerWidth - menuWidth - 16;
    }
    this.sectionContextMenu.style.top = `${rect.bottom + 6}px`;
    this.sectionContextMenu.style.left = `${Math.max(12, left)}px`;
    this.sectionContextMenu.hidden = false;
  }

  closeSectionContextMenu() {
    if (this.sectionContextMenu) {
      this.sectionContextMenu.hidden = true;
    }
    this.activeSectionContextId = null;
  }

  /* ========================================================================
     Card 3-Dots Context Menu (Padlet Authentic 14-Item Menu & 6 Swatches)
     ======================================================================== */

  initCardContextMenu() {
    if (!this.cardContextMenu) return;

    this.cardContextMenu.querySelectorAll('.menu-action-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const card = this.activeContextCard;
        if (!card) {
          this.closeCardContextMenu();
          return;
        }

        const data = this.findCardAndSection(card.id);
        const section = data ? data.section : null;

        this.closeCardContextMenu();

        switch (action) {
          case 'open-post':
            this.openCardDetailModal(card.id);
            break;

          case 'open-new-tab':
            window.open(window.location.href, '_blank');
            this.showToast('Opened post in new tab');
            break;

          case 'copy-link':
            navigator.clipboard?.writeText(`${window.location.href.split('#')[0]}#${card.id}`);
            this.showToast('Post link copied to clipboard!');
            break;

          case 'start-slideshow':
            this.showToast(`Starting slideshow from "${card.title || 'post'}"`);
            break;

          case 'edit-post':
            this.editPost(card.id);
            break;

          case 'add-post-before': {
            if (section) {
              this.openComposer(section.id);
              this.showToast(`Adding post before "${card.title || 'post'}"`);
            }
            break;
          }

          case 'add-post-after': {
            if (section) {
              this.openComposer(section.id);
              this.showToast(`Adding post after "${card.title || 'post'}"`);
            }
            break;
          }

          case 'duplicate-post': {
            if (section) {
              const cardIdx = section.cards.findIndex(c => c.id === card.id);
              const clone = JSON.parse(JSON.stringify(card));
              clone.id = 'card-' + Date.now();
              clone.title = (clone.title || 'Post') + ' (Copy)';
              clone.pinned = false;
              clone.reactions = 0;
              clone.hasReacted = false;
              section.cards.splice(cardIdx + 1, 0, clone);
              this.saveState();
              this.renderBoard();
              this.showToast('Post duplicated!');
              if (this.backend && this.backend.isConnected) {
                this.backend.createPost(clone, section.id);
              }
            }
            break;
          }

          case 'copy-to-another':
            this.showToast('Copied post to clipboard!');
            break;

          case 'transfer-to-another':
            this.showToast('Transfer dialog ready');
            break;

          case 'toggle-pin': {
            card.pinned = !card.pinned;
            this.saveState();
            this.renderBoard();
            this.showToast(card.pinned ? 'Post pinned to top' : 'Post unpinned');
            if (this.backend && this.backend.isConnected) {
              this.backend.updatePost(card);
            }
            break;
          }

          case 'delete-post': {
            if (section) {
              section.cards = section.cards.filter(c => c.id !== card.id);
              this.saveState();
              this.renderBoard();
              this.showToast('Post deleted');
              if (this.backend && this.backend.isConnected) {
                this.backend.deletePost(card.id);
              }
            }
            break;
          }
        }
      });
    });
  }

  openCardContextMenu(card, targetEl, mouseEvent = null) {
    this.closeAllPopovers();
    this.activeContextCard = card;
    if (!this.cardContextMenu) return;

    this.renderCardMenuColors(card);

    if (this.pinActionLabel) {
      this.pinActionLabel.textContent = card.pinned ? 'Unpin post' : 'Pin post';
    }

    const menuWidth = 256;
    this.cardContextMenu.style.visibility = 'hidden';
    this.cardContextMenu.hidden = false;
    const menuHeight = this.cardContextMenu.offsetHeight || 440;
    this.cardContextMenu.style.visibility = 'visible';

    let left, top;
    if (mouseEvent && typeof mouseEvent.clientX === 'number') {
      left = mouseEvent.clientX;
      top = mouseEvent.clientY;
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - menuWidth - 12);
      }
      if (top + menuHeight > window.innerHeight - 12) {
        top = Math.max(12, mouseEvent.clientY - menuHeight);
      }
    } else if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      left = rect.right - menuWidth;
      if (left < 12) left = 12;
      if (left + menuWidth > window.innerWidth - 12) {
        left = window.innerWidth - menuWidth - 12;
      }
      top = rect.bottom + 6;
      if (top + menuHeight > window.innerHeight - 12) {
        const topAbove = rect.top - menuHeight - 6;
        if (topAbove >= 12 && topAbove + menuHeight <= window.innerHeight - 12) {
          top = topAbove;
        } else {
          top = Math.max(12, window.innerHeight - menuHeight - 12);
        }
      }
    } else {
      left = 12;
      top = 12;
    }

    left = Math.max(12, Math.min(left, window.innerWidth - menuWidth - 12));
    top = Math.max(12, Math.min(top, window.innerHeight - menuHeight - 12));

    this.cardContextMenu.style.top = `${top}px`;
    this.cardContextMenu.style.left = `${left}px`;
  }

  closeCardContextMenu() {
    if (this.cardContextMenu) {
      this.cardContextMenu.hidden = true;
    }
    this.activeContextCard = null;
  }

  renderCardMenuColors(card) {
    if (!this.cardMenuColorRow) return;
    this.cardMenuColorRow.innerHTML = '';

    const activeColor = card.color || 'white';

    PALETTES.forEach(pal => {
      const circle = document.createElement('button');
      circle.type = 'button';
      circle.className = `menu-color-circle ${pal.id === activeColor ? 'is-active' : ''}`;
      circle.style.backgroundColor = pal.dot;
      circle.title = pal.name;
      circle.setAttribute('aria-label', `Color ${pal.name}`);

      if (pal.id === 'white') {
        circle.style.border = '1.5px solid rgba(255, 255, 255, 0.4)';
      }

      if (pal.id === activeColor) {
        circle.innerHTML = `
          <svg viewBox="0 0 24 24" width="12" height="12" fill="${pal.id === 'white' ? '#111' : '#111'}">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        `;
      }

      circle.addEventListener('click', (e) => {
        e.stopPropagation();
        card.color = pal.id;
        this.saveState();
        this.renderBoard();
        this.renderCardMenuColors(card);
        this.showToast(`Post color set to ${pal.name}`);

        if (this.backend && this.backend.isConnected) {
          this.backend.updatePost(card);
        }
      });

      this.cardMenuColorRow.appendChild(circle);
    });
  }

  /* ========================================================================
     Post Detail / Expanded Theater View Modal (Padlet Authentic Fullscreen)
     ======================================================================== */

  initCardDetailModal() {
    if (!this.cardDetailModal) return;

    if (this.closeDetailModalBtn) {
      this.closeDetailModalBtn.addEventListener('click', () => this.closeCardDetailModal());
    }

    this.cardDetailModal.addEventListener('click', (e) => {
      if (e.target === this.cardDetailModal) {
        this.closeCardDetailModal();
      }
    });

    if (this.detailReactionBtn) {
      this.detailReactionBtn.addEventListener('click', () => {
        const card = this.findCardById(this.activeDetailCardId);
        if (!card) return;
        card.hasReacted = !card.hasReacted;
        card.reactions = (card.reactions || 0) + (card.hasReacted ? 1 : -1);
        this.detailReactionBtn.classList.toggle('has-reacted', card.hasReacted);
        if (this.detailReactionCount) {
          this.detailReactionCount.textContent = card.reactions > 0 ? card.reactions : '+';
        }
        this.saveState();
        this.renderBoard();
        this.showToast(card.hasReacted ? 'Reaction added' : 'Reaction removed');

        if (this.backend && this.backend.isConnected && card.hasReacted) {
          this.backend.addReaction(card.id);
        }
      });
    }

    if (this.detailCommentForm) {
      this.detailCommentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.detailCommentInput ? this.detailCommentInput.value.trim() : '';
        if (!text) return;
        const card = this.findCardById(this.activeDetailCardId);
        if (!card) return;

        if (!card.comments) card.comments = [];
        card.comments.push({
          id: 'comment-' + Date.now(),
          author: 'You',
          text: text,
          timestamp: 'Just now'
        });

        if (this.detailCommentInput) this.detailCommentInput.value = '';
        this.saveState();
        this.renderDetailComments(card);
        this.showToast('Comment added!');

        if (this.backend && this.backend.isConnected) {
          this.backend.addComment(card.id, 'Salman Madani', text);
        }
      });
    }

    if (this.detailNextBtn) {
      this.detailNextBtn.addEventListener('click', () => this.navigateDetailModal(1));
    }

    if (this.detailPrevBtn) {
      this.detailPrevBtn.addEventListener('click', () => this.navigateDetailModal(-1));
    }
  }

  openCardDetailModal(cardId) {
    const data = this.findCardAndSection(cardId);
    if (!data) return;
    const { card, section } = data;

    this.activeDetailCardId = card.id;

    if (this.detailSectionTitle) this.detailSectionTitle.textContent = section.title;
    if (this.detailPostSubject) this.detailPostSubject.textContent = card.title || 'Untitled Post';

    if (this.detailMediaCanvas) {
      this.detailMediaCanvas.innerHTML = '';
      if (card.type === 'video' && card.attachment) {
        this.detailMediaCanvas.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;max-width:85%;">
            <img src="${card.attachment.thumbnailUrl}" style="border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,0.7);max-height:65vh;" alt="${this.escapeHtml(card.attachment.caption)}" />
            <a href="${card.attachment.videoUrl || 'https://youtube.com'}" target="_blank" class="detail-reaction-btn" style="background:#ff0000;color:#fff;text-decoration:none;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              Watch on YouTube
            </a>
          </div>
        `;
      } else if (card.type === 'link' && card.attachment) {
        this.detailMediaCanvas.innerHTML = `
          <div class="detail-text-presentation">
            <img src="${card.attachment.thumbnailUrl}" style="width:100%;border-radius:12px;margin-bottom:16px;" alt="${this.escapeHtml(card.attachment.title)}" />
            <h3>${this.escapeHtml(card.attachment.title)}</h3>
            <p style="color:rgba(255,255,255,0.7);margin-top:8px;">${this.escapeHtml(card.attachment.domain)}</p>
          </div>
        `;
      } else if (card.attachment && card.attachment.thumbnailUrl) {
        this.detailMediaCanvas.innerHTML = `
          <img src="${card.attachment.thumbnailUrl}" alt="Media attachment" />
        `;
      } else {
        let bodyHtml = '';
        if (card.content) {
          if (card.content.intro) bodyHtml += `<p style="margin-bottom:12px;">${card.content.intro}</p>`;
          if (card.content.body) bodyHtml += `<p style="margin-bottom:12px;">${card.content.body}</p>`;
          if (card.content.bullets) {
            bodyHtml += `<ul style="padding-left:20px;display:flex;flex-direction:column;gap:8px;">${card.content.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
          }
        }
        this.detailMediaCanvas.innerHTML = `
          <div class="detail-text-presentation">
            <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:16px;">${this.escapeHtml(card.title || '')}</h2>
            <div>${bodyHtml || '<p>No additional content</p>'}</div>
          </div>
        `;
      }
    }

    if (this.detailPostBody) {
      let sidebarBody = '';
      if (card.content) {
        if (card.content.intro) sidebarBody += `<p>${card.content.intro}</p>`;
        if (card.content.body) sidebarBody += `<p>${card.content.body}</p>`;
        if (card.content.bullets) {
          sidebarBody += `<ul>${card.content.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
        }
      } else if (card.attachment && card.attachment.caption) {
        sidebarBody = `<p>${this.escapeHtml(card.attachment.caption)}</p>`;
      }
      this.detailPostBody.innerHTML = sidebarBody || '<p style="color:rgba(255,255,255,0.5);">No description</p>';
    }

    if (this.detailCustomFieldsBox) {
      this.detailCustomFieldsBox.innerHTML = '';
      if (card.customFieldValues && Object.keys(card.customFieldValues).length > 0) {
        for (const [cfId, val] of Object.entries(card.customFieldValues)) {
          if (val !== undefined && val !== null && val !== '') {
            const fieldDef = (this.state.customFields || []).find(f => f.id === cfId);
            const fieldName = fieldDef ? fieldDef.name : 'Field';
            let displayVal = val;
            if (fieldDef && fieldDef.type === 'rating') {
              const num = Math.min(10, Math.max(1, parseInt(val, 10) || 0));
              displayVal = '★'.repeat(num);
            }
            const chip = document.createElement('div');
            chip.className = 'card-cf-chip';
            chip.style.margin = '4px 0';
            chip.innerHTML = `<strong>${this.escapeHtml(fieldName)}:</strong> ${this.escapeHtml(String(displayVal))}`;
            this.detailCustomFieldsBox.appendChild(chip);
          }
        }
      }
    }

    if (this.detailReactionBtn) {
      this.detailReactionBtn.classList.toggle('has-reacted', !!card.hasReacted);
    }
    if (this.detailReactionCount) {
      this.detailReactionCount.textContent = card.reactions > 0 ? card.reactions : '+';
    }

    this.renderDetailComments(card);

    const allCards = this.getAllCards();
    const currentIdx = allCards.findIndex(item => item.card.id === card.id);
    if (this.detailCurrentNum) this.detailCurrentNum.textContent = currentIdx >= 0 ? currentIdx + 1 : 1;
    if (this.detailTotalNum) this.detailTotalNum.textContent = allCards.length;

    this.cardDetailModal.hidden = false;
  }

  closeCardDetailModal() {
    if (this.cardDetailModal) {
      this.cardDetailModal.hidden = true;
    }
    if (this.detailMediaCanvas) {
      this.detailMediaCanvas.innerHTML = '';
    }
    this.activeDetailCardId = null;
  }

  renderDetailComments(card) {
    if (!this.detailCommentsList) return;
    this.detailCommentsList.innerHTML = '';

    const comments = card.comments || [];
    if (comments.length === 0) {
      this.detailCommentsList.innerHTML = '<div style="font-size:0.8rem;color:rgba(255,255,255,0.4);font-style:italic;">No comments yet. Be the first to comment!</div>';
      return;
    }

    comments.forEach(c => {
      const bubble = document.createElement('div');
      bubble.className = 'detail-comment-bubble';
      bubble.innerHTML = `
        <div class="detail-comment-author">${this.escapeHtml(c.author || 'User')} <span style="font-weight:400;color:rgba(255,255,255,0.4);margin-left:6px;font-size:0.7rem;">${c.timestamp || ''}</span></div>
        <div class="detail-comment-text">${this.escapeHtml(c.text)}</div>
      `;
      this.detailCommentsList.appendChild(bubble);
    });

    this.detailCommentsList.scrollTop = this.detailCommentsList.scrollHeight;
  }

  navigateDetailModal(direction) {
    const allCards = this.getAllCards();
    if (allCards.length === 0) return;

    let idx = allCards.findIndex(item => item.card.id === this.activeDetailCardId);
    if (idx === -1) idx = 0;

    let nextIdx = idx + direction;
    if (nextIdx < 0) nextIdx = allCards.length - 1;
    if (nextIdx >= allCards.length) nextIdx = 0;

    this.openCardDetailModal(allCards[nextIdx].card.id);
  }

  getAllCards() {
    const list = [];
    this.state.sections.forEach(s => {
      s.cards.forEach(c => list.push({ card: c, section: s }));
    });
    return list;
  }

  findCardAndSection(cardId) {
    for (const section of this.state.sections) {
      const card = section.cards.find(c => c.id === cardId);
      if (card) return { card, section };
    }
    return null;
  }

  findCardById(cardId) {
    const data = this.findCardAndSection(cardId);
    return data ? data.card : null;
  }

  /* ========================================================================
     Schedule Post Modal (Blueprint Section 5.2)
     ======================================================================== */

  initScheduleModal() {
    if (!this.schedulePostModal) return;

    if (this.schedulePostBtn) {
      this.schedulePostBtn.addEventListener('click', () => this.openScheduleModal());
    }
    if (this.closeScheduleBtn) {
      this.closeScheduleBtn.addEventListener('click', () => this.closeScheduleModal());
    }
    if (this.cancelScheduleBtn) {
      this.cancelScheduleBtn.addEventListener('click', () => this.closeScheduleModal());
    }
    if (this.confirmScheduleBtn) {
      this.confirmScheduleBtn.addEventListener('click', () => this.confirmSchedule());
    }

    this.schedulePostModal.addEventListener('click', (e) => {
      if (e.target === this.schedulePostModal) {
        this.closeScheduleModal();
      }
    });
  }

  openScheduleModal() {
    this.closeAllPopovers();
    if (!this.schedulePostModal) return;

    const now = new Date();
    now.setHours(now.getHours() + 1);
    const pad = (n) => String(n).padStart(2, '0');
    const isoLocal = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    if (this.scheduleDateTimeInput) {
      this.scheduleDateTimeInput.value = isoLocal;
    }
    if (this.scheduleTimezoneText) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.scheduleTimezoneText.textContent = `Timezone: ${tz}`;
      } catch {
        this.scheduleTimezoneText.textContent = 'Timezone: Local time';
      }
    }
    this.schedulePostModal.hidden = false;
  }

  closeScheduleModal() {
    if (this.schedulePostModal) {
      this.schedulePostModal.hidden = true;
    }
  }

  confirmSchedule() {
    const val = this.scheduleDateTimeInput ? this.scheduleDateTimeInput.value : null;
    if (!val) {
      alert('Please select a valid date and time.');
      return;
    }
    const d = new Date(val);
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(dr => dr.id === this.activeDraftId);
      if (draft) {
        draft.scheduledAt = val;
        this.saveState();
      }
    }
    this.closeScheduleModal();
    this.showToast(`Post scheduled for ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }

  /* ========================================================================
     All Tools Modal (Blueprint Section 5.1: 21 Built-In Tools)
     ======================================================================== */

  initAllToolsModal() {
    if (!this.allToolsModal) return;

    if (this.closeAllToolsBtn) {
      this.closeAllToolsBtn.addEventListener('click', () => this.closeAllToolsModal());
    }

    this.allToolsModal.addEventListener('click', (e) => {
      if (e.target === this.allToolsModal) {
        this.closeAllToolsModal();
      }
    });

    if (this.allToolsSearchInput) {
      this.allToolsSearchInput.addEventListener('input', (e) => {
        this.renderAllToolsGrid(e.target.value.trim());
      });
    }

    this.renderAllToolsGrid();
  }

  openAllToolsModal() {
    this.closeAllPopovers();
    if (!this.allToolsModal) return;
    if (this.allToolsSearchInput) {
      this.allToolsSearchInput.value = '';
    }
    this.renderAllToolsGrid();
    this.allToolsModal.hidden = false;
    setTimeout(() => this.allToolsSearchInput?.focus(), 50);
  }

  closeAllToolsModal() {
    if (this.allToolsModal) {
      this.allToolsModal.hidden = true;
    }
  }

  renderAllToolsGrid(filter = '') {
    if (!this.allToolsGrid) return;
    this.allToolsGrid.innerHTML = '';
    const q = filter.toLowerCase();

    const filtered = ALL_TOOLS.filter(t => !q || t.name.toLowerCase().includes(q));

    filtered.forEach(tool => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'tool-grid-tile';
      tile.dataset.toolId = tool.id;
      tile.innerHTML = `
        <div class="tool-grid-icon-wrap">${tool.icon}</div>
        <div class="tool-grid-info">
          <span class="tool-grid-label">${this.escapeHtml(tool.name)}</span>
          ${tool.isNew ? '<span class="tool-badge-new">New</span>' : ''}
        </div>
      `;

      tile.addEventListener('click', () => {
        this.closeAllToolsModal();
        this.triggerToolAction(tool.id);
      });

      this.allToolsGrid.appendChild(tile);
    });
  }

  triggerToolAction(toolId) {
    switch (toolId) {
      case 'padles':
      case 'padlet':
        this.composerState.attachment = {
          type: 'padles',
          provider: 'Padles Board',
          title: 'Quantum Mechanics Lab — Padles',
          domain: 'padles.com',
          thumbnailUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Padles board linked!');
        break;
      case 'upload':
        this.handleToolAction('upload');
        break;
      case 'camera':
        this.handleToolAction('camera');
        break;
      case 'video':
        this.composerState.attachment = {
          type: 'video',
          provider: 'Video Recorder',
          title: 'Physics Lab Experiment Video (0:45)',
          thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Video recording attached!');
        break;
      case 'audio':
        this.composerState.attachment = {
          type: 'audio',
          provider: 'Audio Recorder',
          title: 'Voice Reflection Memo (1:20)',
          thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Audio recording attached!');
        break;
      case 'screen':
        this.composerState.attachment = {
          type: 'video',
          provider: 'Screen Recorder',
          title: 'Screen Demo: Kinetic Energy Simulation (2:15)',
          thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Screen recording attached!');
        break;
      case 'ai-image':
      case 'arcade':
        this.handleToolAction('ai');
        break;
      case 'ai-speech':
        this.composerState.attachment = {
          type: 'audio',
          provider: 'AI Speech',
          title: 'Voice: "Welcome to Quantum Mechanics Lab"',
          domain: 'padles.ai',
          thumbnailUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('AI speech generated & attached!');
        break;
      case 'album':
        this.composerState.attachment = {
          type: 'album',
          provider: 'Photo Album',
          title: 'Lab Gallery (4 photos)',
          thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Photo album attached!');
        break;
      case 'link':
        this.handleToolAction('link');
        break;
      case 'youtube':
        this.openSearchModal('video');
        break;
      case 'image-search':
      case 'gif':
      case 'web-search':
        this.openSearchModal('all');
        break;
      case 'draw':
        this.composerState.attachment = {
          type: 'drawing',
          provider: 'Canvas Draw',
          title: 'Freehand Sketch Drawing',
          thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Drawing canvas attached!');
        break;
      case 'poll':
        this.composerState.attachment = {
          type: 'poll',
          provider: 'Padles Poll',
          title: 'Interactive Poll: What do you see, think, and wonder?',
          thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Interactive Poll created!');
        break;
      case 'spotify':
        this.composerState.attachment = {
          type: 'audio',
          provider: 'Spotify',
          title: 'Physics Podcast: Audio Reflections Episode',
          thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Spotify track attached!');
        break;
      case 'location':
        this.composerState.attachment = {
          type: 'location',
          provider: 'Maps',
          title: 'MIT Physics Lab, Cambridge, MA',
          thumbnailUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Location pin attached!');
        break;
      case 'gdrive':
      case 'onedrive':
        this.composerState.attachment = {
          type: 'file',
          provider: toolId === 'gdrive' ? 'Google Drive' : 'OneDrive',
          title: 'Physics_Reflections_Handout.pdf',
          thumbnailUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast(`${toolId === 'gdrive' ? 'Google Drive' : 'OneDrive'} file linked!`);
        break;
      default:
        this.showToast(`${toolId.replace('-', ' ')} tool ready`);
        break;
    }
  }

  /* ========================================================================
     Custom Field Schema Builder (Blueprint Section 6.2)
     ======================================================================== */

  initCustomFieldBuilder() {
    if (!this.customFieldBuilderModal) return;

    if (this.backCustomFieldBtn) {
      this.backCustomFieldBtn.addEventListener('click', () => {
        this.closeCustomFieldBuilder();
        this.openPostFieldsModal();
      });
    }

    if (this.closeCustomFieldModalBtn) {
      this.closeCustomFieldModalBtn.addEventListener('click', () => this.closeCustomFieldBuilder());
    }

    if (this.cancelCustomFieldBtn) {
      this.cancelCustomFieldBtn.addEventListener('click', () => this.closeCustomFieldBuilder());
    }

    if (this.customFieldTypeSelect) {
      this.customFieldTypeSelect.addEventListener('change', () => this.renderCustomFieldTypeOptions());
    }

    if (this.saveCustomFieldBtn) {
      this.saveCustomFieldBtn.addEventListener('click', () => this.saveCustomField());
    }

    this.customFieldBuilderModal.addEventListener('click', (e) => {
      if (e.target === this.customFieldBuilderModal) {
        this.closeCustomFieldBuilder();
      }
    });

    this.renderCustomFieldsList();
  }

  openCustomFieldBuilder() {
    if (this.postFieldsModal) this.postFieldsModal.hidden = true;
    if (!this.customFieldBuilderModal) return;

    if (this.customFieldNameInput) this.customFieldNameInput.value = '';
    if (this.customFieldTypeSelect) this.customFieldTypeSelect.value = 'rating';
    if (this.customFieldRequiredToggle) this.customFieldRequiredToggle.checked = false;

    this.renderCustomFieldTypeOptions();
    this.customFieldBuilderModal.hidden = false;
    setTimeout(() => this.customFieldNameInput?.focus(), 50);
  }

  closeCustomFieldBuilder() {
    if (this.customFieldBuilderModal) {
      this.customFieldBuilderModal.hidden = true;
    }
  }

  renderCustomFieldTypeOptions() {
    if (!this.customFieldTypeOptions || !this.customFieldTypeSelect) return;
    const type = this.customFieldTypeSelect.value;
    let html = '';

    switch (type) {
      case 'rating':
        html = `
          <label class="builder-label">Maximum rating stars</label>
          <select id="cfOptMaxRating" class="builder-select">
            <option value="5" selected>5 Stars (★★★★★)</option>
            <option value="10">10 Stars</option>
          </select>
        `;
        break;
      case 'score':
        html = `
          <label class="builder-label">Maximum score scale</label>
          <input type="number" id="cfOptMaxScore" class="builder-input" value="100" min="10" max="1000" />
        `;
        break;
      case 'vote':
        html = `
          <label class="builder-label">Vote configuration</label>
          <select id="cfOptVoteType" class="builder-select">
            <option value="updown" selected>Upvote / downvote</option>
            <option value="uponly">Upvote only</option>
          </select>
        `;
        break;
      case 'select':
        html = `
          <label class="builder-label">Options (comma-separated)</label>
          <input type="text" id="cfOptChoices" class="builder-input" placeholder="Draft, Review, Final" value="Active, In Progress, Completed" />
        `;
        break;
      case 'date':
        html = `
          <label class="builder-label">Display formatting</label>
          <select id="cfOptDateFormat" class="builder-select">
            <option value="friendly" selected>Friendly (Oct 12, 2026)</option>
            <option value="standard">MM/DD/YYYY</option>
            <option value="iso">ISO (YYYY-MM-DD)</option>
          </select>
        `;
        break;
      default:
        html = `<div style="font-size: 12px; color: rgba(255,255,255,0.5);">Standard ${type} field with validation</div>`;
        break;
    }

    this.customFieldTypeOptions.innerHTML = html;
  }

  saveCustomField() {
    const name = this.customFieldNameInput ? this.customFieldNameInput.value.trim() : '';
    if (!name) {
      alert('Please enter a field name.');
      return;
    }

    const type = this.customFieldTypeSelect ? this.customFieldTypeSelect.value : 'text';
    const required = this.customFieldRequiredToggle ? this.customFieldRequiredToggle.checked : false;
    const options = {};

    if (type === 'rating') {
      const el = document.getElementById('cfOptMaxRating');
      options.maxRating = el ? parseInt(el.value, 10) : 5;
    } else if (type === 'score') {
      const el = document.getElementById('cfOptMaxScore');
      options.maxScore = el ? parseInt(el.value, 10) : 100;
    } else if (type === 'select') {
      const el = document.getElementById('cfOptChoices');
      options.choices = el ? el.value.split(',').map(s => s.trim()).filter(Boolean) : [];
    }

    const newField = {
      id: 'cf-' + Date.now(),
      name,
      type,
      required,
      options
    };

    if (!this.state.customFields) this.state.customFields = [];
    this.state.customFields.push(newField);
    this.saveState();

    this.closeCustomFieldBuilder();
    this.openPostFieldsModal();
    this.renderCustomFieldsList();
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) this.renderComposerCustomFields(draft);
    }
    this.showToast(`Custom field "${name}" created!`);
  }

  deleteCustomField(fieldId) {
    this.state.customFields = (this.state.customFields || []).filter(f => f.id !== fieldId);
    this.saveState();
    this.renderCustomFieldsList();
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) this.renderComposerCustomFields(draft);
    }
    this.renderBoard();
    this.showToast('Custom field removed');
  }

  renderCustomFieldsList() {
    if (!this.customFieldsList) return;
    this.customFieldsList.innerHTML = '';
    const fields = this.state.customFields || [];

    if (fields.length === 0) {
      this.customFieldsList.innerHTML = '<div style="font-size: 13px; color: rgba(255,255,255,0.4); padding: 4px 0 8px 4px;">No custom fields created yet.</div>';
      return;
    }

    fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'field-item-row custom-field-row';
      row.innerHTML = `
        <div class="custom-field-row-left">
          <span class="field-label">${this.escapeHtml(f.name)}</span>
          <span class="custom-field-type-badge">${this.escapeHtml(f.type)}</span>
        </div>
        <button type="button" class="custom-field-del-btn" title="Delete custom field">&times;</button>
      `;

      row.querySelector('.custom-field-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteCustomField(f.id);
      });

      this.customFieldsList.appendChild(row);
    });
  }

  renderComposerCustomFields(draft) {
    if (!this.composerCustomFieldsArea) return;
    this.composerCustomFieldsArea.innerHTML = '';
    const fields = this.state.customFields || [];
    if (fields.length === 0) return;

    const values = draft?.customFieldValues || {};

    fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'composer-cf-row';
      const curVal = values[f.id] !== undefined ? values[f.id] : '';

      let inputHtml = '';
      if (f.type === 'select') {
        const choices = f.options?.choices || ['Option 1', 'Option 2'];
        inputHtml = `
          <select class="composer-cf-input" data-cf-id="${f.id}">
            <option value="">-- Select ${this.escapeHtml(f.name)} --</option>
            ${choices.map(c => `<option value="${this.escapeHtml(c)}" ${curVal === c ? 'selected' : ''}>${this.escapeHtml(c)}</option>`).join('')}
          </select>
        `;
      } else if (f.type === 'rating') {
        const max = f.options?.maxRating || 5;
        inputHtml = `
          <select class="composer-cf-input" data-cf-id="${f.id}">
            <option value="">-- Rate (Stars) --</option>
            ${Array.from({ length: max }, (_, i) => i + 1).map(n => `<option value="${n}" ${String(curVal) === String(n) ? 'selected' : ''}>${'★'.repeat(n)} (${n}/${max})</option>`).join('')}
          </select>
        `;
      } else if (f.type === 'date') {
        inputHtml = `<input type="date" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" />`;
      } else if (f.type === 'score' || f.type === 'number') {
        inputHtml = `<input type="number" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" placeholder="Enter ${this.escapeHtml(f.name)}..." />`;
      } else {
        inputHtml = `<input type="text" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" placeholder="Enter ${this.escapeHtml(f.name)}..." />`;
      }

      row.innerHTML = `
        <label class="composer-cf-label">${this.escapeHtml(f.name)}${f.required ? ' *' : ''}</label>
        ${inputHtml}
      `;

      row.querySelector('[data-cf-id]').addEventListener('input', () => {
        this.syncActiveDraftFromInputs();
      });

      this.composerCustomFieldsArea.appendChild(row);
    });
  }

  updateAttachmentPreviewUI() {
    const att = this.composerState.attachment;
    if (att) {
      const isVideo = att.provider === 'YouTube' || att.category === 'YouTube' || att.type === 'video';
      const hasThumb = !!att.thumbnailUrl;

      let frameHtml = '';
      if (hasThumb) {
        frameHtml = `
          <div class="composer-attachment-media-frame">
            <img src="${this.escapeHtml(att.thumbnailUrl)}" class="composer-attachment-media-thumb" alt="${this.escapeHtml(att.title || att.caption || 'Attachment')}" />
            ${isVideo ? `
              <div class="composer-media-play-btn">
                <svg viewBox="0 0 32 32" height="20" width="20" fill="currentColor"><path d="M7 23.54V8.46c0-2.017 2.152-3.304 3.929-2.349l14.033 7.54c1.873 1.006 1.873 3.692 0 4.698l-14.033 7.54C9.152 26.844 7 25.557 7 23.54"/></svg>
              </div>
              <div class="composer-media-category-badge">${this.escapeHtml(att.provider || att.category || 'YouTube')}</div>
            ` : ''}
            <button type="button" class="remove-attachment-btn" id="removeAttachmentBtn" title="Remove attachment" aria-label="Remove attachment">&times;</button>
          </div>
        `;
      }

      const metaHtml = `
        <div class="attachment-preview-badge">
          <span id="previewTypeBadge">${this.escapeHtml(att.provider || att.category || att.type || 'Media')}</span>
          <span id="previewTitleText">${this.escapeHtml(att.title || att.caption || 'Attachment attached')}</span>
          ${!hasThumb ? `<button type="button" class="remove-attachment-btn" id="removeAttachmentBtn" title="Remove attachment" aria-label="Remove attachment">&times;</button>` : ''}
        </div>
      `;

      if (this.activeAttachmentPreview) {
        this.activeAttachmentPreview.innerHTML = frameHtml + metaHtml;
        this.activeAttachmentPreview.hidden = false;
        this.activeAttachmentPreview.style.display = 'flex';

        // Rebind remove button click
        const rmBtn = this.activeAttachmentPreview.querySelector('#removeAttachmentBtn');
        if (rmBtn) {
          rmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.composerState.attachment = null;
            if (this.activeDraftId) {
              const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
              if (draft) draft.attachment = null;
            }
            if (this.editingCardId) {
              const card = this.findCardById(this.editingCardId);
              if (card) {
                card.attachment = null;
                card.type = 'text';
              }
            }
            this.updateAttachmentPreviewUI();
            this.syncActiveDraftFromInputs();
            this.saveState();
          });
        }
      }
    } else {
      if (this.activeAttachmentPreview) {
        this.activeAttachmentPreview.innerHTML = '';
        this.activeAttachmentPreview.hidden = true;
        this.activeAttachmentPreview.style.display = 'none';
      }
    }
    this.updatePublishButtonState();
  }

  publishPost() {
    this.publishActiveDraft();
  }

  /* ========================================================================
     Attachment Multi-Tool Toolbar & Hover Interactions
     ======================================================================== */

  initAttachmentToolbar() {
    const cols = document.querySelectorAll('.tool-strip-col');
    const promptTick = document.getElementById('promptBarTick');
    const promptText = document.getElementById('promptBarText');
    const promptShortcut = document.getElementById('promptBarShortcut');

    cols.forEach(col => {
      col.addEventListener('mouseenter', () => {
        const title = col.dataset.title || '';
        const desc = col.dataset.desc || '';
        const shortcut = col.dataset.shortcut || '';

        const TOOL_TEXT_COLORS = {
          upload: '#e11d48',
          camera: '#0284c7',
          ai: '#7c3aed',
          link: '#059669',
          search: '#d97706',
          all: '#4f46e5'
        };
        const activeColor = TOOL_TEXT_COLORS[col.dataset.tool] || '#7c3aed';

        if (promptTick) promptTick.classList.add('is-visible');
        if (promptText) {
          promptText.innerHTML = `<strong style="color: ${activeColor}; font-weight: 700;">${this.escapeHtml(title)}</strong> <span style="color: rgba(255, 255, 255, 0.65); margin-left: 4px;">${this.escapeHtml(desc)}</span>`;
        }
        if (promptShortcut) {
          promptShortcut.textContent = shortcut;
        }
      });

      col.addEventListener('mouseleave', () => {
        if (promptTick) promptTick.classList.remove('is-visible');
        if (promptText) {
          promptText.innerHTML = 'Add an image, video, audio, link, or file.';
        }
        if (promptShortcut) {
          promptShortcut.textContent = '';
        }
      });

      col.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = col.dataset.tool;
        this.handleToolAction(tool);
      });
    });

    // Keyboard Shortcuts: Ctrl+1 through Ctrl+6
    window.addEventListener('keydown', (e) => {
      if (this.activeDraftId && (e.ctrlKey || e.metaKey)) {
        if (e.key === '1') { e.preventDefault(); this.handleToolAction('upload'); }
        else if (e.key === '2') { e.preventDefault(); this.handleToolAction('camera'); }
        else if (e.key === '3') { e.preventDefault(); this.handleToolAction('ai'); }
        else if (e.key === '4') { e.preventDefault(); this.handleToolAction('link'); }
        else if (e.key === '5') { e.preventDefault(); this.handleToolAction('search'); }
        else if (e.key === '6') { e.preventDefault(); this.handleToolAction('all'); }
      }
    });
  }

  handleToolAction(tool) {
    if (tool === 'upload') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const isImg = file.type.startsWith('image/');
          const fileUrl = URL.createObjectURL(file);
          this.composerState.attachment = {
            type: isImg ? 'image' : 'file',
            provider: 'Upload',
            title: file.name,
            thumbnailUrl: isImg ? fileUrl : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
            url: fileUrl
          };
          this.updateAttachmentPreviewUI();
          this.showToast(`Uploaded ${file.name}`);
        }
      };
      input.click();
    } else if (tool === 'camera') {
      this.composerState.attachment = {
        type: 'image',
        provider: 'Camera',
        title: 'Camera Snapshot',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'
      };
      this.updateAttachmentPreviewUI();
      this.showToast('Camera photo captured!');
    } else if (tool === 'ai') {
      const promptText = prompt('Describe what you want AI to draw:', 'Quantum particles colliding in space');
      if (promptText) {
        this.composerState.attachment = {
          type: 'image',
          provider: 'AI Generated',
          title: promptText,
          domain: 'padles.ai',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('AI artwork created & attached!');
      }
    } else if (tool === 'link') {
      const url = prompt('Enter website URL:', 'https://');
      if (url && url.length > 8) {
        try {
          const domain = new URL(url).hostname;
          this.composerState.attachment = {
            type: 'link',
            provider: domain,
            domain: domain,
            title: url,
            thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
            url: url
          };
          this.updateAttachmentPreviewUI();
          this.showToast('Link attached!');
        } catch {
          alert('Invalid URL format');
        }
      }
    } else if (tool === 'search') {
      this.openSearchModal('all');
    } else if (tool === 'all') {
      this.openAllToolsModal();
    }
  }

  /* ========================================================================
     Search & Multi-Tool Attachment Modal
     ======================================================================== */

  openSearchModal(toolType) {
    this.searchAttachmentModal.hidden = false;
    this.searchAttachmentModal.classList.add('is-open');
    this.mediaQueryInput.value = '';
    this.mediaSearchResults.innerHTML = '';
    this.mediaQueryInput.placeholder = toolType === 'video' ? 'Search YouTube videos...' : 'Search web or images...';
    this.mediaQueryInput.focus();

    // Default suggestions
    this.performMediaSearch('physics');
  }

  closeSearchModal() {
    this.searchAttachmentModal.hidden = true;
    this.searchAttachmentModal.classList.remove('is-open');
  }

  async performMediaSearch(query) {
    this.mediaSearchResults.innerHTML = '<div style="grid-column: span 2; text-align: center; color: #888;">Searching...</div>';

    try {
      // Connect to the Padlet search API endpoint reverse-engineered earlier!
      const res = await fetch(`https://disco.padlet.com/api/1/images?q=${encodeURIComponent(query)}&locale=en-US`);
      const data = await res.json();
      const images = data?.data?.images || [];

      this.mediaSearchResults.innerHTML = '';

      if (images.length === 0) {
        this.mediaSearchResults.innerHTML = '<div style="grid-column: span 2; text-align: center; color: #888;">No results found.</div>';
        return;
      }

      images.slice(0, 8).forEach(img => {
        const item = document.createElement('div');
        item.className = 'media-result-item';
        item.innerHTML = `
          <img src="${img.thumbnail_url || img.url}" class="media-result-thumb" alt="${this.escapeHtml(img.title)}" />
          <div class="media-result-title">${this.escapeHtml(img.title)}</div>
        `;
        item.addEventListener('click', () => {
          this.composerState.attachment = {
            type: 'link',
            provider: img.provider_name || 'Web',
            title: img.title,
            thumbnailUrl: img.thumbnail_url || img.url,
            url: img.source_url || img.url,
            domain: new URL(img.source_url || img.url).hostname
          };
          this.updateAttachmentPreviewUI();
          this.closeSearchModal();
          this.showToast('Attachment added!');
        });
        this.mediaSearchResults.appendChild(item);
      });
    } catch (err) {
      // Offline fallback mock results
      this.mediaSearchResults.innerHTML = `
        <div class="media-result-item" onclick="app.attachMockVideo('Newton\\'s Cradle Demonstration')">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300" class="media-result-thumb" />
          <div class="media-result-title">Newton's Cradle Demonstration (YouTube)</div>
        </div>
        <div class="media-result-item" onclick="app.attachMockLink('Science Journal Research')">
          <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300" class="media-result-thumb" />
          <div class="media-result-title">Science Journal Article (Web)</div>
        </div>
      `;
    }
  }

  attachMockVideo(title) {
    this.composerState.attachment = {
      type: 'video',
      provider: 'YouTube',
      title: title,
      caption: title,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      videoUrl: 'https://youtube.com'
    };
    this.updateAttachmentPreviewUI();
    this.closeSearchModal();
    this.showToast('YouTube video attached!');
  }

  attachMockLink(title) {
    this.composerState.attachment = {
      type: 'link',
      provider: 'Web Link',
      title: title,
      domain: 'science.org',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
      url: 'https://science.org'
    };
    this.updateAttachmentPreviewUI();
    this.closeSearchModal();
    this.showToast('Web link attached!');
  }

  /* ========================================================================
     Global Event Listeners
     ======================================================================== */

  attachEventListeners() {
    // Backdrop click for Centered Edit Post Modal
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.addEventListener('click', (e) => {
        if (e.target === this.editPostModalOverlay) {
          this.cancelEditPost();
        }
      });
    }

    // Keyboard shortcuts (Escape to dismiss, Cmd/Ctrl+Enter to submit)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.editingCardId) {
          this.cancelEditPost();
          return;
        }
        this.closeComposer();
        this.closeSearchModal();
        this.searchOverlay.hidden = true;
        this.searchOverlay.classList.remove('is-open');
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (this.editingCardId) {
          e.preventDefault();
          this.saveEditedCard();
        } else if (this.activeDraftId && !this.publishBtn.disabled) {
          e.preventDefault();
          this.publishActiveDraft();
        }
      }
    });

    // Window actions for Post Composer
    document.getElementById('closeModalBtn')?.addEventListener('click', () => this.closeActiveDraft());
    document.getElementById('minimizeModalBtn')?.addEventListener('click', () => this.minimizeActiveDraft());
    document.getElementById('expandModalBtn')?.addEventListener('click', () => this.toggleComposerExpanded());
    document.getElementById('schedulePostBtn')?.addEventListener('click', () => this.openScheduleModal());
    document.getElementById('closeSubmodalBtn')?.addEventListener('click', () => this.closeSearchModal());

    // Drafts Bulk Action Dropdown
    this.dockBulkActionBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.draftsBulkMenu) this.draftsBulkMenu.hidden = !this.draftsBulkMenu.hidden;
    });

    this.bulkPublishAllBtn?.addEventListener('click', () => this.publishAllDrafts());
    this.bulkDeleteAllBtn?.addEventListener('click', () => this.deleteAllDrafts());

    document.addEventListener('click', (e) => {
      if (this.draftsBulkMenu && !this.draftsBulkMenu.hidden && this.dockBulkActionWrapper && !this.dockBulkActionWrapper.contains(e.target)) {
        this.draftsBulkMenu.hidden = true;
      }
      if (this.sectionContextMenu && !this.sectionContextMenu.hidden && !this.sectionContextMenu.contains(e.target)) {
        this.closeSectionContextMenu();
      }
    });

    this.searchAttachmentModal?.addEventListener('click', (e) => {
      if (e.target === this.searchAttachmentModal) this.closeSearchModal();
    });

    // Yellow "+ Post" button opens Composer
    const mainPostBtn = document.getElementById('mainPostBtn');
    if (mainPostBtn) {
      mainPostBtn.addEventListener('click', () => {
        this.createNewDraft(this.state.sections[0]?.id);
      });
      mainPostBtn.addEventListener('mousedown', () => mainPostBtn.classList.add('is-pressed'));
      mainPostBtn.addEventListener('mouseup', () => mainPostBtn.classList.remove('is-pressed'));
      mainPostBtn.addEventListener('mouseleave', () => mainPostBtn.classList.remove('is-pressed'));
      mainPostBtn.addEventListener('touchstart', () => mainPostBtn.classList.add('is-pressed'), { passive: true });
      mainPostBtn.addEventListener('touchend', () => mainPostBtn.classList.remove('is-pressed'), { passive: true });
      mainPostBtn.addEventListener('touchcancel', () => mainPostBtn.classList.remove('is-pressed'), { passive: true });
    }

    // Title & Body typing state for Publish button
    this.titleInput.addEventListener('input', () => this.updatePublishButtonState());
    this.bodyInput.addEventListener('input', () => {
      this.updatePublishButtonState();
      this.adjustBodyTextareaHeight();
    });

    // Publish click
    this.publishBtn.addEventListener('click', () => this.publishActiveDraft());

    // Color Popover toggle (Picture 2)
    document.getElementById('composerPaletteBtn')?.addEventListener('click', (e) => {
      this.toggleColorPopover(e);
    });

    this.colorPickerPill?.addEventListener('click', (e) => {
      this.toggleColorPopover(e);
    });

    // Section Popover toggle (Picture 3)
    this.sectionSelectorPill.addEventListener('click', (e) => {
      this.toggleSectionPopover(e);
    });

    // "New" Section from Popover button (Picture 3)
    if (this.popoverNewSectionBtn) {
      this.popoverNewSectionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextNum = this.state.sections.length + 1;
        const name = prompt('Section name:', `Section ${nextNum}`);
        if (name && name.trim()) {
          const newSec = {
            id: 'sec-' + Date.now(),
            title: name.trim(),
            cards: []
          };
          this.state.sections.push(newSec);
          this.composerState.selectedSectionId = newSec.id;
          this.saveState();
          this.renderBoard();
          this.updateSectionSelectorUI();
          this.closeAllPopovers();
          this.showToast(`Created & selected ${newSec.title}`);
        }
      });
    }

    // Post Fields Modal toggle & close (Picture 4)
    if (this.composerFieldsBtn) {
      this.composerFieldsBtn.addEventListener('click', (e) => {
        this.openPostFieldsModal(e);
      });
    }

    if (this.closePostFieldsBtn) {
      this.closePostFieldsBtn.addEventListener('click', () => {
        this.closePostFieldsModal();
      });
    }

    if (this.postFieldsModal) {
      this.postFieldsModal.addEventListener('click', (e) => {
        if (e.target === this.postFieldsModal) {
          this.closePostFieldsModal();
        }
      });
    }

    if (this.addCustomFieldBtn) {
      this.addCustomFieldBtn.addEventListener('click', () => {
        this.openCustomFieldBuilder();
      });
    }

    // Draft Undo button listener (Blueprint Section 7.1)
    if (this.draftUndoBtn) {
      this.draftUndoBtn.addEventListener('click', () => {
        this.undoDiscardDraft();
      });
    }

    // Close popovers and menus when clicking outside
    document.addEventListener('click', (e) => {
      if (this.colorSelectPopover && !this.colorSelectPopover.hidden) {
        if (!this.colorPickerPill.contains(e.target) && !this.colorSelectPopover.contains(e.target)) {
          this.colorSelectPopover.hidden = true;
        }
      }
      if (this.sectionSelectPopover && !this.sectionSelectPopover.hidden) {
        if (!this.sectionSelectorPill.contains(e.target) && !this.sectionSelectPopover.contains(e.target)) {
          this.sectionSelectPopover.hidden = true;
        }
      }
      if (this.cardContextMenu && !this.cardContextMenu.hidden) {
        if (!this.cardContextMenu.contains(e.target)) {
          this.closeCardContextMenu();
        }
      }
    });

    // Dismiss context menu on right click outside
    document.addEventListener('contextmenu', (e) => {
      if (this.cardContextMenu && !this.cardContextMenu.hidden && !this.cardContextMenu.contains(e.target)) {
        if (!e.target.closest('.padlet-card')) {
          this.closeCardContextMenu();
        }
      }
    });

    // Global Keydown: Escape key and Ctrl+Z Undo
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSectionContextMenu();
        this.closeCardContextMenu();
        this.closeCardDetailModal();
        this.closeScheduleModal();
        this.closeAllToolsModal();
        this.closeCustomFieldBuilder();
        this.closeAllPopovers();
        this.closePostFieldsModal();
        this.closeSearchModal();
        this.closeCloudSettingsModal();
      }

      // Ctrl + Z for Draft Restoration (Blueprint Section 7.1)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'textarea') {
          if (this.lastDiscardedDraft) {
            e.preventDefault();
            this.undoDiscardDraft();
          }
        }
      }
    });

    // Remove attachment badge button
    this.removeAttachmentBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.composerState.attachment = null;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = null;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = null;
          card.type = 'text';
        }
      }
      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
    });

    // Initialize Padlet Striped Multi-Tool Toolbar & Shortcuts
    this.initAttachmentToolbar();

    // Submodal Search button & Enter key
    document.getElementById('doSearchBtn')?.addEventListener('click', () => {
      const q = this.mediaQueryInput?.value.trim();
      if (q) this.performMediaSearch(q);
    });

    this.mediaQueryInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = this.mediaQueryInput.value.trim();
        if (q) this.performMediaSearch(q);
      }
    });

    // Add Section button
    document.getElementById('addSectionBtn')?.addEventListener('click', () => {
      const nextNum = this.state.sections.length + 1;
      const newSec = {
        id: 'sec-' + Date.now(),
        title: `Section ${nextNum}`,
        cards: []
      };
      this.state.sections.push(newSec);
      this.saveState();
      this.renderBoard();
      this.showToast(`Added ${newSec.title}`);
      this.sectionsTrack.parentElement.scrollLeft = this.sectionsTrack.parentElement.scrollWidth;

      if (this.backend && this.backend.isConnected) {
        this.backend.createSection(newSec);
      }
    });

    // Search Toggle in Top Header
    document.getElementById('searchToggleBtn')?.addEventListener('click', () => {
      const isOpen = this.searchOverlay.classList.contains('is-open');
      if (isOpen) {
        this.searchOverlay.hidden = true;
        this.searchOverlay.classList.remove('is-open');
      } else {
        this.searchOverlay.hidden = false;
        this.searchOverlay.classList.add('is-open');
        this.boardSearchInput.focus();
      }
    });

    document.getElementById('closeSearchBtn')?.addEventListener('click', () => {
      this.searchOverlay.hidden = true;
      this.searchOverlay.classList.remove('is-open');
      this.boardSearchInput.value = '';
      this.filterBoard('');
    });

    this.boardSearchInput.addEventListener('input', (e) => {
      this.filterBoard(e.target.value);
    });

  }

  /* ========================================================================
     1. Slideshow Presentation Deck
     ======================================================================== */

  initSlideshow() {
    this.slideshowModal = document.getElementById('slideshowModal');
    this.slideshowSlideViewport = document.getElementById('slideshowSlideViewport');
    this.slideshowCounter = document.getElementById('slideshowCounter');
    this.slideshowPrevBtn = document.getElementById('slideshowPrevBtn');
    this.slideshowNextBtn = document.getElementById('slideshowNextBtn');
    this.slideshowPlayBtn = document.getElementById('slideshowPlayBtn');
    this.slideshowPlayIcon = document.getElementById('slideshowPlayIcon');
    this.slideshowTimelineTrack = document.getElementById('slideshowTimelineTrack');
    this.slideshowState = { activeIndex: 0, slides: [], isPlaying: false, timer: null };

    document.getElementById('slideshowBtn')?.addEventListener('click', () => this.openSlideshow());
    document.getElementById('exitSlideshowBtn')?.addEventListener('click', () => this.exitSlideshow());
    this.slideshowPrevBtn?.addEventListener('click', () => this.prevSlide());
    this.slideshowNextBtn?.addEventListener('click', () => this.nextSlide());
    this.slideshowPlayBtn?.addEventListener('click', () => this.togglePlaySlideshow());
    document.getElementById('slideshowShareBtn')?.addEventListener('click', () => {
      this.exitSlideshow();
      this.openShareDrawer();
    });
    document.getElementById('slideshowFullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard navigation in slideshow
    window.addEventListener('keydown', (e) => {
      if (this.slideshowModal && !this.slideshowModal.hidden) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === 'Escape') {
          this.exitSlideshow();
        }
      }
    });
  }

  openSlideshow(startCardId = null) {
    const slides = [
      {
        type: 'title',
        title: this.state.boardTitle || 'Physics Audio Reflections: I see, I think, I wonder',
        author: this.state.boardAuthor || 'Salman Madani • 6d'
      }
    ];

    this.state.sections.forEach(sec => {
      sec.cards.forEach(card => {
        slides.push({
          type: 'card',
          section: sec,
          card: card
        });
      });
    });

    this.slideshowState.slides = slides;
    this.slideshowState.activeIndex = 0;

    if (startCardId) {
      const idx = slides.findIndex(s => s.card && s.card.id === startCardId);
      if (idx !== -1) this.slideshowState.activeIndex = idx;
    }

    if (this.slideshowModal) this.slideshowModal.hidden = false;
    this.renderSlideshowSlide();
  }

  exitSlideshow() {
    if (this.slideshowState.timer) {
      clearInterval(this.slideshowState.timer);
      this.slideshowState.timer = null;
    }
    this.slideshowState.isPlaying = false;
    if (this.slideshowPlayIcon) {
      this.slideshowPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
    if (this.slideshowModal) this.slideshowModal.hidden = true;
  }

  renderSlideshowSlide() {
    const { activeIndex, slides } = this.slideshowState;
    if (!slides.length || !this.slideshowSlideViewport) return;

    const current = slides[activeIndex];
    if (this.slideshowCounter) this.slideshowCounter.textContent = `${activeIndex + 1} / ${slides.length}`;
    if (this.slideshowPrevBtn) this.slideshowPrevBtn.disabled = activeIndex === 0;
    if (this.slideshowNextBtn) this.slideshowNextBtn.disabled = activeIndex === slides.length - 1;

    // Render timeline notches
    if (this.slideshowTimelineTrack) {
      this.slideshowTimelineTrack.innerHTML = '';
      slides.forEach((_, idx) => {
        const notch = document.createElement('div');
        notch.className = `slideshow-timeline-notch ${idx === activeIndex ? 'is-active' : ''}`;
        notch.title = `Slide ${idx + 1}`;
        notch.addEventListener('click', () => {
          this.slideshowState.activeIndex = idx;
          this.renderSlideshowSlide();
        });
        this.slideshowTimelineTrack.appendChild(notch);
      });
    }

    if (current.type === 'title') {
      this.slideshowSlideViewport.innerHTML = `
        <div class="slideshow-title-slide">
          <div class="slideshow-qr-corner">
            ${this.generateQrSvg(window.location.href)}
          </div>
          <div class="slideshow-title-author">${this.escapeHtml(current.author)}</div>
          <div class="slideshow-title-heading">${this.escapeHtml(current.title)}</div>
        </div>
      `;
    } else {
      const { section, card } = current;
      let mediaHtml = '';
      if (card.attachment) {
        if (card.attachment.type === 'youtube' || card.attachment.videoUrl) {
          mediaHtml = `
            <div class="slideshow-slide-media">
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>
          `;
        } else if (card.attachment.imageUrl || card.attachment.thumbnailUrl) {
          mediaHtml = `
            <div class="slideshow-slide-media">
              <img src="${this.escapeHtml(card.attachment.imageUrl || card.attachment.thumbnailUrl)}" alt="${this.escapeHtml(card.title || 'Slide image')}" />
            </div>
          `;
        }
      }

      let bodyText = '';
      if (card.content) {
        if (card.content.intro) bodyText += card.content.intro + '\n\n';
        if (card.content.body) bodyText += card.content.body;
      } else if (card.attachment && card.attachment.caption) {
        bodyText = card.attachment.caption;
      }

      this.slideshowSlideViewport.innerHTML = `
        <div class="slideshow-card-slide">
          <div class="slideshow-slide-section-pill">${this.escapeHtml(section.title)}</div>
          <div class="slideshow-slide-title">${this.escapeHtml(card.title || 'Untitled note')}</div>
          ${mediaHtml}
          ${bodyText ? `<div class="slideshow-slide-body">${this.escapeHtml(bodyText)}</div>` : ''}
          <div class="slideshow-slide-footer">
            <span>Posted by contributor</span>
            <span>${card.reactions || 0} reflections</span>
          </div>
        </div>
      `;
    }
  }

  nextSlide() {
    if (this.slideshowState.activeIndex < this.slideshowState.slides.length - 1) {
      this.slideshowState.activeIndex++;
      this.renderSlideshowSlide();
    } else if (this.slideshowState.isPlaying) {
      this.slideshowState.activeIndex = 0;
      this.renderSlideshowSlide();
    }
  }

  prevSlide() {
    if (this.slideshowState.activeIndex > 0) {
      this.slideshowState.activeIndex--;
      this.renderSlideshowSlide();
    }
  }

  togglePlaySlideshow() {
    this.slideshowState.isPlaying = !this.slideshowState.isPlaying;
    if (this.slideshowState.isPlaying) {
      if (this.slideshowPlayIcon) {
        this.slideshowPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      }
      this.showToast('Auto-play started (4s)');
      this.slideshowState.timer = setInterval(() => this.nextSlide(), 4000);
    } else {
      if (this.slideshowPlayIcon) {
        this.slideshowPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
      clearInterval(this.slideshowState.timer);
      this.slideshowState.timer = null;
      this.showToast('Auto-play paused');
    }
  }

  /* ========================================================================
     2. Share Drawer & QR Modal
     ======================================================================== */

  initShareDrawer() {
    this.shareDrawer = document.getElementById('shareDrawer');
    this.qrModal = document.getElementById('qrModal');

    document.getElementById('shareBtn')?.addEventListener('click', () => this.openShareDrawer());
    document.getElementById('closeShareDrawerBtn')?.addEventListener('click', () => this.closeShareDrawer());
    this.shareDrawer?.addEventListener('click', (e) => {
      if (e.target === this.shareDrawer) this.closeShareDrawer();
    });

    // Quick Tiles
    document.getElementById('quickCopyLinkBtn')?.addEventListener('click', () => this.copyBoardLink());
    document.getElementById('shareCopyLinkItem')?.addEventListener('click', () => this.copyBoardLink());

    document.getElementById('quickQrCodeBtn')?.addEventListener('click', () => this.openQrModal());
    document.getElementById('shareQrCodeItem')?.addEventListener('click', () => this.openQrModal());
    document.getElementById('closeQrModalBtn')?.addEventListener('click', () => this.closeQrModal());
    this.qrModal?.addEventListener('click', (e) => {
      if (e.target === this.qrModal) this.closeQrModal();
    });

    document.getElementById('quickEmbedBtn')?.addEventListener('click', () => this.copyEmbedSnippet());
    document.getElementById('shareEmbedItem')?.addEventListener('click', () => this.copyEmbedSnippet());

    document.getElementById('quickExportPdfBtn')?.addEventListener('click', () => window.print());
    document.getElementById('exportPdfItem')?.addEventListener('click', () => window.print());
    document.getElementById('exportImageItem')?.addEventListener('click', () => window.print());
    document.getElementById('printBoardItem')?.addEventListener('click', () => window.print());

    document.getElementById('exportCsvItem')?.addEventListener('click', () => this.exportCsv());
  }

  openShareDrawer() {
    this.closeAllDrawers();
    if (this.shareDrawer) this.shareDrawer.hidden = false;
  }

  closeShareDrawer() {
    if (this.shareDrawer) this.shareDrawer.hidden = true;
  }

  openQrModal() {
    if (!this.qrModal) return;
    const container = document.getElementById('qrCanvasContainer');
    if (container) {
      container.innerHTML = this.generateQrSvg(window.location.href);
    }
    this.qrModal.hidden = false;
  }

  closeQrModal() {
    if (this.qrModal) this.qrModal.hidden = true;
  }

  copyBoardLink() {
    navigator.clipboard?.writeText(window.location.href);
    this.showToast('Board link copied to clipboard!');
  }

  copyEmbedSnippet() {
    const snippet = `<iframe src="${window.location.href}" width="100%" height="600" style="border:0;border-radius:16px;" allowfullscreen></iframe>`;
    navigator.clipboard?.writeText(snippet);
    this.showToast('Embed code copied to clipboard!');
  }

  exportCsv() {
    let csv = 'Section,Title,Type,Color,Content,Reactions\n';
    this.state.sections.forEach(sec => {
      sec.cards.forEach(c => {
        let body = '';
        if (c.content && c.content.body) body = c.content.body;
        else if (c.attachment && c.attachment.caption) body = c.attachment.caption;
        const line = [
          `"${(sec.title || '').replace(/"/g, '""')}"`,
          `"${(c.title || '').replace(/"/g, '""')}"`,
          `"${c.type || 'text'}"`,
          `"${c.color || 'white'}"`,
          `"${body.replace(/"/g, '""')}"`,
          `"${c.reactions || 0}"`
        ].join(',');
        csv += line + '\n';
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'padles-physics-reflections.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Exported padles-physics-reflections.csv');
  }

  /* ========================================================================
     3. Padlet Authentic Settings Panel (surfaceSettingsMainPanel)
     ======================================================================== */

  initSettingsDrawer() {
    this.settingsPanel = document.getElementById('surfaceSettingsMainPanel');
    this.settingsDrawer = this.settingsPanel;

    // Open button triggers (both topbar button and any legacy trigger)
    document.getElementById('surfaceSettingsButton')?.addEventListener('click', () => this.openSettingsDrawer());
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.openSettingsDrawer());

    // Close button triggers
    document.getElementById('settingsMainPanelCloseButton')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsWallpaperCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsIconCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsFormatCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsSortCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsReactionsCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsCommentsCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());

    // Backdrop click closes settings
    this.settingsPanel?.addEventListener('click', (e) => {
      if (e.target === this.settingsPanel) this.closeSettingsDrawer();
    });

    // Escape key closes settings
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.settingsPanel && !this.settingsPanel.hidden) {
        this.closeSettingsDrawer();
      }
    });

    // Subview Back Buttons
    document.getElementById('settingsWallpaperBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsIconBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsFormatBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsSortBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsReactionsBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsCommentsBackBtn')?.addEventListener('click', () => this.backToMainSettings());

    // Navigation Tabs with smooth anchor scroll & sliding indicator
    const tabItems = document.querySelectorAll('.settings-tab-item');
    tabItems.forEach(tab => {
      tab.addEventListener('click', () => {
        tabItems.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.updateTabIndicator(tab);

        const targetId = tab.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 1. Heading Section Inputs
    const titleInput = document.getElementById('wall-title-input');
    titleInput?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.state.title = val;
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.title = val;
      const titleEl = document.getElementById('boardTitle');
      if (titleEl) titleEl.textContent = val || 'Untitled Padles';
      document.title = `${val || 'Untitled Padles'} — Padles`;
      this.saveState();
      this.syncSettingsToCloud();
    });

    const descInput = document.getElementById('wall-desc-input');
    descInput?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.state.description = val;
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.description = val;
      const descEl = document.getElementById('boardDescription');
      if (descEl) {
        descEl.textContent = val;
        descEl.style.display = val ? 'block' : 'none';
      }
      this.saveState();
      this.syncSettingsToCloud();
    });

    // Icon row opens Icon Picker subpanel
    document.getElementById('settingRowIcon')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsIconSubview');
    });

    // 2. Appearance Section
    document.getElementById('settingRowWallpaper')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsWallpaperSubview');
    });

    document.getElementById('colorSchemeDarkBtn')?.addEventListener('click', () => {
      this.applyColorScheme('dark');
      this.saveState();
      this.syncSettingsToCloud();
    });

    document.getElementById('colorSchemeLightBtn')?.addEventListener('click', () => {
      this.applyColorScheme('light');
      this.saveState();
      this.syncSettingsToCloud();
    });

    document.getElementById('fontBtnNiagara')?.addEventListener('click', () => { this.applyFont('niagara'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnThames')?.addEventListener('click', () => { this.applyFont('thames'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnFuji')?.addEventListener('click', () => { this.applyFont('fuji'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnAlps')?.addEventListener('click', () => { this.applyFont('alps'); this.saveState(); this.syncSettingsToCloud(); });

    document.getElementById('postSizeStandardBtn')?.addEventListener('click', () => { this.applyPostSize('standard'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('postSizeWideBtn')?.addEventListener('click', () => { this.applyPostSize('wide'); this.saveState(); this.syncSettingsToCloud(); });

    // 3. Layout Section
    document.getElementById('settingRowFormat')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsFormatSubview');
    });

    document.getElementById('settingRowSort')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsSortSubview');
    });

    document.getElementById('newPostFirstBtn')?.addEventListener('click', () => { this.applyNewPostPosition('first'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('newPostLastBtn')?.addEventListener('click', () => { this.applyNewPostPosition('last'); this.saveState(); this.syncSettingsToCloud(); });

    // 4. Posts Section
    document.getElementById('settingRowPostFields')?.addEventListener('click', () => {
      this.closeSettingsDrawer();
      this.openPostFieldsModal();
    });

    document.getElementById('settingAuthorTimeToggle')?.addEventListener('click', () => {
      const current = !(this.state.settings?.showAuthorAndTime === false);
      this.applyAttribution(!current);
      this.saveState();
      this.syncSettingsToCloud();
    });

    // 5. Engagement Section
    document.getElementById('settingRowComments')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsCommentsSubview');
    });

    document.getElementById('settingRowEmojiPreset')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsReactionsSubview');
    });

    // 6. Content Section
    document.getElementById('settingModerationBtn')?.addEventListener('click', () => {
      const modes = ['auto', 'manual', 'none'];
      const curr = this.state.settings?.moderation || 'auto';
      const next = modes[(modes.indexOf(curr) + 1) % modes.length];
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.moderation = next;
      const lbl = document.getElementById('currentModerationLabel');
      if (lbl) lbl.textContent = next.charAt(0).toUpperCase() + next.slice(1);
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast(`Moderation set to ${next}`);
    });

    document.getElementById('settingCopyProtectionBtn')?.addEventListener('click', () => {
      const curr = this.state.settings?.copyProtection || 'none';
      const next = curr === 'none' ? 'protected' : 'none';
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.copyProtection = next;
      const lbl = document.getElementById('currentCopyProtectionLabel');
      if (lbl) lbl.textContent = next === 'none' ? 'None' : 'Protected';
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast(`Copy protection: ${next === 'none' ? 'Disabled' : 'Enabled'}`);
    });

    // 7. Advanced Section
    document.getElementById('surfaceUrlCopyButton')?.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.showToast('Board URL copied to clipboard!');
        });
      } else {
        const inp = document.getElementById('surfaceSettingsChangeUrlInput');
        if (inp) {
          inp.select();
          document.execCommand('copy');
          this.showToast('Board URL copied to clipboard!');
        }
      }
    });

    // Initialize subpanels
    this.initWallpaperSubview();
    this.initIconSubview();
    this.initFormatSubview();
    this.initSortSubview();
    this.initReactionsSubview();
    this.initCommentsSubview();
  }

  openSettingsDrawer() {
    this.closeAllDrawers();
    this.backToMainSettings();

    // Populate current values in inputs
    const s = this.state.settings || {};
    const titleInput = document.getElementById('wall-title-input');
    if (titleInput) titleInput.value = s.title || this.state.title || 'Physics Audio Reflections: I see, I think, I wonder';

    const descInput = document.getElementById('wall-desc-input');
    if (descInput) descInput.value = s.description !== undefined ? s.description : (this.state.description || '');

    const urlInput = document.getElementById('surfaceSettingsChangeUrlInput');
    if (urlInput) urlInput.value = window.location.href;

    const urlCaption = document.getElementById('currentUrlCaption');
    if (urlCaption) urlCaption.textContent = window.location.href;

    if (this.settingsPanel) this.settingsPanel.hidden = false;

    // Update tab indicator on first visible tab
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.settings-tab-item.active') || document.querySelector('.settings-tab-item');
      if (activeTab) this.updateTabIndicator(activeTab);
    });
  }

  closeSettingsDrawer() {
    if (this.settingsPanel) this.settingsPanel.hidden = true;
  }

  showSettingsSubview(subviewId) {
    document.querySelectorAll('.padlet-settings-container .settings-subview').forEach(v => {
      v.classList.remove('active');
    });
    const target = document.getElementById(subviewId);
    if (target) target.classList.add('active');
  }

  backToMainSettings() {
    this.showSettingsSubview('settingsMainView');
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.settings-tab-item.active');
      if (activeTab) this.updateTabIndicator(activeTab);
    });
  }

  updateTabIndicator(tabEl) {
    const indicator = document.getElementById('settingsTabIndicator');
    if (indicator && tabEl) {
      indicator.style.left = `${tabEl.offsetLeft}px`;
      indicator.style.width = `${tabEl.offsetWidth}px`;
    }
  }

  applyLoadedSettings() {
    const s = this.state.settings || {};
    
    // 1. Title
    const title = s.title || this.state.title || 'Physics Audio Reflections: I see, I think, I wonder';
    const titleEl = document.getElementById('boardTitle');
    if (titleEl) titleEl.textContent = title;
    document.title = `${title} — Padles`;
    const titleInput = document.getElementById('wall-title-input');
    if (titleInput) titleInput.value = title;

    // 2. Description
    const desc = s.description !== undefined ? s.description : (this.state.description || '');
    const descEl = document.getElementById('boardDescription');
    if (descEl) {
      descEl.textContent = desc;
      descEl.style.display = desc ? 'block' : 'none';
    }
    const descInput = document.getElementById('wall-desc-input');
    if (descInput) descInput.value = desc;

    // 3. Icon
    const icon = s.icon || '';
    const iconEl = document.getElementById('boardIcon');
    if (iconEl) {
      iconEl.textContent = icon;
      iconEl.style.display = icon ? 'inline-block' : 'none';
    }
    const iconDisplay = document.getElementById('settingCurrentIconDisplay');
    if (iconDisplay) iconDisplay.textContent = icon || 'None';

    // 4. Wallpaper
    this.applyWallpaper(s.wallpaper || 'aurora');

    // 5. Color Scheme
    this.applyColorScheme(s.colorScheme || 'dark');

    // 6. Font
    this.applyFont(s.font || 'niagara');

    // 7. Post Size
    this.applyPostSize(s.postSize || 'standard');

    // 8. Layout Format
    this.applyLayoutFormat(s.layoutFormat || 'columns');

    // 9. Attribution
    this.applyAttribution(s.showAuthorAndTime !== false);

    // 10. Comments
    this.applyComments(s.commentsEnabled !== false);

    // 11. Reactions Preset
    this.applyReactionsPreset(s.reactionsPreset || 'all');

    // 12. Sort & New Post Position
    this.applySort(s.sortBy || 'manual');
    this.applyNewPostPosition(s.newPostPosition || 'last');

    // Moderation & Copy Protection
    const modLbl = document.getElementById('currentModerationLabel');
    if (modLbl) modLbl.textContent = (s.moderation || 'auto').charAt(0).toUpperCase() + (s.moderation || 'auto').slice(1);

    const cpLbl = document.getElementById('currentCopyProtectionLabel');
    if (cpLbl) cpLbl.textContent = s.copyProtection === 'protected' ? 'Protected' : 'None';
  }

  applyWallpaper(wpId) {
    const classesToRemove = Array.from(document.body.classList).filter(c => c.startsWith('wallpaper-') || c.startsWith('theme-'));
    classesToRemove.forEach(c => document.body.classList.remove(c));

    if (wpId.startsWith('http://') || wpId.startsWith('https://') || wpId.startsWith('data:image')) {
      document.body.style.backgroundImage = `url("${wpId}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.classList.add('aurora-theme');
    } else {
      document.body.style.backgroundImage = '';
      if (wpId === 'aurora') {
        document.body.classList.add('aurora-theme');
      } else {
        document.body.classList.add(`wallpaper-${wpId}`);
      }
    }

    const thumb = document.getElementById('settingWallpaperThumbPreview');
    if (thumb) {
      if (wpId.startsWith('http') || wpId.startsWith('data:')) {
        thumb.style.backgroundImage = `url("${wpId}")`;
        thumb.className = 'wallpaper-thumb-preview';
      } else {
        thumb.className = `wallpaper-thumb-preview ${wpId === 'aurora' ? 'theme-swatch-aurora' : 'wallpaper-' + wpId}`;
        thumb.style.backgroundImage = '';
      }
    }

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.wallpaper = wpId;
  }

  applyColorScheme(scheme) {
    document.body.classList.toggle('light-theme', scheme === 'light');
    document.body.classList.toggle('dark-theme', scheme === 'dark');

    document.getElementById('colorSchemeDarkBtn')?.classList.toggle('active', scheme === 'dark');
    document.getElementById('colorSchemeLightBtn')?.classList.toggle('active', scheme === 'light');

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.colorScheme = scheme;
  }

  applyFont(fontName) {
    document.body.dataset.boardFont = fontName;
    ['fontBtnNiagara', 'fontBtnThames', 'fontBtnFuji', 'fontBtnAlps'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.classList.toggle('active', (id === 'fontBtnNiagara' && fontName === 'niagara') ||
                                        (id === 'fontBtnThames' && fontName === 'thames') ||
                                        (id === 'fontBtnFuji' && fontName === 'fuji') ||
                                        (id === 'fontBtnAlps' && fontName === 'alps'));
      }
    });
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.font = fontName;
  }

  applyPostSize(size) {
    document.body.dataset.postSize = size;
    document.getElementById('postSizeStandardBtn')?.classList.toggle('active', size === 'standard');
    document.getElementById('postSizeWideBtn')?.classList.toggle('active', size === 'wide');
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.postSize = size;
  }

  applyLayoutFormat(format) {
    document.body.dataset.layoutFormat = format;
    const formatName = format.charAt(0).toUpperCase() + format.slice(1);
    const label = document.getElementById('currentFormatLabel');
    if (label) label.textContent = format === 'columns' ? 'Columns' : formatName;
    const caption = document.getElementById('currentFormatCaption');
    if (caption) caption.textContent = format === 'columns' ? 'Columns' : formatName;

    document.querySelectorAll('.format-card-btn').forEach(card => {
      card.classList.toggle('active', card.dataset.format === format);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.layoutFormat = format;
  }

  applyAttribution(show) {
    document.body.classList.toggle('hide-post-attribution', !show);
    const toggle = document.getElementById('settingAuthorTimeToggle');
    if (toggle) {
      toggle.classList.toggle('active', show);
      toggle.setAttribute('aria-checked', show ? 'true' : 'false');
      const thumb = toggle.querySelector('.switch-thumb');
      if (thumb) {
        thumb.innerHTML = show
          ? `<svg class="switch-icon" viewBox="0 0 32 32" height="12" width="12" fill="currentColor"><path d="M11.667 25.333a1.333 1.333 0 0 1-.943-.39l-6.667-6.667a1.333 1.333 0 1 1 1.886-1.886l5.724 5.724 13.057-13.057a1.333 1.333 0 1 1 1.886 1.886l-14 14a1.333 1.333 0 0 1-.943.39z"/></svg>`
          : `<svg class="switch-icon" viewBox="0 0 32 32" height="12" width="12" fill="currentColor"><path d="M23.891 6.667a1.4 1.4 0 0 0-.984.434L16 14.008 9.093 7.101a1.41 1.41 0 0 0-1.798-.186A1.41 1.41 0 0 0 7.1 9.094l6.907 6.907L7.1 22.908a1.399 1.399 0 0 0-.33 1.549 1.42 1.42 0 0 0 .772.772 1.41 1.41 0 0 0 1.55-.33l6.907-6.907 6.907 6.907a1.399 1.399 0 0 0 1.549.33 1.405 1.405 0 0 0 .877-1.319 1.4 1.4 0 0 0-.434-1.002l-6.907-6.907 6.907-6.907a1.411 1.411 0 0 0-1.009-2.427z"/></svg>`;
      }
    }
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.showAuthorAndTime = show;
  }

  applyComments(enabled) {
    document.body.classList.toggle('comments-disabled', !enabled);
    const statusText = document.getElementById('settingCommentsStatus');
    if (statusText) statusText.textContent = enabled ? 'On' : 'Off';
    const toggle = document.getElementById('settingAllowCommentsToggle');
    if (toggle) {
      toggle.classList.toggle('active', enabled);
      toggle.setAttribute('aria-checked', enabled ? 'true' : 'false');
    }
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.commentsEnabled = enabled;
  }

  applyReactionsPreset(preset) {
    const labels = {
      all: 'All emojis',
      heart: 'Heart (❤️)',
      thumbs_up: 'Thumbs up (👍)',
      classic: 'Classic (4 emojis)',
      off: 'Off'
    };
    const lbl = labels[preset] || 'All emojis';
    const btnLabel = document.getElementById('currentEmojiPresetLabel');
    if (btnLabel) btnLabel.textContent = lbl;
    const caption = document.getElementById('currentEmojiPresetCaption');
    if (caption) caption.textContent = lbl;

    document.querySelectorAll('#settingsReactionsSubview .selection-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.reactions === preset);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.reactionsPreset = preset;
  }

  applySort(sortType) {
    const labels = {
      manual: 'Drag and drop',
      date_desc: 'Date published (Newest)',
      date_asc: 'Date published (Oldest)',
      subject_asc: 'Post subject (A to Z)',
      random: 'Random'
    };
    const sortLabel = document.getElementById('currentSortLabel');
    if (sortLabel) sortLabel.textContent = labels[sortType] || 'Drag and drop';

    document.querySelectorAll('#settingsSortSubview .selection-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.sort === sortType);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.sortBy = sortType;

    if (sortType === 'subject_asc') {
      this.state.sections.forEach(sec => {
        sec.cards.sort((a, b) => (a.title || a.subject || '').localeCompare(b.title || b.subject || ''));
      });
      this.renderBoard();
    } else if (sortType === 'random') {
      this.state.sections.forEach(sec => {
        sec.cards.sort(() => Math.random() - 0.5);
      });
      this.renderBoard();
    }
  }

  applyNewPostPosition(pos) {
    document.getElementById('newPostFirstBtn')?.classList.toggle('active', pos === 'first');
    document.getElementById('newPostLastBtn')?.classList.toggle('active', pos === 'last');
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.newPostPosition = pos;
  }

  syncSettingsToCloud() {
    if (this.backend && this.backend.isConnected && this.state.settings) {
      this.backend.updateBoardSettings?.(this.state.settings);
    }
  }

  initWallpaperSubview() {
    const wallpapers = [
      // Colors
      { id: 'pitch-black', name: 'Pitch Black', cat: 'colors', color: '#0a0a0a' },
      { id: 'slate-charcoal', name: 'Slate Charcoal', cat: 'colors', color: '#1e293b' },
      { id: 'pure-white', name: 'Pure White', cat: 'colors', color: '#f8fafc' },
      { id: 'soft-cream', name: 'Soft Cream', cat: 'colors', color: '#fef3c7' },
      { id: 'midnight-blue', name: 'Midnight Blue', cat: 'colors', color: '#0f172a' },
      { id: 'emerald-forest-solid', name: 'Emerald Forest', cat: 'colors', color: '#064e3b' },
      { id: 'crimson-wine', name: 'Crimson Wine', cat: 'colors', color: '#881337' },
      { id: 'royal-purple', name: 'Royal Purple', cat: 'colors', color: '#581c87' },

      // Gradients
      { id: 'aurora', name: 'Aurora Glow', cat: 'gradients', gradient: 'linear-gradient(135deg, rgb(1, 40, 50) 0%, #0d9488 50%, #0284c7 100%)' },
      { id: 'sunset-gradient', name: 'Sunset Horizon', cat: 'gradients', gradient: 'linear-gradient(135deg, #f97316 0%, #e11d48 50%, #7c3aed 100%)' },
      { id: 'neon-gradient', name: 'Neon Cyberpunk', cat: 'gradients', gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)' },
      { id: 'lavender-gradient', name: 'Lavender Mist', cat: 'gradients', gradient: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)' },
      { id: 'ocean-gradient', name: 'Ocean Depths', cat: 'gradients', gradient: 'linear-gradient(135deg, #022c43 0%, #053f5c 50%, #115173 100%)' },
      { id: 'emerald-gradient', name: 'Mint Emerald', cat: 'gradients', gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)' },

      // Textures & Patterns
      { id: 'brick-wall', name: 'Brick Wall', cat: 'textures', color: '#7f1d1d' },
      { id: 'blackboard', name: 'Blackboard', cat: 'textures', color: '#1c2826' },
      { id: 'corkboard', name: 'Corkboard', cat: 'textures', color: '#b45309' },
      { id: 'blueprint', name: 'Blueprint Grid', cat: 'textures', color: '#1e3a8a' },
      { id: 'dotgrid', name: 'Dot Grid', cat: 'textures', color: '#0f172a' },
      { id: 'graphpaper', name: 'Graph Paper', cat: 'textures', color: '#ffffff' },

      // Photos
      { id: 'starry-night', name: 'Starry Night', cat: 'photos', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' },
      { id: 'mountains', name: 'Mountains', cat: 'photos', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80' },
      { id: 'ocean', name: 'Ocean Beach', cat: 'photos', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
      { id: 'cherry-blossom', name: 'Cherry Blossom', cat: 'photos', img: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=300&q=80' },
      { id: 'city-lights', name: 'City Lights', cat: 'photos', img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=300&q=80' }
    ];

    const container = document.getElementById('wallpaperCardsContainer');
    if (!container) return;

    const renderGrid = (filterCat = 'all') => {
      container.innerHTML = '';

      if (filterCat === 'custom') {
        const customBox = document.createElement('div');
        customBox.className = 'custom-wallpaper-panel';
        customBox.innerHTML = `
          <div class="settings-form-group">
            <label class="settings-field-label">Upload image file</label>
            <input type="file" id="customWpFileUpload" accept="image/*" class="settings-text-input" style="padding: 6px;" />
          </div>
          <div class="settings-form-group">
            <label class="settings-field-label">Or paste image URL</label>
            <div class="settings-input-wrapper with-action">
              <input type="url" id="customWpUrlInput" placeholder="https://example.com/wallpaper.jpg" class="settings-textarea" style="height: 32px;" />
              <button type="button" id="applyCustomWpUrlBtn" class="settings-inline-action-btn">Apply</button>
            </div>
          </div>
        `;
        container.appendChild(customBox);

        // Bind upload
        customBox.querySelector('#customWpFileUpload')?.addEventListener('change', (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (re) => {
              const dataUrl = re.target.result;
              this.applyWallpaper(dataUrl);
              this.saveState();
              this.syncSettingsToCloud();
              this.showToast('Custom wallpaper uploaded!');
              this.backToMainSettings();
            };
            reader.readAsDataURL(file);
          }
        });

        // Bind URL apply
        customBox.querySelector('#applyCustomWpUrlBtn')?.addEventListener('click', () => {
          const url = customBox.querySelector('#customWpUrlInput')?.value?.trim();
          if (url) {
            this.applyWallpaper(url);
            this.saveState();
            this.syncSettingsToCloud();
            this.showToast('Custom image applied!');
            this.backToMainSettings();
          }
        });

        return;
      }

      const grid = document.createElement('div');
      grid.className = 'wallpaper-grid';

      const filtered = filterCat === 'all' ? wallpapers : wallpapers.filter(w => w.cat === filterCat);
      const currentWp = this.state.settings?.wallpaper || 'aurora';

      filtered.forEach(w => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `wallpaper-card-btn ${currentWp === w.id ? 'active' : ''}`;
        
        const preview = document.createElement('div');
        preview.className = 'wp-card-preview';
        if (w.gradient) preview.style.background = w.gradient;
        else if (w.img) preview.style.backgroundImage = `url("${w.img}")`;
        else if (w.color) preview.style.backgroundColor = w.color;

        const name = document.createElement('div');
        name.className = 'wp-card-name';
        name.textContent = w.name;

        btn.appendChild(preview);
        btn.appendChild(name);

        btn.addEventListener('click', () => {
          document.querySelectorAll('.wallpaper-card-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.applyWallpaper(w.id);
          this.saveState();
          this.syncSettingsToCloud();
          this.showToast(`Wallpaper changed to ${w.name}`);
          this.backToMainSettings();
        });

        grid.appendChild(btn);
      });

      container.appendChild(grid);
    };

    // Category Buttons Filter
    document.querySelectorAll('.wp-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wp-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(btn.dataset.wpCat);
      });
    });

    renderGrid('all');
  }

  initIconSubview() {
    const emojiCategories = [
      {
        title: 'Smileys & Emotion',
        emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😜', '🤪', '🤓', '😎', '🥳', '🤗', '🤔', '🤐', '🤫', '🤭', '😴', '🥺', '😳']
      },
      {
        title: 'Animals & Nature',
        emojis: ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🍀', '🍁', '🍂', '🍄', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦋', '🐝', '🦄']
      },
      {
        title: 'Science & Study',
        emojis: ['💡', '📚', '📖', '🔬', '🔭', '🧪', '🧲', '⚡', '🪐', '🚀', '🛸', '🛰️', '📐', '📏', '📊', '📈', '💻', '🖥️', '⌨️', '🔋', '⚙️', '🧰', '📝', '✏️', '✒️', '🔍', '🔎', '✨', '⭐', '🌟', '💥', '🔥']
      },
      {
        title: 'Food & Activities',
        emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🍕', '🍔', '🍟', '🥪', '🌮', '🍣', '🍩', '🍪', '🎂', '☕', '🍵', '🧃', '⚽', '🏀', '🏈', '🎾', '🎮', '🎯', '🎨', '🎬']
      },
      {
        title: 'Hearts & Symbols',
        emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '⚛️', '✅', '❇️', '✳️', '🌐', '🌀', '💫', '🌈', '☀️', '🌙', '⭐', '💯']
      }
    ];

    const gridContainer = document.getElementById('iconPickerGrid');
    if (!gridContainer) return;

    const renderEmojis = (searchFilter = '') => {
      gridContainer.innerHTML = '';
      const filter = searchFilter.toLowerCase().trim();

      emojiCategories.forEach(cat => {
        const filtered = filter ? cat.emojis.filter(e => e.includes(filter)) : cat.emojis;
        if (filtered.length === 0) return;

        const block = document.createElement('div');
        block.className = 'emoji-category-block';

        const title = document.createElement('div');
        title.className = 'emoji-cat-title';
        title.textContent = cat.title;
        block.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'emoji-grid';

        filtered.forEach(emoji => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'emoji-item-btn';
          btn.textContent = emoji;

          btn.addEventListener('click', () => {
            if (!this.state.settings) this.state.settings = {};
            this.state.settings.icon = emoji;
            const iconEl = document.getElementById('boardIcon');
            if (iconEl) {
              iconEl.textContent = emoji;
              iconEl.style.display = 'inline-block';
            }
            const iconDisplay = document.getElementById('settingCurrentIconDisplay');
            if (iconDisplay) iconDisplay.textContent = emoji;
            this.saveState();
            this.syncSettingsToCloud();
            this.showToast(`Board icon set to ${emoji}`);
            this.backToMainSettings();
          });

          grid.appendChild(btn);
        });

        block.appendChild(grid);
        gridContainer.appendChild(block);
      });
    };

    // None button clears icon
    document.getElementById('iconPickerNoneBtn')?.addEventListener('click', () => {
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.icon = '';
      const iconEl = document.getElementById('boardIcon');
      if (iconEl) {
        iconEl.textContent = '';
        iconEl.style.display = 'none';
      }
      const iconDisplay = document.getElementById('settingCurrentIconDisplay');
      if (iconDisplay) iconDisplay.textContent = 'None';
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast('Board icon removed');
      this.backToMainSettings();
    });

    // Search filter
    document.getElementById('iconPickerSearchInput')?.addEventListener('input', (e) => {
      renderEmojis(e.target.value);
    });

    renderEmojis('');
  }

  initFormatSubview() {
    document.querySelectorAll('.format-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const format = btn.dataset.format;
        this.applyLayoutFormat(format);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast(`Layout format changed to ${format}`);
        this.backToMainSettings();
      });
    });
  }

  initSortSubview() {
    document.querySelectorAll('#settingsSortSubview .selection-option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const sort = btn.dataset.sort;
        this.applySort(sort);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast('Sort order updated');
        this.backToMainSettings();
      });
    });
  }

  initReactionsSubview() {
    document.querySelectorAll('#settingsReactionsSubview .selection-option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.reactions;
        this.applyReactionsPreset(preset);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast('Reactions preset updated');
        this.backToMainSettings();
      });
    });
  }

  initCommentsSubview() {
    document.getElementById('settingAllowCommentsToggle')?.addEventListener('click', () => {
      const current = !(this.state.settings?.commentsEnabled === false);
      this.applyComments(!current);
      this.saveState();
      this.syncSettingsToCloud();
    });
  }

  /* ========================================================================
     4. More Options Drawer
     ======================================================================== */

  initMoreDrawer() {
    this.moreDrawer = document.getElementById('moreDrawer');
    document.getElementById('moreBtn')?.addEventListener('click', () => this.openMoreDrawer());
    document.getElementById('closeMoreDrawerBtn')?.addEventListener('click', () => this.closeMoreDrawer());
    this.moreDrawer?.addEventListener('click', (e) => {
      if (e.target === this.moreDrawer) this.closeMoreDrawer();
    });

    // Quick Action Tiles
    document.getElementById('moreQuickShareBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openShareDrawer();
    });

    document.getElementById('moreQuickRemakeBtn')?.addEventListener('click', () => this.remakeBoard());
    document.getElementById('moreRemakeItem')?.addEventListener('click', () => this.remakeBoard());

    document.getElementById('moreQuickActivityBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.showToast('Recent activity: Board updated with Supabase Realtime');
    });

    document.getElementById('moreQuickSlideshowBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openSlideshow();
    });

    document.getElementById('moreQuickSettingsBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openSettingsDrawer();
    });

    document.getElementById('moreFullscreenItem')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.toggleFullscreen();
    });

    document.getElementById('morePrintItem')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      window.print();
    });

    document.getElementById('moreClearPostsItem')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all posts from this board?')) {
        this.state.sections.forEach(sec => sec.cards = []);
        this.saveState();
        this.renderBoard();
        this.closeMoreDrawer();
        this.showToast('All posts cleared');
      }
    });
  }

  openMoreDrawer() {
    this.closeAllDrawers();
    if (this.moreDrawer) this.moreDrawer.hidden = false;
  }

  closeMoreDrawer() {
    if (this.moreDrawer) this.moreDrawer.hidden = true;
  }

  closeAllDrawers() {
    if (this.shareDrawer) this.shareDrawer.hidden = true;
    if (this.settingsDrawer) this.settingsDrawer.hidden = true;
    if (this.moreDrawer) this.moreDrawer.hidden = true;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  remakeBoard() {
    if (confirm('Create a clean remake clone of this board?')) {
      const clonedState = JSON.parse(JSON.stringify(this.state));
      clonedState.boardTitle = (this.state.boardTitle || 'Board') + ' (Remake)';
      this.state = clonedState;
      this.saveState();
      this.renderBoard();
      this.closeMoreDrawer();
      this.showToast('Board remade successfully!');
    }
  }

  generateQrSvg(url) {
    return `<svg width="140" height="140" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="33" height="33" fill="white"/>
      <rect x="2" y="2" width="7" height="7" fill="black"/>
      <rect x="3" y="3" width="5" height="5" fill="white"/>
      <rect x="4" y="4" width="3" height="3" fill="black"/>
      <rect x="24" y="2" width="7" height="7" fill="black"/>
      <rect x="25" y="3" width="5" height="5" fill="white"/>
      <rect x="26" y="4" width="3" height="3" fill="black"/>
      <rect x="2" y="24" width="7" height="7" fill="black"/>
      <rect x="3" y="25" width="5" height="5" fill="white"/>
      <rect x="4" y="26" width="3" height="3" fill="black"/>
      <rect x="20" y="20" width="5" height="5" fill="black"/>
      <rect x="21" y="21" width="3" height="3" fill="white"/>
      <rect x="22" y="22" width="1" height="1" fill="black"/>
      <line x1="9" y1="5" x2="23" y2="5" stroke="black" stroke-dasharray="1,1"/>
      <line x1="5" y1="9" x2="5" y2="23" stroke="black" stroke-dasharray="1,1"/>
      <rect x="11" y="2" width="2" height="2" fill="black"/>
      <rect x="15" y="2" width="1" height="2" fill="black"/>
      <rect x="18" y="2" width="2" height="1" fill="black"/>
      <rect x="10" y="7" width="3" height="2" fill="black"/>
      <rect x="14" y="8" width="2" height="2" fill="black"/>
      <rect x="18" y="7" width="2" height="1" fill="black"/>
      <rect x="11" y="11" width="2" height="2" fill="black"/>
      <rect x="15" y="12" width="3" height="1" fill="black"/>
      <rect x="20" y="10" width="2" height="2" fill="black"/>
      <rect x="25" y="11" width="1" height="2" fill="black"/>
      <rect x="28" y="12" width="3" height="2" fill="black"/>
      <rect x="10" y="15" width="2" height="2" fill="black"/>
      <rect x="13" y="16" width="3" height="1" fill="black"/>
      <rect x="18" y="15" width="2" height="3" fill="black"/>
      <rect x="22" y="16" width="2" height="1" fill="black"/>
      <rect x="27" y="15" width="2" height="2" fill="black"/>
      <rect x="11" y="24" width="2" height="2" fill="black"/>
      <rect x="15" y="25" width="2" height="2" fill="black"/>
      <rect x="27" y="24" width="3" height="2" fill="black"/>
      <rect x="10" y="28" width="3" height="2" fill="black"/>
      <rect x="16" y="29" width="2" height="2" fill="black"/>
      <rect x="26" y="28" width="2" height="2" fill="black"/>
    </svg>`;
  }

  filterBoard(query) {
    const q = query.trim().toLowerCase();
    document.querySelectorAll('.padlet-card').forEach(cardEl => {
      if (q === '' || cardEl.innerText.toLowerCase().includes(q)) {
        cardEl.classList.remove('is-dimmed');
      } else {
        cardEl.classList.add('is-dimmed');
      }
    });
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2200);
  }

  /* ========================================================================
     Supabase Cloud Backend & Realtime Integration
     ======================================================================== */

  initCloudBackendUI() {
    if (!this.backend) return;

    // Load initial values into modal inputs
    const savedUrl = localStorage.getItem('padles_supabase_url') || window.PADLES_SUPABASE_CONFIG?.url || '';
    const savedKey = localStorage.getItem('padles_supabase_anon_key') || window.PADLES_SUPABASE_CONFIG?.anonKey || '';
    const boardId = this.backend.activeBoardId || 'board-default-physics';

    if (this.supabaseUrlInput) this.supabaseUrlInput.value = savedUrl;
    if (this.supabaseKeyInput) this.supabaseKeyInput.value = savedKey;
    if (this.supabaseBoardIdInput) this.supabaseBoardIdInput.value = boardId;

    // Set initial status UI
    this.updateCloudStatusUI(this.backend.isConnected, this.backend.isConnected ? 'Supabase Live' : 'Local Mode');

    // Listen to backend status events
    this.backend.on('statusChange', ({ connected, message }) => {
      this.updateCloudStatusUI(connected, connected ? 'Supabase Live' : 'Local Mode');
      if (this.modalStatusLabel) {
        this.modalStatusLabel.textContent = `Status: ${message || (connected ? 'Connected to Supabase Cloud' : 'Local Storage mode (Offline)')}`;
      }
    });

    // Listen to presence events
    this.backend.on('presenceUpdated', (collaborators) => {
      this.renderCollaborators(collaborators);
    });

    // Listen to Realtime database changes
    this.backend.on('postChanged', (payload) => {
      this.handleRealtimePostChange(payload);
    });

    this.backend.on('sectionChanged', (payload) => {
      this.handleRealtimeSectionChange(payload);
    });

    // Header Cloud Button opens modal
    if (this.cloudSyncBtn) {
      this.cloudSyncBtn.addEventListener('click', () => {
        this.openCloudSettingsModal();
      });
    }

    // Modal Close button
    if (this.closeCloudSettingsBtn) {
      this.closeCloudSettingsBtn.addEventListener('click', () => {
        this.closeCloudSettingsModal();
      });
    }

    // Click backdrop to close
    if (this.cloudSettingsModal) {
      this.cloudSettingsModal.addEventListener('click', (e) => {
        if (e.target === this.cloudSettingsModal) {
          this.closeCloudSettingsModal();
        }
      });
    }

    // Toggle API Key visibility
    if (this.toggleKeyVisibilityBtn && this.supabaseKeyInput) {
      this.toggleKeyVisibilityBtn.addEventListener('click', () => {
        const isPw = this.supabaseKeyInput.type === 'password';
        this.supabaseKeyInput.type = isPw ? 'text' : 'password';
        this.toggleKeyVisibilityBtn.textContent = isPw ? '🔒' : '👁';
      });
    }

    // Test Connection Button
    if (this.testConnectionBtn) {
      this.testConnectionBtn.addEventListener('click', async () => {
        const url = (this.supabaseUrlInput?.value || '').trim();
        const key = (this.supabaseKeyInput?.value || '').trim();
        if (!url || !key) {
          this.showToast('Please enter both Supabase URL and Anon Key');
          return;
        }

        this.testConnectionBtn.textContent = 'Testing...';
        this.testConnectionBtn.disabled = true;

        const res = await this.backend.testConnection(url, key);
        this.testConnectionBtn.textContent = 'Test Connection';
        this.testConnectionBtn.disabled = false;

        if (res.success) {
          this.showToast('Connection verified successfully!');
          if (this.modalStatusLabel) this.modalStatusLabel.textContent = 'Status: Verified & Reachable!';
          if (this.modalStatusDot) {
            this.modalStatusDot.className = 'status-indicator-dot connected';
          }
        } else {
          this.showToast(`Test failed: ${res.error}`);
          if (this.modalStatusLabel) this.modalStatusLabel.textContent = `Status: Error - ${res.error}`;
          if (this.modalStatusDot) {
            this.modalStatusDot.className = 'status-indicator-dot disconnected';
          }
        }
      });
    }

    // Form Submit: Save & Connect
    if (this.cloudConfigForm) {
      this.cloudConfigForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = (this.supabaseUrlInput?.value || '').trim();
        const key = (this.supabaseKeyInput?.value || '').trim();
        const bId = (this.supabaseBoardIdInput?.value || 'board-default-physics').trim();

        if (!url || !key) {
          this.showToast('Please enter both Project URL and Anon Key');
          return;
        }

        this.backend.activeBoardId = bId;
        const connectBtn = document.getElementById('saveConnectBtn');
        if (connectBtn) connectBtn.disabled = true;

        this.showToast('Connecting to Supabase...');
        const res = await this.backend.connect(url, key, true);
        if (connectBtn) connectBtn.disabled = false;

        if (res.success) {
          this.closeCloudSettingsModal();
          this.showToast('Connected to Supabase! Syncing data...');
          await this.syncFromCloud();
        } else {
          this.showToast(`Connection failed: ${res.error}`);
        }
      });
    }

    // Disconnect Button
    if (this.disconnectCloudBtn) {
      this.disconnectCloudBtn.addEventListener('click', () => {
        this.backend.disconnect();
        if (this.supabaseUrlInput) this.supabaseUrlInput.value = '';
        if (this.supabaseKeyInput) this.supabaseKeyInput.value = '';
        this.updateCloudStatusUI(false, 'Local Mode');
        this.showToast('Disconnected. Running in local storage mode.');
      });
    }

    // Push Local to Cloud Button
    if (this.pushLocalToCloudBtn) {
      this.pushLocalToCloudBtn.addEventListener('click', async () => {
        if (!this.backend || !this.backend.isConnected) {
          this.showToast('Please connect to Supabase first.');
          return;
        }

        try {
          this.pushLocalToCloudBtn.textContent = 'Pushing...';
          this.pushLocalToCloudBtn.disabled = true;
          await this.backend.pushLocalStateToCloud(this.state, this.backend.activeBoardId);
          this.showToast('Local board state pushed to Supabase!');
        } catch (err) {
          this.showToast(`Push failed: ${err.message}`);
        } finally {
          this.pushLocalToCloudBtn.textContent = 'Push Local to Cloud ⬆';
          this.pushLocalToCloudBtn.disabled = false;
        }
      });
    }

    // Guide Accordion Toggle
    if (this.guideAccordionToggle && this.guideAccordionContent) {
      this.guideAccordionToggle.addEventListener('click', () => {
        const isHidden = this.guideAccordionContent.hidden;
        this.guideAccordionContent.hidden = !isHidden;
        const icon = document.getElementById('guideAccordionIcon');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }

    // Copy Schema Path Button
    if (this.copySchemaPathBtn) {
      this.copySchemaPathBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText('supabase/schema.sql');
        this.copySchemaPathBtn.textContent = 'Copied!';
        setTimeout(() => {
          if (this.copySchemaPathBtn) this.copySchemaPathBtn.textContent = 'Copy Path';
        }, 1500);
      });
    }
  }

  openCloudSettingsModal() {
    if (!this.cloudSettingsModal) return;
    this.cloudSettingsModal.hidden = false;
    if (this.backend) {
      if (this.backend.envConfig) {
        if (this.supabaseUrlInput && !this.supabaseUrlInput.value) this.supabaseUrlInput.value = this.backend.envConfig.url;
        if (this.supabaseKeyInput && !this.supabaseKeyInput.value) this.supabaseKeyInput.value = this.backend.envConfig.anonKey;
        if (this.supabaseBoardIdInput) this.supabaseBoardIdInput.value = this.backend.envConfig.boardId || this.backend.activeBoardId;
      }
      const isConn = this.backend.isConnected;
      if (this.modalStatusDot) {
        this.modalStatusDot.className = `status-indicator-dot ${isConn ? 'connected' : 'disconnected'}`;
      }
      if (this.modalStatusLabel) {
        const sourceText = this.backend.envSource ? ` (via ${this.backend.envSource})` : '';
        this.modalStatusLabel.textContent = `Status: ${isConn ? `Connected to Supabase Cloud${sourceText}` : 'Local Storage mode (Offline)'}`;
      }
    }
  }

  closeCloudSettingsModal() {
    if (this.cloudSettingsModal) {
      this.cloudSettingsModal.hidden = true;
    }
  }

  updateCloudStatusUI(connected, label = '') {
    if (this.cloudStatusDot) {
      this.cloudStatusDot.className = `status-indicator-dot ${connected ? 'connected' : 'disconnected'}`;
    }
    if (this.cloudStatusText) {
      this.cloudStatusText.textContent = label || (connected ? 'Supabase Live' : 'Local Mode');
    }
    if (this.modalStatusDot) {
      this.modalStatusDot.className = `status-indicator-dot ${connected ? 'connected' : 'disconnected'}`;
    }
    if (this.modalStatusLabel) {
      this.modalStatusLabel.textContent = `Status: ${connected ? 'Connected to Supabase Cloud' : 'Local Storage mode (Offline)'}`;
    }
  }

  renderCollaborators(collaborators) {
    if (!this.collaboratorsStrip) return;
    this.collaboratorsStrip.innerHTML = '';

    const seen = new Set();
    const unique = [];
    (collaborators || []).forEach(c => {
      if (c && c.id && !seen.has(c.id)) {
        seen.add(c.id);
        unique.push(c);
      }
    });

    unique.forEach(c => {
      const badge = document.createElement('div');
      badge.className = 'collaborator-avatar-badge';
      badge.title = `${c.name || 'Collaborator'} (Online)`;
      if (c.avatar) {
        badge.innerHTML = `<img src="${this.escapeHtml(c.avatar)}" alt="${this.escapeHtml(c.name || '')}" />`;
      } else {
        badge.textContent = (c.name || 'C').charAt(0).toUpperCase();
        badge.style.backgroundColor = c.color || '#ff1f6d';
      }
      this.collaboratorsStrip.appendChild(badge);
    });
  }

  async syncFromCloud() {
    if (!this.backend || !this.backend.isConnected) return;
    try {
      const cloudData = await this.backend.loadBoard(this.backend.activeBoardId);
      if (cloudData && cloudData.sections && cloudData.sections.length > 0) {
        const localDrafts = this.state.drafts;
        this.state = cloudData;
        this.state.drafts = localDrafts || [];
        this.saveState();
        this.renderBoard();
        this.showToast('Board synchronized with Supabase!');
      } else if (cloudData && (!cloudData.sections || cloudData.sections.length === 0)) {
        // Cloud board exists but is empty, push local state
        await this.backend.pushLocalStateToCloud(this.state, this.backend.activeBoardId);
        this.showToast('Cloud board initialized from local data!');
      }
    } catch (err) {
      console.warn('Error during cloud sync:', err);
    }
  }

  handleRealtimePostChange(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    if (eventType === 'INSERT') {
      const existing = this.findCardById(newRecord.id);
      if (existing) return;

      const targetSection = this.state.sections.find(s => s.id === newRecord.section_id);
      if (targetSection) {
        const card = {
          id: newRecord.id,
          title: newRecord.title || '',
          pinned: !!newRecord.pinned,
          type: newRecord.type || 'text',
          color: newRecord.color || 'white',
          content: newRecord.content || (newRecord.body ? { body: newRecord.body } : null),
          attachment: newRecord.attachment || null,
          customFieldValues: newRecord.custom_field_values || {},
          reactions: newRecord.reactions_count || 0,
          hasReacted: false,
          rank: newRecord.rank || 1000.0,
          comments: []
        };
        targetSection.cards.push(card);
        this.saveState();
        this.renderBoard();
        this.showToast('New post received from collaborator!');
      }
    } else if (eventType === 'UPDATE') {
      const data = this.findCardAndSection(newRecord.id);
      if (!data) return;
      const { card, section } = data;

      card.title = newRecord.title || '';
      card.color = newRecord.color || 'white';
      card.type = newRecord.type || 'text';
      card.content = newRecord.content || (newRecord.body ? { body: newRecord.body } : null);
      card.attachment = newRecord.attachment || null;
      card.customFieldValues = newRecord.custom_field_values || {};
      card.pinned = !!newRecord.pinned;
      card.reactions = newRecord.reactions_count || 0;
      if (typeof newRecord.rank === 'number') card.rank = newRecord.rank;

      if (newRecord.section_id && newRecord.section_id !== section.id) {
        section.cards = section.cards.filter(c => c.id !== card.id);
        const newSec = this.state.sections.find(s => s.id === newRecord.section_id);
        if (newSec) newSec.cards.push(card);
      }

      this.saveState();
      this.renderBoard();
    } else if (eventType === 'DELETE') {
      const data = this.findCardAndSection(oldRecord.id);
      if (!data) return;
      data.section.cards = data.section.cards.filter(c => c.id !== oldRecord.id);
      this.saveState();
      this.renderBoard();
    }
  }

  handleRealtimeSectionChange(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    if (eventType === 'INSERT') {
      if (this.state.sections.some(s => s.id === newRecord.id)) return;
      this.state.sections.push({
        id: newRecord.id,
        title: newRecord.title,
        rank: newRecord.rank || 1000.0,
        isDefault: !!newRecord.is_default,
        cards: []
      });
      this.saveState();
      this.renderBoard();
      this.updateSectionSelectorUI();
    } else if (eventType === 'UPDATE') {
      const sec = this.state.sections.find(s => s.id === newRecord.id);
      if (sec) {
        sec.title = newRecord.title;
        if (typeof newRecord.rank === 'number') sec.rank = newRecord.rank;
        this.saveState();
        this.renderBoard();
        this.updateSectionSelectorUI();
      }
    } else if (eventType === 'DELETE') {
      this.state.sections = this.state.sections.filter(s => s.id !== oldRecord.id);
      this.saveState();
      this.renderBoard();
      this.updateSectionSelectorUI();
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PadlesShelfApp();
});
