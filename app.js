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

// 21 Built-In Media Tools categorized into Padlet's 4 signature colored groups
const TOOL_GROUPS = [
  {
    id: 'purple',
    name: 'Creation & Links',
    groupClass: 'group-purple',
    tools: [
      { id: 'padles', name: 'Padles', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
      { id: 'arcade', name: 'Padles Arcade', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m8-2h.01m3 0h.01"/></svg>' },
      { id: 'upload', name: 'Upload', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' },
      { id: 'link', name: 'Link', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' }
    ]
  },
  {
    id: 'blue',
    name: 'Studio & Drawing',
    groupClass: 'group-blue',
    tools: [
      { id: 'camera', name: 'Camera', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' },
      { id: 'video', name: 'Video recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' },
      { id: 'audio', name: 'Audio recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' },
      { id: 'screen', name: 'Screen recorder', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { id: 'draw', name: 'Draw', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>' }
    ]
  },
  {
    id: 'green',
    name: 'Interactive & Cloud',
    groupClass: 'group-green',
    tools: [
      { id: 'poll', name: 'Poll', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { id: 'gdrive', name: 'Google Drive', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 17 9 7 15 17 3 17"/><polygon points="9 7 15 7 21 17 15 17 9 7"/></svg>' },
      { id: 'onedrive', name: 'OneDrive', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>' },
      { id: 'ai-image', name: 'AI image', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>' },
      { id: 'ai-speech', name: 'AI speech', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' },
      { id: 'album', name: 'Photo album', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' }
    ]
  },
  {
    id: 'orange',
    name: 'Search & Media',
    groupClass: 'group-orange',
    tools: [
      { id: 'image-search', name: 'Image search', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
      { id: 'gif', name: 'GIF', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 8H7v8h3v-3H8.5m6-5v8m3.5-8h-3v8m0-4h2.5"/></svg>' },
      { id: 'youtube', name: 'YouTube', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>' },
      { id: 'spotify', name: 'Spotify', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.208-2.35-1.436-5.308-1.76-8.793-.963-.334.077-.67-.13-.746-.465-.077-.334.13-.67.465-.746 3.808-.87 7.076-.505 9.723 1.11.295.18.387.562.208.856zm1.224-2.724c-.227.37-.714.487-1.084.26-2.69-1.653-6.79-2.132-9.972-1.166-.417.127-.863-.109-.99-.526-.127-.417.109-.863.526-.99 3.633-1.103 8.147-.568 11.26 1.34.37.226.487.713.26 1.082zm.106-2.835C14.692 8.93 9.38 8.754 6.297 9.69c-.495.15-1.023-.13-1.173-.625-.15-.495.13-1.023.625-1.173 3.551-1.077 9.426-.874 13.14 1.33.447.265.592.848.327 1.295-.265.447-.848.592-1.295.327z"/></svg>' },
      { id: 'web-search', name: 'Web search', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
      { id: 'location', name: 'Location', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' }
    ]
  }
];

// Flattened tools list for lookup compatibility
const ALL_TOOLS = TOOL_GROUPS.flatMap(g => g.tools);

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

    // All Tools Modal (Padlet-Authentic 4 Color Groups & Search/URL Bar)
    this.allToolsModal = document.getElementById('allToolsModal');
    this.allToolsSearchInput = document.getElementById('allToolsSearchInput');
    this.allToolsUrlSubmitBtn = document.getElementById('allToolsUrlSubmitBtn');
    this.closeAllToolsBtn = document.getElementById('closeAllToolsBtn');
    this.allToolsGroupsContainer = document.getElementById('allToolsGroupsContainer');
    this.allToolsGrid = this.allToolsGroupsContainer;

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

    // AV Studio Modal Elements (Unified Camera, Video, Audio, Screen Studio)
    this.avRecorderModal = document.getElementById('avRecorderModal');
    this.avRecorderCloseBtn = document.getElementById('avRecorderCloseBtn');
    this.avModePill = document.getElementById('avModePill');
    this.avVideoPreview = document.getElementById('avVideoPreview');
    this.avAudioWaveform = document.getElementById('avAudioWaveform');
    this.avScreenPreflight = document.getElementById('avScreenPreflight');
    this.avScreenMicCheckbox = document.getElementById('avScreenMicCheckbox');
    this.avStartScreenSelectBtn = document.getElementById('avStartScreenSelectBtn');
    this.avPermissionError = document.getElementById('avPermissionError');
    this.avPermissionErrorTitle = document.getElementById('avPermissionErrorTitle');
    this.avPermissionErrorDesc = document.getElementById('avPermissionErrorDesc');
    this.avPermissionRetryBtn = document.getElementById('avPermissionRetryBtn');
    this.avCountdownOverlay = document.getElementById('avCountdownOverlay');
    this.avCountdownNumber = document.getElementById('avCountdownNumber');
    this.avRecordingBadge = document.getElementById('avRecordingBadge');
    this.avRecordingTimerText = document.getElementById('avRecordingTimerText');
    this.avCaptureView = document.getElementById('avCaptureView');
    this.avReviewView = document.getElementById('avReviewView');
    this.avReviewMediaWrap = document.getElementById('avReviewMediaWrap');
    this.avPhotoControls = document.getElementById('avPhotoControls');
    this.avVideoControls = document.getElementById('avVideoControls');
    this.avAudioControls = document.getElementById('avAudioControls');
    this.avScreenControls = document.getElementById('avScreenControls');
    this.avReviewControls = document.getElementById('avReviewControls');
    this.avShutterBtn = document.getElementById('avShutterBtn');
    this.avMirrorToggleBtn = document.getElementById('avMirrorToggleBtn');
    this.avRecordVideoBtn = document.getElementById('avRecordVideoBtn');
    this.avRecordAudioBtn = document.getElementById('avRecordAudioBtn');
    this.avStopScreenBtn = document.getElementById('avStopScreenBtn');
    this.avRetakeBtn = document.getElementById('avRetakeBtn');
    this.avSaveMediaBtn = document.getElementById('avSaveMediaBtn');

    // AV Studio State
    this.avCurrentMode = 'photo';
    this.avActiveStream = null;
    this.avMediaRecorder = null;
    this.avRecordedChunks = [];
    this.avCapturedBlob = null;
    this.avCapturedType = null;
    this.avCapturedPreviewUrl = null;
    this.avAudioContext = null;
    this.avAudioAnalyser = null;
    this.avWaveformAnimFrame = null;
    this.avRecordingInterval = null;
    this.avRecordingSeconds = 0;
    this.avPhotoTimerSeconds = 0;
    this.avCountdownInterval = null;
    this.avIsMirrored = true;

    // Drawing Whiteboard Modal Elements
    this.drawModal = document.getElementById('drawModal');
    this.drawModalCloseBtn = document.getElementById('drawModalCloseBtn');
    this.drawSaveBtn = document.getElementById('drawSaveBtn');
    this.drawStageContainer = document.getElementById('drawStageContainer');
    this.drawCanvas = document.getElementById('drawCanvas');
    this.drawToolbar = document.getElementById('drawToolbar');
    this.drawUndoBtn = document.getElementById('drawUndoBtn');
    this.drawRedoBtn = document.getElementById('drawRedoBtn');
    this.drawBgToggleBtn = document.getElementById('drawBgToggleBtn');
    this.drawClearBtn = document.getElementById('drawClearBtn');
    this.drawColorPalette = document.getElementById('drawColorPalette');

    this.drawCurrentTool = 'pen';
    this.drawStrokeSize = 3;
    this.drawStrokeColor = '#000000';
    this.drawIsDarkBg = false;
    this.drawUndoStack = [];
    this.drawRedoStack = [];
    this.isDrawing = false;
    this.drawLastX = 0;
    this.drawLastY = 0;

    // Interactive Poll Modal Elements
    this.pollModal = document.getElementById('pollModal');
    this.pollModalCloseBtn = document.getElementById('pollModalCloseBtn');
    this.pollSaveBtn = document.getElementById('pollSaveBtn');
    this.pollQuestionInput = document.getElementById('pollQuestionInput');
    this.pollOptionsList = document.getElementById('pollOptionsList');
    this.pollAddOptionBtn = document.getElementById('pollAddOptionBtn');
    this.pollMultipleChoiceToggle = document.getElementById('pollMultipleChoiceToggle');

    // Location Map Picker Modal Elements
    this.locationModal = document.getElementById('locationModal');
    this.locationModalCloseBtn = document.getElementById('locationModalCloseBtn');
    this.locationSaveBtn = document.getElementById('locationSaveBtn');
    this.locationSearchInput = document.getElementById('locationSearchInput');
    this.locationResultsDropdown = document.getElementById('locationResultsDropdown');
    this.locationMapFrame = document.getElementById('locationMapFrame');
    this.locationPinLabel = document.getElementById('locationPinLabel');
    this.selectedLocation = null;
    this.locationSearchTimeout = null;

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
    this.initEmojiPicker();
    this.initCardDetailModal();
    this.initScheduleModal();
    this.initAllToolsModal();
    this.initAvRecorderModal();
    this.initDrawModal();
    this.initPollModal();
    this.initLocationModal();
    this.initCustomFieldBuilder();
    this.initCloudBackendUI();
    this.initSlideshow();
    this.initShareDrawer();
    this.initSettingsDrawer();
    this.applyLoadedSettings();
    this.initMoreDrawer();
    this.attachEventListeners();
    this.resolveStoredAttachments();

    if (this.backend && this.backend.isConnected) {
      this.syncFromCloud();
    }
  }

  async resolveStoredAttachments() {
    if (!window.padlesMediaDB) return;

    // Resolve offline attachments on cards
    (this.state.sections || []).forEach(sec => {
      (sec.cards || []).forEach(async card => {
        if (card.attachment && card.attachment.storageId && (!card.attachment.url || card.attachment.url.startsWith('blob:'))) {
          const freshUrl = await window.padlesMediaDB.resolveUrl(card.attachment.storageId);
          if (freshUrl) {
            card.attachment.url = freshUrl;
            if (card.attachment.thumbnailUrl && card.attachment.thumbnailUrl.startsWith('blob:')) {
              card.attachment.thumbnailUrl = freshUrl;
            }
            this.renderBoard();
          }
        }
      });
    });

    // Resolve on drafts
    (this.state.drafts || []).forEach(async draft => {
      if (draft.attachment && draft.attachment.storageId && (!draft.attachment.url || draft.attachment.url.startsWith('blob:'))) {
        const freshUrl = await window.padlesMediaDB.resolveUrl(draft.attachment.storageId);
        if (freshUrl) {
          draft.attachment.url = freshUrl;
          if (draft.id === this.activeDraftId) {
            this.composerState.attachment = draft.attachment;
            this.updateAttachmentPreviewUI();
          }
        }
      }
    });
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
    const att = card.attachment;
    if (att) {
      if (att.type === 'poll') {
        const votedOptions = JSON.parse(localStorage.getItem(`padles_voted_${card.id}`) || '[]');
        const totalVotes = att.totalVotes || 0;
        let optionsHtml = '';
        (att.options || []).forEach(opt => {
          const isVoted = votedOptions.includes(opt.id);
          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          optionsHtml += `
            <button type="button" class="card-poll-option-btn ${isVoted ? 'has-voted' : ''}" data-poll-card="${card.id}" data-opt-id="${opt.id}">
              <div class="card-poll-bar-fill" style="width: ${pct}%"></div>
              <span class="card-poll-option-text">${this.escapeHtml(opt.text)}</span>
              <span class="card-poll-option-pct">${pct}% (${opt.votes || 0})</span>
            </button>
          `;
        });
        attachmentHtml = `
          <div class="card-poll-container">
            <h4 class="card-poll-question">${this.escapeHtml(att.question || 'Poll')}</h4>
            <div class="card-poll-options">${optionsHtml}</div>
            <div class="card-poll-footer">${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'}${att.allowMultiple ? ' • Multiple choices allowed' : ''}</div>
          </div>
        `;
      } else if (att.type === 'audio') {
        attachmentHtml = `
          <div class="card-audio-container">
            <audio src="${this.escapeHtml(att.url)}" controls preload="metadata"></audio>
          </div>
        `;
      } else if (att.type === 'location') {
        const embedUrl = att.embedUrl || (att.latitude && att.longitude ? `https://www.openstreetmap.org/export/embed.html?bbox=${att.longitude - 0.01}%2C${att.latitude - 0.01}%2C${att.longitude + 0.01}%2C${att.latitude + 0.01}&layer=mapnik&marker=${att.latitude}%2C${att.longitude}` : '');
        attachmentHtml = `
          <div class="card-location-container">
            ${embedUrl ? `<div class="card-location-map-wrap"><iframe src="${this.escapeHtml(embedUrl)}" loading="lazy"></iframe></div>` : ''}
            <div class="card-location-info">
              <span class="card-location-title">${this.escapeHtml(att.title || 'Location')}</span>
              ${att.mapUrl ? `<a href="${this.escapeHtml(att.mapUrl)}" target="_blank" rel="noopener noreferrer" class="card-location-link">Open Map ↗</a>` : ''}
            </div>
          </div>
        `;
      } else if (att.thumbnailUrl || att.url) {
        const thumb = att.thumbnailUrl || att.url;
        if (att.category === 'iamascientist.info' || card.type === 'link') {
          attachmentHtml = `
            <div class="media-attachment-link">
              <img src="${this.escapeHtml(thumb)}" class="link-thumb" alt="${this.escapeHtml(att.caption || '')}" />
              <div class="youtube-badge">${this.escapeHtml(att.category || 'link')}</div>
            </div>
          `;
        } else if (att.type === 'video' || att.provider === 'YouTube' || att.category === 'Video Recording' || att.category === 'Screen Recording') {
          attachmentHtml = `
            <div class="media-attachment-video">
              <img src="${this.escapeHtml(thumb)}" class="video-thumb" alt="${this.escapeHtml(att.caption || '')}" />
              <div class="play-overlay-btn" title="Play">
                <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M7 23.54V8.46c0-2.017 2.152-3.304 3.929-2.349l14.033 7.54c1.873 1.006 1.873 3.692 0 4.698l-14.033 7.54C9.152 26.844 7 25.557 7 23.54"/></svg>
              </div>
              <div class="youtube-badge">${this.escapeHtml(att.provider || att.category || 'Video')}</div>
            </div>
          `;
        } else {
          attachmentHtml = `
            <div class="media-attachment-image">
              <img src="${this.escapeHtml(thumb)}" class="link-thumb" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 8px;" alt="${this.escapeHtml(att.caption || '')}" />
            </div>
          `;
        }
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

    // Render post emoji reactions pills + Add reaction button
    const emojiReactions = card.emojiReactions || {};
    let reactionPillsHtml = '';
    const emojiEntries = Object.entries(emojiReactions);

    emojiEntries.forEach(([emoji, info]) => {
      if (info && info.count > 0) {
        const hex = emoji.codePointAt(0).toString(16);
        reactionPillsHtml += `
          <button type="button" class="reaction-pill ${info.userReacted ? 'is-reacted' : ''}" data-emoji="${this.escapeHtml(emoji)}" data-testid="surfacePostReactionEmojiAccumulatedReactionsButton-${hex}" aria-label="Reaction ${emoji} count ${info.count}">
            <span class="reaction-pill-emoji">${emoji}</span>
            <span class="reaction-pill-count">${info.count}</span>
          </button>
        `;
      }
    });

    // If card.reactions > 0 but emojiReactions is empty (legacy data)
    if (emojiEntries.length === 0 && card.reactions > 0) {
      reactionPillsHtml += `
        <button type="button" class="reaction-pill ${card.hasReacted ? 'is-reacted' : ''}" data-emoji="❤️" data-testid="surfacePostReactionEmojiAccumulatedReactionsButton-2764" aria-label="Reaction ❤️ count ${card.reactions}">
          <span class="reaction-pill-emoji">❤️</span>
          <span class="reaction-pill-count">${card.reactions}</span>
        </button>
      `;
    }

    const addReactionSvg = `
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
    `;

    const bottomBarHtml = `
      <div class="card-bottom-bar">
        <div class="card-reactions-group" data-testid="surfacePostReactionEmoji">
          ${reactionPillsHtml}
          <button type="button" class="reaction-btn reaction-add-btn" title="Add reaction" aria-label="Add reaction" data-testid="surfacePostReactionEmojiAddReactionButton">
            ${addReactionSvg}
          </button>
        </div>
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

    // Reaction pill clicks (toggles specific emoji reaction)
    el.querySelectorAll('.reaction-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = pill.dataset.emoji;
        if (emoji) this.toggleCardEmojiReaction(card.id, emoji);
      });
    });

    // Add reaction button click (opens 336px x 377px authentic Padlet emoji picker)
    const addReactBtn = el.querySelector('.reaction-add-btn');
    if (addReactBtn) {
      addReactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openEmojiPicker(addReactBtn, card.id);
      });
    }

    // Poll option voting clicks
    el.querySelectorAll('.card-poll-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.dataset.pollCard;
        const optId = btn.dataset.optId;
        if (cardId && optId) {
          this.voteOnPoll(cardId, optId);
        }
      });
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
    const newHeight = Math.max(38, this.bodyInput.scrollHeight);
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
    if (this.dockBulkActionWrapper) {
      this.dockBulkActionWrapper.hidden = totalDrafts < 2;
    }

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
    this.closeEmojiPicker();
  }

  /* ========================================================================
     Padlet-Authentic 336px x 377px Emoji Picker Popover (8 Categories & Reactions)
     ======================================================================== */

  initEmojiPicker() {
    this.emojiPickerPopover = document.getElementById('emojiPickerPopover');
    this.emojiSearchInput = document.getElementById('emojiSearchInput');
    this.emojiSearchClearBtn = document.getElementById('emojiSearchClearBtn');
    this.emojiPickerContent = document.getElementById('emojiPickerContent');
    this.emojiCategoryTabs = document.getElementById('emojiCategoryTabs');

    if (!this.emojiPickerPopover) return;

    this.emojiKeywords = {
      '😀': 'grinning face happy smile laugh',
      '😃': 'smiling face big eyes happy joy',
      '😄': 'smiling face open mouth laughing',
      '😁': 'beaming face teeth smile grin',
      '😆': 'grinning squinting laughing lol',
      '😅': 'sweat smile nervous relief',
      '😂': 'tears joy laughing haha funny lol',
      '🤣': 'rofl rolling floor laughing lol',
      '😊': 'smiling blush warm kind happy',
      '😇': 'halo angel innocent blessed',
      '🙂': 'slightly smiling smile fine okay',
      '🙃': 'upside down silly sarcasm irony',
      '😉': 'winking wink flirt playful',
      '😌': 'relieved calm peaceful relaxed',
      '😍': 'heart eyes in love adore crush',
      '🥰': 'smiling hearts loved affectionate',
      '😘': 'blow kiss kissing love romantic',
      '😗': 'kissing kiss whistle',
      '😙': 'kissing smiling eyes kiss blush',
      '😚': 'kissing closed eyes blush kiss',
      '😋': 'yum delicious tasty licking food',
      '😛': 'tongue playful cheeky silly',
      '😝': 'squinting tongue lol funny tease',
      '😜': 'winking tongue crazy wink wacky',
      '🤪': 'zany face wild crazy goofy',
      '🤨': 'raised eyebrow skeptic doubt suspicious',
      '🧐': 'monocle classy curious inspect study',
      '🤓': 'nerd geek glasses smart study',
      '😎': 'sunglasses cool stylish shades awesome',
      '🥸': 'disguise mustache glasses undercover incognito',
      '🤩': 'star struck excited amazed awesome',
      '🥳': 'partying party celebration happy birthday celebrate',
      '😏': 'smirk smirking smug flirt suggestive',
      '😒': 'unamused annoyed displeased unimpressed',
      '😞': 'disappointed sad down upset regret',
      '😔': 'pensive thoughtful sad mournful',
      '😟': 'worried concerned anxious nervous',
      '😕': 'confused puzzled hesitant unsure',
      '🙁': 'slightly frowning sad frown',
      '☹️': 'frowning sad sorrow unhappy',
      '😣': 'persevering struggle upset pain',
      '😖': 'confounded upset distressed irritated',
      '😫': 'tired weary exhausted stressed',
      '😩': 'weary crying upset tired despair',
      '🥺': 'pleading begging cute puppy eyes please',
      '😢': 'crying tear sad upset grief',
      '😭': 'loudly crying sob bawling tears upset',
      '😤': 'triumph steam angry determined pride',
      '😠': 'angry mad annoyed furious irritated',
      '😡': 'pouting rage furious mad red',
      '🤬': 'cursing swearing angry symbols mad',
      '🤯': 'exploding head mind blown shocked amazed',
      '😳': 'flushed embarrassed surprised blush wide eyes',
      '🥵': 'hot face sweat heat summer warm',
      '🥶': 'cold face freezing ice winter frost',
      '😱': 'screaming fear scream terrified scared shock',
      '😨': 'fearful scared worried anxious afraid',
      '😰': 'anxious sweat scared worried blue',
      '😥': 'sad relieved whew phew close call',
      '😓': 'downcast sweat discouraged overwhelmed',
      '🤗': 'hugging hug warm embrace welcome open',
      '🤔': 'thinking ponder wonder consider hmm question',
      '🫣': 'peeking eye scared curious hiding peek',
      '🤭': 'hand mouth giggle oops chuckle shy',
      '🫢': 'open eyes hand mouth gasp shocked surprised',
      '🫡': 'saluting salute respect yes sir honor',
      '🤫': 'shushing quiet secret whisper silence shh',
      '🫠': 'melting melt hot sarcasm dissolving',
      '🤥': 'lying liar pinocchio nose deception',
      '😶': 'no mouth silent blank speechless mute',
      '🫥': 'dotted face invisible disappearing unseen fade',
      '😐': 'neutral poker straight face deadpan fine',
      '🫤': 'diagonal mouth skeptical unsure confused meh',
      '😑': 'expressionless blank emotionless flat done',
      '🫨': 'shaking vibrating shock earthquake tremble',
      '😬': 'grimacing awkward yikes tense nervous',
      '🙄': 'rolling eyes annoyed Whatever bored sarcasm',
      '😯': 'hushed surprised gasp astonishment',
      '😦': 'frowning open mouth stunned surprise',
      '😧': 'anguished shocked alarmed hurt',
      '😮': 'open mouth wow oh surprise gasp',
      '😲': 'astonished shocked amazed stunned',
      '🥱': 'yawning yawn tired sleepy boring bedtime',
      '😴': 'sleeping sleep zzz tired goodnight bedtime',
      '🤤': 'drooling drool hungry delicious desire craving',
      '😪': 'sleepy tired snot bubble resting dozing',
      '😵': 'dizzy knocked out stunned dead unconscious',
      '😵‍💫': 'spiral eyes dizzy disoriented hypnotized confused',
      '🤐': 'zipper mouth secret quiet silent locked',
      '🥴': 'woozy drunk tipsy dizzy confused dazed',
      '🤢': 'nauseated sick gross disgust ill green',
      '🤮': 'vomiting vomit puke throw up barf sick',
      '🤧': 'sneezing sneeze tissue cold sick allergy',
      '😷': 'medical mask sick covid illness virus doctor',
      '🤒': 'thermometer sick fever temperature ill',
      '🤕': 'bandage head hurt injured pain wound',
      '🤑': 'money face rich cash wealthy dollar profit',
      '🤠': 'cowboy hat western yeehaw ranch sheriff',
      '😈': 'devil purple horns evil mischievous smirk',
      '👿': 'angry devil demon upset bad furious',
      '👹': 'ogre oni monster japanese mask folklore',
      '👺': 'goblin tengu red mask long nose japanese',
      '🤡': 'clown circus funny scary party joke',
      '💩': 'poop pile poo brown stinky funny smiling',
      '👻': 'ghost spooky halloween spirit boo phantom',
      '💀': 'skull dead skeleton dying lol dead funny',
      '☠️': 'skull crossbones poison danger death pirate',
      '👽': 'alien ufo extraterrestrial martian sci fi space',
      '👾': 'alien monster video game 8bit pixel retro arcade',
      '🤖': 'robot android sci fi tech machine cyber',
      '🎃': 'jack o lantern pumpkin halloween fall spooky autumn',
      '😺': 'grinning cat smiling kitty meow feline pet',
      '😸': 'grinning cat smiling eyes meow joyful kitty',
      '😹': 'cat tears joy laughing kitty lol funny',
      '😻': 'heart eyes cat love kitten crush feline',
      '😼': 'cat wry smile smirk kitty cheeky sly',
      '😽': 'kissing cat kiss kitty feline sweet',
      '🙀': 'weary cat scream scared shock frightened horror',
      '😿': 'crying cat sad tear kitten unhappy weep',
      '😾': 'pouting cat grumpy mad angry upset feline',
      '👋': 'wave waving hello goodbye bye hi greeting',
      '🤚': 'raised back hand stop talk to hand pause',
      '🖐️': 'hand splayed five fingers stop high five',
      '✋': 'raised hand stop halt high five question answer',
      '🖖': 'vulcan salute spock star trek live long prosper',
      '👌': 'ok okay hand perfect excellent correct nice',
      '🤌': 'pinched fingers italian chef kiss what do you mean',
      '🤏': 'pinching hand small little tiny bit amount',
      '✌️': 'victory hand peace two signs deuces v sign',
      '🤞': 'crossed fingers good luck hope wish promise',
      '🫰': 'finger heart love kpop korean heart snap',
      '🤟': 'love you hand gesture sign language ily rock',
      '🤘': 'sign horns rock on metal concert party music',
      '🤙': 'call me hang loose shaka surfing phone chill',
      '👈': 'point left pointer finger left direction west',
      '👉': 'point right pointer finger right direction east',
      '👆': 'point up pointing finger top up north look',
      '🖕': 'middle finger rude insult offensive gesture',
      '👇': 'point down pointing finger bottom down south',
      '☝️': 'index pointing up finger one attention listen point',
      '🫵': 'pointing index viewer you point target choice',
      '👍': 'thumbs up good like approve yes agree great positive',
      '👎': 'thumbs down bad dislike disapprove no negative poor',
      '✊': 'raised fist solidarity power protest punch strength',
      '👊': 'oncoming fist bump bro punch fight hit impact',
      '🤛': 'left facing fist bump punch greeting hit',
      '🤜': 'right facing fist bump punch greeting hit',
      '👏': 'clapping hands applause bravo praise good job celebrate',
      '🙌': 'raising hands celebrate praise hooray yay hallelujah',
      '🫶': 'heart hands love care affection support kindness',
      '👐': 'open hands hug welcome jazz hands honest care',
      '🤲': 'palms up together pray prayer ask blessing hold',
      '🤝': 'handshake agreement deal partnership greeting meet shaking',
      '🙏': 'folded hands pray thank you please gratitude namaste hope',
      '❤️': 'red heart love passion romance affection favorite like',
      '🧡': 'orange heart care friendship warm energy love',
      '💛': 'yellow heart friendship happy bright kindness joy',
      '💚': 'green heart nature health envy eco friendly luck',
      '💙': 'blue heart trust peace loyalty calm harmony cold',
      '💜': 'purple heart royalty luxury compassion affection kpop',
      '🖤': 'black heart dark gothic sorrow grief edgy style',
      '🤍': 'white heart pure peace angel innocence clean calm',
      '🤎': 'brown heart chocolate warmth earth cocoa skin',
      '💔': 'broken heart breakup sad hurt heartbreak divorce grief',
      '❤️‍🔥': 'heart on fire passionate love burning desire intense',
      '❤️‍🩹': 'mending heart healing recovery better bandage heal',
      '❣️': 'heart exclamation love punctuation point emphasis',
      '💕': 'two hearts love sweet floating pink romance couple',
      '💞': 'revolving hearts love affection revolving swirling spin',
      '💓': 'beating heart pulse heartbeat alive excite vibration',
      '💗': 'growing heart expanding love flutter affection triple',
      '💖': 'sparkling heart shiny love glitter magical sweet',
      '💘': 'heart with arrow cupid romance love crush Valentine',
      '💝': 'heart with ribbon gift present wrapped love surprise',
      '💟': 'heart decoration square badge purple motif sign',
      '✨': 'sparkles stars magic shiny clean glitter twinkle bright',
      '⭐': 'star gold favorite rating celestial yellow space review',
      '🌟': 'glowing star shine bright sparkle special award achievement',
      '🔥': 'fire flame hot lit viral burn trend heat passion',
      '💥': 'collision explosion bang boom crash hit impact blast',
      '💯': 'hundred points 100 perfect score keep it real complete',
      '🎉': 'party popper celebration congrats celebrate congrats tada',
      '🎊': 'confetti ball celebration party festival joy fun',
      '💡': 'light bulb idea inspiration smart solution electric bright',
      '🚀': 'rocket ship launch space fast speed startup boost crypto moon',
      '🏆': 'trophy winner first place gold champion achievement award prize',
      '🎯': 'bullseye direct hit target goal focus aim accurate darts',
      '👀': 'eyes looking see watch peep curious look examine inspect',
      '🌈': 'rainbow pride colorful weather hope nature sky spectrum',
      '☀️': 'sun sunny summer bright warm daylight weather morning',
      '⚡': 'high voltage lightning bolt zap shock thunder power fast energy',
      '☕': 'coffee hot drink tea morning breakfast cafe espresso mug',
      '🍕': 'pizza slice pepperoni cheese italian food snack lunch fast food',
      '🍔': 'hamburger burger fast food beef cheeseburger snack meal',
      '🐶': 'dog puppy pet canine animal cute best friend barking',
      '🐱': 'cat kitten feline pet animal cute meow purr kitty'
    };

    this.emojiCategories = [
      {
        id: 'people',
        name: 'Smileys & People',
        emojis: [
          '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰',
          '😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳',
          '😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤',
          '😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🫣','🤭',
          '🫢','🫡','🤫','🫠','🤥','😶','🫥','😐','🫤','😑','🫨','😬','🙄','😯','😦','😧',
          '😮','😲','🥱','😴','🤤','😪','😵','😵‍💫','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕',
          '🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃','😺',
          '😸','😹','😻','😼','😽','🙀','😿','😾','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏',
          '✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊',
          '👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏'
        ]
      },
      {
        id: 'nature',
        name: 'Animals & Nature',
        emojis: [
          '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵',
          '🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗',
          '🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🕸️',
          '🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳',
          '🐋','🦈','🦭','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘',
          '🌲','🌳','🌴','🌱','🌿','☘️','🍀','🪴','🎋','🍃','🍂','🍁','🍄','🌾','💐','🌷',
          '🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','⭐','🌟','✨','⚡','💥','🔥','🌈','☀️',
          '🌤️','⛅','☁️','🌧️','⛈️','🌩️','🌨️','❄️','⛄','💨','💧','🫧','🌊'
        ]
      },
      {
        id: 'food',
        name: 'Food & Drinks',
        emojis: [
          '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥',
          '🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐',
          '🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔',
          '🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟',
          '🍤','🍙','🍚','🍘','🍥','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭',
          '🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','☕','🍵','🧃','🥤','🧋','🍺','🍻',
          '🥂','🍷','🍸','🍹','🍾','🧊'
        ]
      },
      {
        id: 'activity',
        name: 'Activities',
        emojis: [
          '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🏓','🏸','🏒','🏏','🥅','⛳','🪁',
          '🏹','🎣','🤿','🥊','🥋','🛹','🛼','⛸️','🎿','⛷️','🏂','🏋️','🤸','⛹️','🤺','🤾',
          '🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🎫',
          '🎟️','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','♟️',
          '🎯','🎳','🎮','🎰','🧩'
        ]
      },
      {
        id: 'travel',
        name: 'Travel & Places',
        emojis: [
          '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🛴','🚲','🛵',
          '🏍️','🚨','🚔','🚍','🚘','🚠','🚃','🚋','🚂','🚆','🚇','🚊','🚁','✈️','🛫','🛬',
          '🚀','🛸','⛵','🚤','🛳️','⛴️','🚢','⚓','⛽','🚧','🚥','🚦','🗿','🗽','🗼','🏰',
          '🏟️','🎡','🎢','🏖️','🏝️','🌋','⛰️','🏔️','🏕️','⛺','🏠','🏡','🏢','🏬',
          '🏥','🏦','🏨','🏪','🏫','🏛️','⛪','🕌','⛩️'
        ]
      },
      {
        id: 'objects',
        name: 'Objects',
        emojis: [
          '⌚','📱','📲','💻','⌨️','🖥️','🖨️','🖱️','🕹️','💾','💿','📀','📷','📸','📹','🎥',
          '📽️','📞','☎️','📟','📠','📺','📻','🎙️','⏰','🕰️','⌛','⏳','📡','🔋','🔌','💡',
          '🔦','🕯️','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🔧','🔨',
          '⚒️','🛠️','⛏️','🔩','⚙️','🧱','⛓️','🧲','🔫','💣','🧨','🔪','🗡️','⚔️','🛡️','🔮',
          '📿','💈','⚗️','🔭','🔬','🩹','🩺','💊','💉','🧬','🧹','🧺','🧻','🚽','🚿','🛁',
          '🧼','🪥','🪒','🧽','🧴','🔑','🗝️','🚪','🪑','🛏️','🧸','🖼️','🛍️','🛒','🎁','🎈',
          '🎀','🎉','🎊','✉️','📩','📨','📧','💌','📦','🏷️','📜','📃','📄','📑','🧾','📊',
          '📈','📉','📋','📁','📂','🗂️','📰','📓','📕','📗','📘','📙','📚','📖','🔖','🔗',
          '📎','🖇️','📐','📏','📌','📍','✂️','🖊️','🖋️','✒️','🖌️','🖍️','📝','✏️','🔍','🔎',
          '🔒','🔓'
        ]
      },
      {
        id: 'symbols',
        name: 'Symbols',
        emojis: [
          '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓',
          '💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐',
          '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','☢️','☣️','📴',
          '📳','🈶','🈚','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🅾️',
          '🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','❗️','❕','❓','❔','‼️','⁉️',
          '⚠️','🚸','🔱','⚜️','🔰','♻️','✅','❇️','✳️','❎','🌐','💠','🌀','💤','🏧','🚾',
          '♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','🚻','🚮','🎦','📶','🈁',
          '🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣',
          '🔟','🔢','#️⃣','*️⃣','▶️','⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️',
          '🔼','🔽','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','↪️','↩️','⤴️',
          '⤵️','🔀','🔁','🔂','🎵','🎶','➕','➖','➗','✖️','🟰','♾️','💲','💱','™️','©️',
          '®️','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔸',
          '🔹','🔶','🔷','▫️','▪️','◽','◾','◻️','◼️','🟥','🟧','🟨','🟩','🟦','🟪','⬛',
          '⬜','🟫','🔈','🔇','🔉','🔊','🔔','🔕','📣','📢','💬','💭','🗯️','♠️','♣️','♥️',
          '♦️','🃏'
        ]
      },
      {
        id: 'flags',
        name: 'Flags',
        emojis: [
          '🚩','🎌','🏁','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇦🇺','🇧🇷','🇨🇦','🇨🇳','🇩🇪','🇪🇸','🇫🇷','🇬🇧',
          '🇮🇳','🇮🇩','🇮🇹','🇯🇵','🇰🇷','🇲🇽','🇳🇱','🇵🇭','🇷🇺','🇸🇦','🇸🇬','🇺🇸','🇻🇳','🇿🇦'
        ]
      }
    ];

    this.renderEmojiPickerGrid('');

    // Tab buttons
    this.emojiCategoryTabs.querySelectorAll('.emoji-cat-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const catId = tab.dataset.cat;
        this.selectEmojiCategory(catId);
      });
    });

    // Search filter
    this.emojiSearchInput.addEventListener('input', () => {
      const q = this.emojiSearchInput.value.trim().toLowerCase();
      this.emojiSearchClearBtn.hidden = !q;
      this.renderEmojiPickerGrid(q);
    });

    // Clear search
    this.emojiSearchClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.emojiSearchInput.value = '';
      this.emojiSearchClearBtn.hidden = true;
      this.renderEmojiPickerGrid('');
    });

    // Prevent clicks inside picker from bubbling
    this.emojiPickerPopover.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  renderEmojiPickerGrid(filterText = '') {
    if (!this.emojiPickerContent) return;
    let html = '';
    const q = filterText.toLowerCase();

    this.emojiCategories.forEach(cat => {
      let filtered = cat.emojis;
      if (q) {
        filtered = cat.emojis.filter(em => {
          const kw = this.emojiKeywords && this.emojiKeywords[em] ? this.emojiKeywords[em] : '';
          return cat.name.toLowerCase().includes(q) || kw.toLowerCase().includes(q) || em === q;
        });
      }

      if (filtered.length > 0) {
        html += `<div class="emoji-category-section" id="emojiSec_${cat.id}">`;
        html += `<div class="emoji-category-title">${this.escapeHtml(cat.name)}</div>`;
        html += `<div class="emoji-grid">`;
        filtered.forEach(em => {
          const hex = em.codePointAt(0).toString(16);
          html += `<button type="button" class="emoji-item-btn" data-emoji="${this.escapeHtml(em)}" data-testid="emoji-icon-${hex}" aria-label="Emoji ${em}">${em}</button>`;
        });
        html += `</div></div>`;
      }
    });

    if (!html) {
      html = `<div style="text-align: center; color: #9ca3af; padding: 40px 16px; font-size: 13px;">No emojis found</div>`;
    }

    this.emojiPickerContent.innerHTML = html;

    // Attach click listeners to all emoji buttons
    this.emojiPickerContent.querySelectorAll('.emoji-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const em = btn.dataset.emoji;
        if (em && this.activeEmojiCardId) {
          this.toggleCardEmojiReaction(this.activeEmojiCardId, em);
          this.closeEmojiPicker();
        }
      });
    });
  }

  selectEmojiCategory(catId) {
    if (!this.emojiCategoryTabs) return;
    this.emojiCategoryTabs.querySelectorAll('.emoji-cat-tab').forEach(t => {
      t.classList.toggle('is-active', t.dataset.cat === catId);
    });
    const sec = document.getElementById(`emojiSec_${catId}`);
    if (sec && this.emojiPickerContent) {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openEmojiPicker(anchorElement, cardId) {
    if (!this.emojiPickerPopover) return;
    this.closeAllPopovers();

    this.activeEmojiCardId = cardId;
    if (this.emojiSearchInput) {
      this.emojiSearchInput.value = '';
    }
    if (this.emojiSearchClearBtn) {
      this.emojiSearchClearBtn.hidden = true;
    }
    this.renderEmojiPickerGrid('');

    // Position popover intelligently relative to anchorElement
    const rect = anchorElement.getBoundingClientRect();
    const popoverWidth = 336;
    const popoverHeight = 377;
    const margin = 8;

    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - margin) {
      left = window.innerWidth - popoverWidth - margin;
    }
    if (left < margin) left = margin;

    let top = rect.bottom + 6;
    if (top + popoverHeight > window.innerHeight - margin) {
      top = rect.top - popoverHeight - 6;
    }
    if (top < margin) top = margin;

    this.emojiPickerPopover.style.left = `${Math.round(left)}px`;
    this.emojiPickerPopover.style.top = `${Math.round(top)}px`;
    this.emojiPickerPopover.hidden = false;
  }

  closeEmojiPicker() {
    if (this.emojiPickerPopover) {
      this.emojiPickerPopover.hidden = true;
      this.activeEmojiCardId = null;
    }
  }

  toggleCardEmojiReaction(cardId, emoji) {
    const card = this.findCardById(cardId);
    if (!card) return;

    if (!card.emojiReactions || typeof card.emojiReactions !== 'object') {
      card.emojiReactions = {};
      if (card.reactions > 0) {
        card.emojiReactions['❤️'] = { count: card.reactions, userReacted: !!card.hasReacted };
      }
    }

    if (card.emojiReactions[emoji]) {
      if (card.emojiReactions[emoji].userReacted) {
        card.emojiReactions[emoji].count -= 1;
        card.emojiReactions[emoji].userReacted = false;
        if (card.emojiReactions[emoji].count <= 0) {
          delete card.emojiReactions[emoji];
        }
      } else {
        card.emojiReactions[emoji].count += 1;
        card.emojiReactions[emoji].userReacted = true;
      }
    } else {
      card.emojiReactions[emoji] = { count: 1, userReacted: true };
    }

    // Update aggregate reactions count & user reacted state
    const allCounts = Object.values(card.emojiReactions).map(r => r.count || 0);
    card.reactions = allCounts.reduce((a, b) => a + b, 0);
    card.hasReacted = Object.values(card.emojiReactions).some(r => r.userReacted);

    this.saveState();
    this.renderBoard();
    if (this.cardDetailModal && !this.cardDetailModal.hidden && this.activeDetailCardId === cardId) {
      if (this.detailReactionBtn) {
        this.detailReactionBtn.classList.toggle('has-reacted', !!card.hasReacted);
      }
      if (this.detailReactionCount) {
        this.detailReactionCount.textContent = card.reactions > 0 ? card.reactions : '+';
      }
    }
    this.showToast('Reaction updated');

    if (this.backend && this.backend.addReaction) {
      this.backend.addReaction(card.id);
    }
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
      this.detailReactionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = this.findCardById(this.activeDetailCardId);
        if (!card) return;
        this.openEmojiPicker(this.detailReactionBtn, card.id);
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
      if (card.attachment) {
        const att = card.attachment;
        if (att.type === 'poll') {
          const votedOptions = JSON.parse(localStorage.getItem(`padles_voted_${card.id}`) || '[]');
          const totalVotes = att.totalVotes || 0;
          let optionsHtml = '';
          (att.options || []).forEach(opt => {
            const isVoted = votedOptions.includes(opt.id);
            const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
            optionsHtml += `
              <button type="button" class="card-poll-option-btn ${isVoted ? 'has-voted' : ''}" data-poll-card="${card.id}" data-opt-id="${opt.id}" style="padding:12px 16px; font-size:14px; margin-bottom:8px;">
                <div class="card-poll-bar-fill" style="width: ${pct}%"></div>
                <span class="card-poll-option-text">${this.escapeHtml(opt.text)}</span>
                <span class="card-poll-option-pct">${pct}% (${opt.votes || 0})</span>
              </button>
            `;
          });
          this.detailMediaCanvas.innerHTML = `
            <div style="width:100%; max-width:520px; background:#ffffff; border-radius:18px; padding:24px; box-shadow:0 16px 40px rgba(0,0,0,0.5); color:#111111;">
              <h2 style="font-size:1.35rem; font-weight:700; margin-bottom:16px; color:#111111;">${this.escapeHtml(att.question || 'Poll')}</h2>
              <div class="card-poll-options">${optionsHtml}</div>
              <div style="font-size:13px; color:#6b7280; margin-top:10px; text-align:right;">
                ${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'}${att.allowMultiple ? ' • Multiple choices allowed' : ''}
              </div>
            </div>
          `;
          this.detailMediaCanvas.querySelectorAll('.card-poll-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const cardId = btn.dataset.pollCard;
              const optId = btn.dataset.optId;
              if (cardId && optId) this.voteOnPoll(cardId, optId);
            });
          });
        } else if (att.type === 'audio') {
          this.detailMediaCanvas.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:20px; width:90%; max-width:520px; background:rgba(255,255,255,0.08); backdrop-filter:blur(16px); padding:36px 24px; border-radius:24px;">
              <div style="width:80px; height:80px; border-radius:50%; background:rgba(222,49,99,0.25); color:#ff4081; display:flex; align-items:center; justify-content:center;">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" stroke-width="2"/></svg>
              </div>
              <h3 style="color:#ffffff; font-size:18px; margin:0;">${this.escapeHtml(att.title || 'Audio Reflection')}</h3>
              <audio src="${this.escapeHtml(att.url)}" controls autoplay style="width:100%; max-width:440px;"></audio>
            </div>
          `;
        } else if (att.type === 'location') {
          const embedUrl = att.embedUrl || (att.latitude && att.longitude ? `https://www.openstreetmap.org/export/embed.html?bbox=${att.longitude - 0.01}%2C${att.latitude - 0.01}%2C${att.longitude + 0.01}%2C${att.latitude + 0.01}&layer=mapnik&marker=${att.latitude}%2C${att.longitude}` : '');
          this.detailMediaCanvas.innerHTML = `
            <div style="width:90%; max-width:720px; height:60vh; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 16px 40px rgba(0,0,0,0.5); display:flex; flex-direction:column;">
              ${embedUrl ? `<iframe src="${this.escapeHtml(embedUrl)}" style="flex:1; width:100%; border:none;"></iframe>` : ''}
              <div style="padding:14px 20px; background:#ffffff; display:flex; align-items:center; justify-content:space-between;">
                <span style="color:#111111; font-weight:600; font-size:14px;">${this.escapeHtml(att.title || 'Location')}</span>
                ${att.mapUrl ? `<a href="${this.escapeHtml(att.mapUrl)}" target="_blank" rel="noopener noreferrer" style="color:#de3163; font-weight:600; text-decoration:none; font-size:13px;">Open on OpenStreetMap ↗</a>` : ''}
              </div>
            </div>
          `;
        } else if (att.type === 'video' || att.provider === 'Video Recorder' || att.provider === 'Screen Recorder' || att.category === 'Video Recording' || att.category === 'Screen Recording') {
          if (att.url && !att.videoUrl) {
            this.detailMediaCanvas.innerHTML = `
              <video src="${this.escapeHtml(att.url)}" controls autoplay playsinline style="max-height:68vh; max-width:90%; border-radius:16px; box-shadow:0 16px 40px rgba(0,0,0,0.7);"></video>
            `;
          } else {
            this.detailMediaCanvas.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;gap:16px;max-width:85%;">
                <img src="${this.escapeHtml(att.thumbnailUrl || att.url)}" style="border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,0.7);max-height:65vh;" alt="${this.escapeHtml(att.caption || '')}" />
                <a href="${att.videoUrl || 'https://youtube.com'}" target="_blank" class="detail-reaction-btn" style="background:#ff0000;color:#fff;text-decoration:none;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  Watch on YouTube
                </a>
              </div>
            `;
          }
        } else if (card.type === 'link') {
          this.detailMediaCanvas.innerHTML = `
            <div class="detail-text-presentation">
              <img src="${this.escapeHtml(att.thumbnailUrl || att.url)}" style="width:100%;border-radius:12px;margin-bottom:16px;" alt="${this.escapeHtml(att.title || '')}" />
              <h3>${this.escapeHtml(att.title || '')}</h3>
              <p style="color:rgba(255,255,255,0.7);margin-top:8px;">${this.escapeHtml(att.domain || '')}</p>
            </div>
          `;
        } else if (att.thumbnailUrl || att.url) {
          this.detailMediaCanvas.innerHTML = `
            <img src="${this.escapeHtml(att.url || att.thumbnailUrl)}" style="max-height:70vh; max-width:90%; border-radius:16px; object-fit:contain; box-shadow:0 16px 40px rgba(0,0,0,0.6);" alt="Media attachment" />
          `;
        }
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
        const val = e.target.value.trim();
        this.handleAllToolsSearchInput(val);
      });

      this.allToolsSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.submitAllToolsUrlOrFirstMatch();
        }
      });
    }

    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.addEventListener('click', () => {
        this.submitAllToolsUrlOrFirstMatch();
      });
    }

    this.renderAllToolsGrid();
  }

  isValidUrl(text) {
    if (!text) return false;
    try {
      const u = new URL(text);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  handleAllToolsSearchInput(val) {
    const isUrl = this.isValidUrl(val);
    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.disabled = !isUrl;
    }
    this.renderAllToolsGrid(val);
  }

  submitAllToolsUrlOrFirstMatch() {
    const val = (this.allToolsSearchInput?.value || '').trim();
    if (this.isValidUrl(val)) {
      this.closeAllToolsModal();
      this.attachDirectUrl(val);
    }
  }

  attachDirectUrl(url) {
    try {
      const domain = new URL(url).hostname;
      this.composerState.attachment = {
        type: 'link',
        provider: domain,
        title: url,
        domain: domain,
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
        url: url
      };
      this.updateAttachmentPreviewUI();
      this.showToast(`Link attached: ${domain}`);
    } catch (e) {
      this.showToast('Invalid URL');
    }
  }

  openAllToolsModal() {
    this.closeAllPopovers();
    if (!this.allToolsModal) return;
    if (this.allToolsSearchInput) {
      this.allToolsSearchInput.value = '';
    }
    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.disabled = true;
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
    const container = this.allToolsGroupsContainer || this.allToolsGrid;
    if (!container) return;
    container.innerHTML = '';
    const q = filter.toLowerCase().trim();

    TOOL_GROUPS.forEach(group => {
      const matchingTools = group.tools.filter(t => !q || t.name.toLowerCase().includes(q));
      if (matchingTools.length === 0) return;

      const groupEl = document.createElement('div');
      groupEl.className = `all-tools-group ${group.groupClass}`;

      const titleEl = document.createElement('h4');
      titleEl.className = 'all-tools-group-title';
      titleEl.textContent = group.name;
      groupEl.appendChild(titleEl);

      const gridEl = document.createElement('div');
      gridEl.className = 'all-tools-group-grid';

      matchingTools.forEach(tool => {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'all-tools-tile';
        tile.dataset.toolId = tool.id;
        tile.innerHTML = `
          <div class="all-tools-tile-icon">${tool.icon}</div>
          <div class="all-tools-tile-info">
            <span class="all-tools-tile-label">${this.escapeHtml(tool.name)}</span>
            ${tool.isNew ? '<span class="tool-badge-new">New</span>' : ''}
          </div>
        `;

        tile.addEventListener('click', () => {
          this.closeAllToolsModal();
          this.triggerToolAction(tool.id);
        });

        gridEl.appendChild(tile);
      });

      groupEl.appendChild(gridEl);
      container.appendChild(groupEl);
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
        this.openAvRecorderModal('photo');
        break;
      case 'video':
        this.openAvRecorderModal('video');
        break;
      case 'audio':
        this.openAvRecorderModal('audio');
        break;
      case 'screen':
        this.openAvRecorderModal('screen');
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
        this.openDrawModal();
        break;
      case 'poll':
        this.openPollModal();
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
        this.openLocationModal();
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
     Unified AV Studio (Photo, Video, Audio, Screen) — Padlet Parity
     ======================================================================== */

  initAvRecorderModal() {
    if (!this.avRecorderModal) return;

    if (this.avRecorderCloseBtn) {
      this.avRecorderCloseBtn.addEventListener('click', () => this.closeAvRecorderModal());
    }

    this.avRecorderModal.addEventListener('click', (e) => {
      if (e.target === this.avRecorderModal) {
        this.closeAvRecorderModal();
      }
    });

    // Mode segmented pill buttons
    if (this.avModePill) {
      this.avModePill.querySelectorAll('.av-mode-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.dataset.mode;
          if (mode && mode !== this.avCurrentMode) {
            this.setAvMode(mode);
          }
        });
      });
    }

    // Photo timer toggle pills
    if (this.avPhotoControls) {
      this.avPhotoControls.querySelectorAll('.av-timer-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          this.avPhotoControls.querySelectorAll('.av-timer-pill').forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          this.avPhotoTimerSeconds = parseInt(pill.dataset.timer || '0', 10);
        });
      });
    }

    // Mirror toggle
    if (this.avMirrorToggleBtn) {
      this.avMirrorToggleBtn.addEventListener('click', () => {
        this.avIsMirrored = !this.avIsMirrored;
        this.avMirrorToggleBtn.classList.toggle('is-active', this.avIsMirrored);
        if (this.avVideoPreview) {
          this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
        }
      });
    }

    // Photo shutter button
    if (this.avShutterBtn) {
      this.avShutterBtn.addEventListener('click', () => this.handlePhotoShutter());
    }

    // Video record button
    if (this.avRecordVideoBtn) {
      this.avRecordVideoBtn.addEventListener('click', () => this.toggleVideoRecording());
    }

    // Audio record button
    if (this.avRecordAudioBtn) {
      this.avRecordAudioBtn.addEventListener('click', () => this.toggleAudioRecording());
    }

    // Screen preflight start button
    if (this.avStartScreenSelectBtn) {
      this.avStartScreenSelectBtn.addEventListener('click', () => this.startScreenCapture());
    }

    // Stop screen recording button
    if (this.avStopScreenBtn) {
      this.avStopScreenBtn.addEventListener('click', () => this.stopScreenRecording());
    }

    // Permission retry button
    if (this.avPermissionRetryBtn) {
      this.avPermissionRetryBtn.addEventListener('click', () => this.setAvMode(this.avCurrentMode));
    }

    // Review stage: Retake & Save
    if (this.avRetakeBtn) {
      this.avRetakeBtn.addEventListener('click', () => this.retakeCapturedMedia());
    }

    if (this.avSaveMediaBtn) {
      this.avSaveMediaBtn.addEventListener('click', () => this.saveCapturedMedia());
    }
  }

  openAvRecorderModal(mode = 'photo') {
    this.closeAllPopovers();
    if (!this.avRecorderModal) return;

    this.avRecorderModal.hidden = false;
    this.setAvMode(mode);
  }

  closeAvRecorderModal() {
    this.stopAnyRecording(false);
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.avCapturedType = null;

    if (this.avRecorderModal) {
      this.avRecorderModal.hidden = true;
    }
  }

  async setAvMode(mode) {
    this.stopAnyRecording(false);
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.avCapturedType = null;

    this.avCurrentMode = mode;

    // Update segmented pill active state
    if (this.avModePill) {
      this.avModePill.querySelectorAll('.av-mode-tab').forEach(tab => {
        tab.classList.toggle('is-active', tab.dataset.mode === mode);
      });
    }

    // Show/hide dock controls
    if (this.avPhotoControls) this.avPhotoControls.hidden = (mode !== 'photo');
    if (this.avVideoControls) this.avVideoControls.hidden = (mode !== 'video');
    if (this.avAudioControls) this.avAudioControls.hidden = (mode !== 'audio');
    if (this.avScreenControls) this.avScreenControls.hidden = (mode !== 'screen');
    if (this.avReviewControls) this.avReviewControls.hidden = true;

    // Reset stages
    if (this.avCaptureView) this.avCaptureView.hidden = false;
    if (this.avReviewView) this.avReviewView.hidden = true;
    if (this.avReviewMediaWrap) this.avReviewMediaWrap.innerHTML = '';
    if (this.avPermissionError) this.avPermissionError.hidden = true;
    if (this.avRecordingBadge) this.avRecordingBadge.hidden = true;
    if (this.avCountdownOverlay) this.avCountdownOverlay.hidden = true;

    // Reset record buttons
    if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.remove('is-recording');
    if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.remove('is-recording');
    if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = true;

    if (mode === 'photo') {
      if (this.avVideoPreview) {
        this.avVideoPreview.hidden = false;
        this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
      }
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' },
        audio: false
      });
    } else if (mode === 'video') {
      if (this.avVideoPreview) {
        this.avVideoPreview.hidden = false;
        this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
      }
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' },
        audio: true
      });
    } else if (mode === 'audio') {
      if (this.avVideoPreview) this.avVideoPreview.hidden = true;
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = false;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({ video: false, audio: true }, true);
    } else if (mode === 'screen') {
      if (this.avVideoPreview) this.avVideoPreview.hidden = true;
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = false;
    }
  }

  async startMediaStream(constraints, isAudioWaveform = false) {
    try {
      this.stopActiveMediaStreams();
      if (this.avPermissionError) this.avPermissionError.hidden = true;

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.avActiveStream = stream;

      if (!isAudioWaveform && this.avVideoPreview) {
        this.avVideoPreview.srcObject = stream;
        try {
          await this.avVideoPreview.play();
        } catch (e) {
          // Autoplay policy fallback
        }
      }

      if (isAudioWaveform) {
        this.setupAudioWaveform(stream);
      }
    } catch (err) {
      console.warn('[AVStudio] Media permission failed:', err);
      this.showPermissionError(err);
    }
  }

  stopActiveMediaStreams() {
    if (this.avActiveStream) {
      try {
        this.avActiveStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      this.avActiveStream = null;
    }
    if (this.avVideoPreview) {
      this.avVideoPreview.srcObject = null;
    }
  }

  showPermissionError(err) {
    if (!this.avPermissionError) return;
    this.avPermissionError.hidden = false;
    if (this.avVideoPreview) this.avVideoPreview.hidden = true;
    if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
    if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;

    if (this.avPermissionErrorTitle) {
      this.avPermissionErrorTitle.textContent = 'Hardware Access Required';
    }
    if (this.avPermissionErrorDesc) {
      this.avPermissionErrorDesc.textContent = err?.name === 'NotAllowedError'
        ? 'Access was denied. Please allow camera and microphone permissions in your browser address bar.'
        : `Could not connect to media device: ${err?.message || 'Check if another app is using the device.'}`;
    }
  }

  setupAudioWaveform(stream) {
    this.cleanupAudioContext();
    if (!this.avAudioWaveform) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.avAudioContext = new AudioCtx();
      const source = this.avAudioContext.createMediaStreamSource(stream);
      this.avAudioAnalyser = this.avAudioContext.createAnalyser();
      this.avAudioAnalyser.fftSize = 128;
      this.avAudioAnalyser.smoothingTimeConstant = 0.8;
      source.connect(this.avAudioAnalyser);

      const canvas = this.avAudioWaveform;
      const ctx = canvas.getContext('2d');
      const bufferLength = this.avAudioAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!this.avAudioAnalyser) return;
        this.avWaveformAnimFrame = requestAnimationFrame(draw);

        const width = canvas.width = canvas.offsetWidth || 440;
        const height = canvas.height = canvas.offsetHeight || 140;

        this.avAudioAnalyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, width, height);

        // Center line
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, height / 2 - 1, width, 2);

        const barCount = 36;
        const barWidth = Math.max(3, (width / barCount) - 4);
        const step = Math.floor(bufferLength / barCount) || 1;

        for (let i = 0; i < barCount; i++) {
          const val = dataArray[i * step] || 0;
          const percent = val / 255;
          const barHeight = Math.max(4, percent * (height * 0.82));
          const x = i * (barWidth + 4) + 6;
          const y = (height - barHeight) / 2;

          // Gradient from hot pink #ff4081 to #de3163
          const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
          grad.addColorStop(0, '#ff4081');
          grad.addColorStop(1, '#de3163');

          ctx.fillStyle = grad;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, barHeight, 4);
          } else {
            ctx.rect(x, y, barWidth, barHeight);
          }
          ctx.fill();
        }
      };

      draw();
    } catch (e) {
      console.warn('[AVStudio] Audio waveform setup failed:', e);
    }
  }

  cleanupAudioContext() {
    if (this.avWaveformAnimFrame) {
      cancelAnimationFrame(this.avWaveformAnimFrame);
      this.avWaveformAnimFrame = null;
    }
    if (this.avAudioContext && this.avAudioContext.state !== 'closed') {
      try {
        this.avAudioContext.close();
      } catch (e) {}
      this.avAudioContext = null;
    }
    this.avAudioAnalyser = null;
  }

  getBestSupportedMime(kind = 'video') {
    if (typeof MediaRecorder === 'undefined') return '';
    if (kind === 'audio') {
      const audioTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus'
      ];
      return audioTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';
    }
    const videoTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4'
    ];
    return videoTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';
  }

  handlePhotoShutter() {
    if (!this.avActiveStream || !this.avVideoPreview) return;

    if (this.avPhotoTimerSeconds > 0) {
      this.startCountdown(this.avPhotoTimerSeconds, () => {
        this.snapPhoto();
      });
    } else {
      this.snapPhoto();
    }
  }

  startCountdown(seconds, callback) {
    if (!this.avCountdownOverlay || !this.avCountdownNumber) {
      callback();
      return;
    }

    this.cleanupCountdown();
    let current = seconds;
    this.avCountdownNumber.textContent = current;
    this.avCountdownOverlay.hidden = false;

    this.avCountdownInterval = setInterval(() => {
      current--;
      if (current <= 0) {
        this.cleanupCountdown();
        callback();
      } else {
        this.avCountdownNumber.textContent = current;
      }
    }, 1000);
  }

  cleanupCountdown() {
    if (this.avCountdownInterval) {
      clearInterval(this.avCountdownInterval);
      this.avCountdownInterval = null;
    }
    if (this.avCountdownOverlay) {
      this.avCountdownOverlay.hidden = true;
    }
  }

  snapPhoto() {
    if (!this.avVideoPreview) return;
    const video = this.avVideoPreview;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (this.avIsMirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (blob) {
        this.showReviewScreen('photo', blob);
      }
    }, 'image/jpeg', 0.92);
  }

  toggleVideoRecording() {
    if (this.avMediaRecorder && this.avMediaRecorder.state === 'recording') {
      this.stopVideoRecording();
    } else {
      this.startVideoRecording();
    }
  }

  startVideoRecording() {
    if (!this.avActiveStream) return;

    const mime = this.getBestSupportedMime('video');
    this.avRecordedChunks = [];

    try {
      this.avMediaRecorder = new MediaRecorder(this.avActiveStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'video/webm' });
        this.showReviewScreen('video', finalBlob);
      };

      this.avMediaRecorder.start(250);
      if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.add('is-recording');
      this.startRecordingTimer(15 * 60, () => this.stopVideoRecording());
    } catch (e) {
      console.error('[AVStudio] Failed to start video recording:', e);
      this.showToast('Could not start video recording');
    }
  }

  stopVideoRecording() {
    this.cleanupRecordingTimer();
    if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.remove('is-recording');
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  toggleAudioRecording() {
    if (this.avMediaRecorder && this.avMediaRecorder.state === 'recording') {
      this.stopAudioRecording();
    } else {
      this.startAudioRecording();
    }
  }

  startAudioRecording() {
    if (!this.avActiveStream) return;

    const mime = this.getBestSupportedMime('audio');
    this.avRecordedChunks = [];

    try {
      this.avMediaRecorder = new MediaRecorder(this.avActiveStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'audio/webm' });
        this.showReviewScreen('audio', finalBlob);
      };

      this.avMediaRecorder.start(250);
      if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.add('is-recording');
      this.startRecordingTimer(15 * 60, () => this.stopAudioRecording());
    } catch (e) {
      console.error('[AVStudio] Failed to start audio recording:', e);
      this.showToast('Could not start audio recording');
    }
  }

  stopAudioRecording() {
    this.cleanupRecordingTimer();
    if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.remove('is-recording');
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  async startScreenCapture() {
    try {
      this.stopActiveMediaStreams();
      const withMic = this.avScreenMicCheckbox?.checked ?? true;

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true
      });

      let finalStream = displayStream;

      if (withMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const combinedTracks = [
            ...displayStream.getVideoTracks(),
            ...displayStream.getAudioTracks(),
            ...micStream.getAudioTracks()
          ];
          finalStream = new MediaStream(combinedTracks);
        } catch (micErr) {
          console.warn('[AVStudio] Optional mic capture denied, continuing with screen only');
        }
      }

      this.avActiveStream = finalStream;

      if (this.avVideoPreview) {
        this.avVideoPreview.srcObject = finalStream;
        this.avVideoPreview.classList.remove('is-mirrored');
        this.avVideoPreview.hidden = false;
        try { await this.avVideoPreview.play(); } catch (e) {}
      }

      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = false;

      // Handle user clicking native browser "Stop sharing" bar
      const videoTrack = displayStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          this.stopScreenRecording();
        };
      }

      // Automatically begin recording screen stream
      const mime = this.getBestSupportedMime('video');
      this.avRecordedChunks = [];
      this.avMediaRecorder = new MediaRecorder(finalStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'video/webm' });
        this.showReviewScreen('screen', finalBlob);
      };
      this.avMediaRecorder.start(250);
      this.startRecordingTimer(15 * 60, () => this.stopScreenRecording());
    } catch (err) {
      console.warn('[AVStudio] Display capture cancelled or failed:', err);
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = false;
    }
  }

  stopScreenRecording() {
    this.cleanupRecordingTimer();
    if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = true;
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  stopAnyRecording(triggerReview = true) {
    this.cleanupRecordingTimer();
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      if (!triggerReview) {
        this.avMediaRecorder.ondataavailable = null;
        this.avMediaRecorder.onstop = null;
      }
      try {
        this.avMediaRecorder.stop();
      } catch (e) {}
      this.avMediaRecorder = null;
    }
  }

  startRecordingTimer(maxSeconds, onMaxReached) {
    this.cleanupRecordingTimer();
    this.avRecordingSeconds = 0;
    if (this.avRecordingBadge) this.avRecordingBadge.hidden = false;
    if (this.avRecordingTimerText) this.avRecordingTimerText.textContent = '00:00';

    this.avRecordingInterval = setInterval(() => {
      this.avRecordingSeconds++;
      const mins = String(Math.floor(this.avRecordingSeconds / 60)).padStart(2, '0');
      const secs = String(this.avRecordingSeconds % 60).padStart(2, '0');
      if (this.avRecordingTimerText) {
        this.avRecordingTimerText.textContent = `${mins}:${secs}`;
      }
      if (this.avRecordingSeconds >= maxSeconds) {
        this.cleanupRecordingTimer();
        if (onMaxReached) onMaxReached();
      }
    }, 1000);
  }

  cleanupRecordingTimer() {
    if (this.avRecordingInterval) {
      clearInterval(this.avRecordingInterval);
      this.avRecordingInterval = null;
    }
    if (this.avRecordingBadge) {
      this.avRecordingBadge.hidden = true;
    }
    this.avRecordingSeconds = 0;
  }

  showReviewScreen(type, blob) {
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    this.avCapturedBlob = blob;
    this.avCapturedType = type;

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
    }
    this.avCapturedPreviewUrl = URL.createObjectURL(blob);

    if (this.avCaptureView) this.avCaptureView.hidden = true;
    if (this.avReviewView) this.avReviewView.hidden = false;

    // Hide all mode dock controls, reveal review dock controls
    if (this.avPhotoControls) this.avPhotoControls.hidden = true;
    if (this.avVideoControls) this.avVideoControls.hidden = true;
    if (this.avAudioControls) this.avAudioControls.hidden = true;
    if (this.avScreenControls) this.avScreenControls.hidden = true;
    if (this.avReviewControls) this.avReviewControls.hidden = false;

    if (this.avReviewMediaWrap) {
      this.avReviewMediaWrap.innerHTML = '';
      if (type === 'photo') {
        const img = document.createElement('img');
        img.src = this.avCapturedPreviewUrl;
        img.alt = 'Captured photo';
        this.avReviewMediaWrap.appendChild(img);
      } else if (type === 'video' || type === 'screen') {
        const video = document.createElement('video');
        video.src = this.avCapturedPreviewUrl;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        this.avReviewMediaWrap.appendChild(video);
      } else if (type === 'audio') {
        const audioWrap = document.createElement('div');
        audioWrap.className = 'av-audio-review-card';
        audioWrap.innerHTML = `
          <div class="av-audio-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" stroke-width="2"/></svg>
          </div>
          <h4>Audio Reflection Ready</h4>
          <audio src="${this.avCapturedPreviewUrl}" controls autoplay></audio>
        `;
        this.avReviewMediaWrap.appendChild(audioWrap);
      }
    }
  }

  retakeCapturedMedia() {
    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.setAvMode(this.avCurrentMode);
  }

  async saveCapturedMedia() {
    if (!this.avCapturedBlob) return;
    const type = this.avCapturedType;
    const blob = this.avCapturedBlob;

    if (this.avSaveMediaBtn) {
      this.avSaveMediaBtn.disabled = true;
      this.avSaveMediaBtn.textContent = 'Saving...';
    }
    this.showToast('Attaching media...');

    try {
      let ext = 'webm';
      let mediaType = 'video';
      let category = 'Video Recording';

      if (type === 'photo') {
        ext = 'jpg';
        mediaType = 'image';
        category = 'Camera Snapshot';
      } else if (type === 'audio') {
        ext = 'webm';
        mediaType = 'audio';
        category = 'Audio Reflection';
      } else if (type === 'screen') {
        ext = 'webm';
        mediaType = 'video';
        category = 'Screen Recording';
      }

      const filename = `${type}_${Date.now()}.${ext}`;
      let uploaded = null;

      if (window.padlesR2) {
        uploaded = await window.padlesR2.uploadMedia(blob, {
          type: mediaType,
          filename: filename,
          boardId: this.activeBoardId || 'board-default-physics'
        });
      } else {
        const localUrl = URL.createObjectURL(blob);
        uploaded = {
          url: localUrl,
          thumbnailUrl: mediaType === 'image' ? localUrl : '',
          storageId: 'att_' + Date.now()
        };
      }

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const attachment = {
        type: mediaType,
        category: category,
        provider: 'Padles Studio',
        title: `${category} (${timeStr})`,
        url: uploaded.url,
        storageId: uploaded.storageId,
        thumbnailUrl: uploaded.thumbnailUrl || (mediaType === 'image' ? uploaded.url : ''),
        size: blob.size,
        mimeType: blob.type || (mediaType === 'image' ? 'image/jpeg' : (mediaType === 'audio' ? 'audio/webm' : 'video/webm'))
      };

      if (!this.activeDraftId && !this.editingCardId) {
        this.openComposer(this.state.sections[0]?.id);
      }

      this.composerState.attachment = attachment;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = attachment;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = attachment;
          card.type = mediaType;
        }
      }

      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
      this.closeAvRecorderModal();
      this.showToast(`${category} attached!`);
    } catch (err) {
      console.error('[AVStudio] Failed to save media:', err);
      this.showToast('Failed to save media: ' + (err.message || 'Unknown error'));
    } finally {
      if (this.avSaveMediaBtn) {
        this.avSaveMediaBtn.disabled = false;
        this.avSaveMediaBtn.textContent = 'Save & Attach';
      }
    }
  }

  /* ========================================================================
     Drawing Whiteboard Modal (Padlet Parity)
     ======================================================================== */

  initDrawModal() {
    if (!this.drawModal) return;

    if (this.drawModalCloseBtn) {
      this.drawModalCloseBtn.addEventListener('click', () => this.closeDrawModal());
    }

    this.drawModal.addEventListener('click', (e) => {
      if (e.target === this.drawModal) {
        this.closeDrawModal();
      }
    });

    // Tool selector: Pen, Highlighter, Eraser
    if (this.drawToolbar) {
      this.drawToolbar.querySelectorAll('.draw-tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-tool-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawCurrentTool = btn.dataset.tool || 'pen';
        });
      });

      // Stroke size selector
      this.drawToolbar.querySelectorAll('.draw-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-size-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawStrokeSize = parseInt(btn.dataset.size || '3', 10);
        });
      });

      // Swatches
      this.drawToolbar.querySelectorAll('.draw-color-swatch').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-color-swatch').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawStrokeColor = btn.dataset.color || '#000000';
          if (this.drawCurrentTool === 'eraser') {
            const penBtn = this.drawToolbar.querySelector('.draw-tool-btn[data-tool="pen"]');
            if (penBtn) penBtn.click();
          }
        });
      });
    }

    // Action buttons
    if (this.drawUndoBtn) this.drawUndoBtn.addEventListener('click', () => this.undoDraw());
    if (this.drawRedoBtn) this.drawRedoBtn.addEventListener('click', () => this.redoDraw());
    if (this.drawClearBtn) this.drawClearBtn.addEventListener('click', () => this.clearDrawCanvas());
    if (this.drawBgToggleBtn) this.drawBgToggleBtn.addEventListener('click', () => this.toggleDrawBackground());
    if (this.drawSaveBtn) this.drawSaveBtn.addEventListener('click', () => this.saveDrawMedia());

    // Canvas drawing interaction via Pointer Events
    if (this.drawCanvas) {
      this.drawCanvas.addEventListener('pointerdown', (e) => this.handleDrawPointerDown(e));
      this.drawCanvas.addEventListener('pointermove', (e) => this.handleDrawPointerMove(e));
      this.drawCanvas.addEventListener('pointerup', () => this.handleDrawPointerUp());
      this.drawCanvas.addEventListener('pointercancel', () => this.handleDrawPointerUp());
    }

    // Window resize observer for canvas
    window.addEventListener('resize', () => {
      if (this.drawModal && !this.drawModal.hidden) {
        this.resizeDrawCanvas(false);
      }
    });
  }

  openDrawModal() {
    this.closeAllPopovers();
    if (!this.drawModal) return;

    this.drawModal.hidden = false;
    setTimeout(() => {
      this.resizeDrawCanvas(true);
    }, 50);
  }

  closeDrawModal() {
    if (this.drawModal) {
      this.drawModal.hidden = true;
    }
  }

  resizeDrawCanvas(isInit = false) {
    if (!this.drawCanvas || !this.drawStageContainer) return;

    const width = this.drawStageContainer.clientWidth || 800;
    const height = this.drawStageContainer.clientHeight || 540;

    let previousData = null;
    if (!isInit && this.drawCanvas.width > 0 && this.drawCanvas.height > 0) {
      try {
        const ctx = this.drawCanvas.getContext('2d');
        previousData = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      } catch (e) {}
    }

    this.drawCanvas.width = width;
    this.drawCanvas.height = height;

    const ctx = this.drawCanvas.getContext('2d');
    if (previousData) {
      ctx.putImageData(previousData, 0, 0);
    } else if (isInit) {
      this.clearDrawCanvas(true);
      this.drawUndoStack = [];
      this.drawRedoStack = [];
      this.updateDrawUndoRedoButtons();
    }
  }

  pushDrawUndoState() {
    if (!this.drawCanvas) return;
    try {
      const ctx = this.drawCanvas.getContext('2d');
      const data = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      this.drawUndoStack.push(data);
      if (this.drawUndoStack.length > 30) this.drawUndoStack.shift();
      this.drawRedoStack = [];
      this.updateDrawUndoRedoButtons();
    } catch (e) {}
  }

  undoDraw() {
    if (this.drawUndoStack.length === 0 || !this.drawCanvas) return;
    const ctx = this.drawCanvas.getContext('2d');
    const current = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    this.drawRedoStack.push(current);

    const prev = this.drawUndoStack.pop();
    ctx.putImageData(prev, 0, 0);
    this.updateDrawUndoRedoButtons();
  }

  redoDraw() {
    if (this.drawRedoStack.length === 0 || !this.drawCanvas) return;
    const ctx = this.drawCanvas.getContext('2d');
    const current = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    this.drawUndoStack.push(current);

    const next = this.drawRedoStack.pop();
    ctx.putImageData(next, 0, 0);
    this.updateDrawUndoRedoButtons();
  }

  updateDrawUndoRedoButtons() {
    if (this.drawUndoBtn) this.drawUndoBtn.disabled = this.drawUndoStack.length === 0;
    if (this.drawRedoBtn) this.drawRedoBtn.disabled = this.drawRedoStack.length === 0;
  }

  clearDrawCanvas(skipPush = false) {
    if (!this.drawCanvas) return;
    if (!skipPush) this.pushDrawUndoState();
    const ctx = this.drawCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    if (!skipPush) this.updateDrawUndoRedoButtons();
  }

  toggleDrawBackground() {
    this.drawIsDarkBg = !this.drawIsDarkBg;
    if (this.drawStageContainer) {
      this.drawStageContainer.classList.toggle('is-dark-bg', this.drawIsDarkBg);
    }
  }

  handleDrawPointerDown(e) {
    if (!this.drawCanvas) return;
    this.drawCanvas.setPointerCapture(e.pointerId);
    const rect = this.drawCanvas.getBoundingClientRect();
    this.drawLastX = e.clientX - rect.left;
    this.drawLastY = e.clientY - rect.top;
    this.isDrawing = true;
    this.pushDrawUndoState();

    const ctx = this.drawCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.drawLastX, this.drawLastY, this.drawStrokeSize / 2, 0, Math.PI * 2);
    if (this.drawCurrentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = this.drawCurrentTool === 'highlighter' ? this.hexToRgba(this.drawStrokeColor, 0.4) : this.drawStrokeColor;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(this.drawLastX, this.drawLastY);
  }

  handleDrawPointerMove(e) {
    if (!this.isDrawing || !this.drawCanvas) return;
    const rect = this.drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = this.drawCanvas.getContext('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.drawCurrentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = this.drawStrokeSize * 2.8;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (this.drawCurrentTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = this.drawStrokeSize * 2.5;
      ctx.strokeStyle = this.hexToRgba(this.drawStrokeColor, 0.35);
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = this.drawStrokeSize;
      ctx.strokeStyle = this.drawStrokeColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    this.drawLastX = x;
    this.drawLastY = y;
  }

  handleDrawPointerUp() {
    this.isDrawing = false;
    if (this.drawCanvas) {
      const ctx = this.drawCanvas.getContext('2d');
      ctx.beginPath();
    }
  }

  hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  async saveDrawMedia() {
    if (!this.drawCanvas) return;

    if (this.drawSaveBtn) {
      this.drawSaveBtn.disabled = true;
      this.drawSaveBtn.textContent = 'Saving...';
    }
    this.showToast('Saving drawing...');

    try {
      // Create offscreen canvas with solid background (white or dark)
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = this.drawCanvas.width;
      exportCanvas.height = this.drawCanvas.height;
      const ctx = exportCanvas.getContext('2d');

      ctx.fillStyle = this.drawIsDarkBg ? '#1e2022' : '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      ctx.drawImage(this.drawCanvas, 0, 0);

      const blob = await new Promise(resolve => exportCanvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Could not export canvas to blob');

      const filename = `drawing_${Date.now()}.png`;
      let uploaded = null;

      if (window.padlesR2) {
        uploaded = await window.padlesR2.uploadMedia(blob, {
          type: 'drawing',
          filename: filename,
          boardId: this.activeBoardId || 'board-default-physics'
        });
      } else {
        const localUrl = URL.createObjectURL(blob);
        uploaded = {
          url: localUrl,
          thumbnailUrl: localUrl,
          storageId: 'att_' + Date.now()
        };
      }

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const attachment = {
        type: 'drawing',
        category: 'Drawing',
        provider: 'Padles Whiteboard',
        title: `Whiteboard Sketch (${timeStr})`,
        url: uploaded.url,
        storageId: uploaded.storageId,
        thumbnailUrl: uploaded.thumbnailUrl || uploaded.url,
        size: blob.size,
        mimeType: 'image/png'
      };

      if (!this.activeDraftId && !this.editingCardId) {
        this.openComposer(this.state.sections[0]?.id);
      }

      this.composerState.attachment = attachment;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = attachment;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = attachment;
          card.type = 'drawing';
        }
      }

      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
      this.closeDrawModal();
      this.showToast('Drawing attached!');
    } catch (err) {
      console.error('[Draw] Save failed:', err);
      this.showToast('Failed to save drawing');
    } finally {
      if (this.drawSaveBtn) {
        this.drawSaveBtn.disabled = false;
        this.drawSaveBtn.textContent = 'Save & Attach';
      }
    }
  }

  /* ========================================================================
     Interactive Poll Modal (Padlet Parity)
     ======================================================================== */

  initPollModal() {
    if (!this.pollModal) return;

    if (this.pollModalCloseBtn) {
      this.pollModalCloseBtn.addEventListener('click', () => this.closePollModal());
    }

    this.pollModal.addEventListener('click', (e) => {
      if (e.target === this.pollModal) {
        this.closePollModal();
      }
    });

    if (this.pollAddOptionBtn) {
      this.pollAddOptionBtn.addEventListener('click', () => this.appendPollOptionRow());
    }

    if (this.pollSaveBtn) {
      this.pollSaveBtn.addEventListener('click', () => this.savePollModal());
    }
  }

  openPollModal() {
    this.closeAllPopovers();
    if (!this.pollModal) return;

    if (this.pollQuestionInput) this.pollQuestionInput.value = '';
    if (this.pollMultipleChoiceToggle) this.pollMultipleChoiceToggle.checked = false;
    if (this.pollOptionsList) {
      this.pollOptionsList.innerHTML = '';
      this.appendPollOptionRow('Yes');
      this.appendPollOptionRow('No');
    }

    this.pollModal.hidden = false;
    setTimeout(() => this.pollQuestionInput?.focus(), 50);
  }

  closePollModal() {
    if (this.pollModal) {
      this.pollModal.hidden = true;
    }
  }

  appendPollOptionRow(initialText = '') {
    if (!this.pollOptionsList) return;
    const count = this.pollOptionsList.querySelectorAll('.poll-option-row').length + 1;
    if (count > 10) {
      this.showToast('Maximum 10 poll options allowed');
      return;
    }

    const row = document.createElement('div');
    row.className = 'poll-option-row';
    row.innerHTML = `
      <input type="text" class="poll-input" placeholder="Option ${count}" value="${this.escapeHtml(initialText)}" maxlength="100" />
      <button type="button" class="poll-option-remove-btn" title="Remove option">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    const rmBtn = row.querySelector('.poll-option-remove-btn');
    rmBtn.addEventListener('click', () => {
      if (this.pollOptionsList.querySelectorAll('.poll-option-row').length <= 2) {
        this.showToast('Polls require at least 2 options');
        return;
      }
      row.remove();
    });

    this.pollOptionsList.appendChild(row);
  }

  savePollModal() {
    const question = (this.pollQuestionInput?.value || '').trim();
    if (!question) {
      this.showToast('Please enter a poll question');
      this.pollQuestionInput?.focus();
      return;
    }

    const optionInputs = this.pollOptionsList?.querySelectorAll('input.poll-input') || [];
    const validOptions = [];
    optionInputs.forEach(inp => {
      const val = inp.value.trim();
      if (val) validOptions.push(val);
    });

    if (validOptions.length < 2) {
      this.showToast('Please provide at least 2 options for your poll');
      return;
    }

    const options = validOptions.map((text, idx) => ({
      id: `opt_${Date.now()}_${idx}`,
      text: text,
      votes: 0
    }));

    const allowMultiple = this.pollMultipleChoiceToggle?.checked ?? false;

    const attachment = {
      type: 'poll',
      provider: 'Padles Poll',
      category: 'Poll',
      title: question,
      question: question,
      allowMultiple: allowMultiple,
      totalVotes: 0,
      options: options
    };

    if (!this.activeDraftId && !this.editingCardId) {
      this.openComposer(this.state.sections[0]?.id);
    }

    this.composerState.attachment = attachment;
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) draft.attachment = attachment;
    }
    if (this.editingCardId) {
      const card = this.findCardById(this.editingCardId);
      if (card) {
        card.attachment = attachment;
        card.type = 'poll';
      }
    }

    this.updateAttachmentPreviewUI();
    this.syncActiveDraftFromInputs();
    this.saveState();
    this.closePollModal();
    this.showToast('Poll created and attached!');
  }

  voteOnPoll(cardId, optionId) {
    const card = this.findCardById(cardId);
    if (!card || !card.attachment || card.attachment.type !== 'poll') return;

    const poll = card.attachment;
    const storageKey = `padles_voted_${cardId}`;
    let votedList = [];
    try {
      votedList = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      votedList = [];
    }

    if (!poll.allowMultiple) {
      if (votedList.includes(optionId)) {
        // Toggle off vote
        votedList = [];
        const opt = poll.options.find(o => o.id === optionId);
        if (opt && opt.votes > 0) opt.votes--;
      } else {
        // Remove previous vote if any
        votedList.forEach(prevId => {
          const prev = poll.options.find(o => o.id === prevId);
          if (prev && prev.votes > 0) prev.votes--;
        });
        votedList = [optionId];
        const opt = poll.options.find(o => o.id === optionId);
        if (opt) opt.votes = (opt.votes || 0) + 1;
      }
    } else {
      if (votedList.includes(optionId)) {
        votedList = votedList.filter(id => id !== optionId);
        const opt = poll.options.find(o => o.id === optionId);
        if (opt && opt.votes > 0) opt.votes--;
      } else {
        votedList.push(optionId);
        const opt = poll.options.find(o => o.id === optionId);
        if (opt) opt.votes = (opt.votes || 0) + 1;
      }
    }

    poll.totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
    localStorage.setItem(storageKey, JSON.stringify(votedList));
    this.saveState();
    this.renderBoard();

    if (this.activeDetailCardId === cardId) {
      this.openCardDetailModal(cardId);
    }
  }

  /* ========================================================================
     Location Map Picker Modal (Padlet Parity)
     ======================================================================== */

  initLocationModal() {
    if (!this.locationModal) return;

    if (this.locationModalCloseBtn) {
      this.locationModalCloseBtn.addEventListener('click', () => this.closeLocationModal());
    }

    this.locationModal.addEventListener('click', (e) => {
      if (e.target === this.locationModal) {
        this.closeLocationModal();
      }
    });

    if (this.locationSearchInput) {
      this.locationSearchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        clearTimeout(this.locationSearchTimeout);
        this.locationSearchTimeout = setTimeout(() => {
          this.handleLocationSearch(q);
        }, 400);
      });

      this.locationSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstResult = this.locationResultsDropdown?.querySelector('.location-result-item');
          if (firstResult) firstResult.click();
        }
      });
    }

    if (this.locationSaveBtn) {
      this.locationSaveBtn.addEventListener('click', () => this.saveLocationMedia());
    }
  }

  openLocationModal() {
    this.closeAllPopovers();
    if (!this.locationModal) return;

    if (this.locationSearchInput) this.locationSearchInput.value = '';
    if (this.locationResultsDropdown) {
      this.locationResultsDropdown.innerHTML = '';
      this.locationResultsDropdown.hidden = true;
    }

    // Default to MIT, Cambridge MA (Physics Audio Reflections)
    this.setLocation({
      title: 'Massachusetts Institute of Technology, Cambridge, MA',
      lat: 42.3601,
      lon: -71.0942
    });

    this.locationModal.hidden = false;
    setTimeout(() => this.locationSearchInput?.focus(), 50);
  }

  closeLocationModal() {
    if (this.locationModal) {
      this.locationModal.hidden = true;
    }
  }

  async handleLocationSearch(query) {
    if (!query || query.length < 3) {
      if (this.locationResultsDropdown) this.locationResultsDropdown.hidden = true;
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const items = await res.json();

      if (!this.locationResultsDropdown) return;
      this.locationResultsDropdown.innerHTML = '';

      if (!items || items.length === 0) {
        this.locationResultsDropdown.innerHTML = '<div style="padding:12px;color:#6b7280;font-size:13px;text-align:center;">No locations found</div>';
        this.locationResultsDropdown.hidden = false;
        return;
      }

      items.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'location-result-item';
        btn.textContent = item.display_name;
        btn.addEventListener('click', () => {
          this.setLocation({
            title: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon)
          });
          this.locationResultsDropdown.hidden = true;
          if (this.locationSearchInput) this.locationSearchInput.value = item.display_name;
        });
        this.locationResultsDropdown.appendChild(btn);
      });

      this.locationResultsDropdown.hidden = false;
    } catch (err) {
      console.warn('[Location] Geocoding request failed:', err);
    }
  }

  setLocation(loc) {
    this.selectedLocation = loc;
    if (this.locationPinLabel) {
      this.locationPinLabel.textContent = loc.title;
    }
    if (this.locationMapFrame) {
      const delta = 0.008;
      const bbox = `${loc.lon - delta}%2C${loc.lat - delta}%2C${loc.lon + delta}%2C${loc.lat + delta}`;
      this.locationMapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
    }
    if (this.locationSaveBtn) {
      this.locationSaveBtn.disabled = false;
    }
  }

  saveLocationMedia() {
    if (!this.selectedLocation) return;
    const loc = this.selectedLocation;

    const delta = 0.008;
    const bbox = `${loc.lon - delta}%2C${loc.lat - delta}%2C${loc.lon + delta}%2C${loc.lat + delta}`;
    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
    const mapUrl = `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lon}#map=16/${loc.lat}/${loc.lon}`;

    const attachment = {
      type: 'location',
      provider: 'OpenStreetMap',
      category: 'Location',
      title: loc.title,
      latitude: loc.lat,
      longitude: loc.lon,
      mapUrl: mapUrl,
      embedUrl: embedUrl
    };

    if (!this.activeDraftId && !this.editingCardId) {
      this.openComposer(this.state.sections[0]?.id);
    }

    this.composerState.attachment = attachment;
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) draft.attachment = attachment;
    }
    if (this.editingCardId) {
      const card = this.findCardById(this.editingCardId);
      if (card) {
        card.attachment = attachment;
        card.type = 'location';
      }
    }

    this.updateAttachmentPreviewUI();
    this.syncActiveDraftFromInputs();
    this.saveState();
    this.closeLocationModal();
    this.showToast('Location attached!');
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
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const isImg = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');
          const isAudio = file.type.startsWith('audio/');
          const mediaType = isImg ? 'image' : (isVideo ? 'video' : (isAudio ? 'audio' : 'file'));

          this.showToast(`Attaching ${file.name}...`);
          try {
            let uploaded = null;
            if (window.padlesR2) {
              uploaded = await window.padlesR2.uploadMedia(file, {
                type: mediaType,
                filename: file.name,
                boardId: this.activeBoardId || 'board-default-physics'
              });
            } else {
              const localUrl = URL.createObjectURL(file);
              uploaded = { url: localUrl, thumbnailUrl: isImg ? localUrl : '', storageId: 'att_' + Date.now() };
            }

            this.composerState.attachment = {
              type: mediaType,
              category: 'upload',
              provider: 'Upload',
              title: file.name,
              thumbnailUrl: uploaded.thumbnailUrl || (isImg ? uploaded.url : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'),
              url: uploaded.url,
              storageId: uploaded.storageId,
              size: file.size,
              mimeType: file.type
            };
            this.updateAttachmentPreviewUI();
            this.showToast(`Attached ${file.name}`);
          } catch (err) {
            console.error('File attach failed:', err);
            this.showToast('Failed to attach file');
          }
        }
      };
      input.click();
    } else if (tool === 'camera') {
      this.openAvRecorderModal('photo');
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
        if (this.avRecorderModal && !this.avRecorderModal.hidden) {
          this.closeAvRecorderModal();
          return;
        }
        if (this.drawModal && !this.drawModal.hidden) {
          this.closeDrawModal();
          return;
        }
        if (this.pollModal && !this.pollModal.hidden) {
          this.closePollModal();
          return;
        }
        if (this.locationModal && !this.locationModal.hidden) {
          this.closeLocationModal();
          return;
        }
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
      const scrollArea = document.querySelector('.composer-scroll-area');
      if (scrollArea && scrollArea.scrollHeight > scrollArea.clientHeight) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
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
      if (this.emojiPickerPopover && !this.emojiPickerPopover.hidden) {
        if (!this.emojiPickerPopover.contains(e.target) && !e.target.closest('.reaction-add-btn') && !e.target.closest('.reaction-pill')) {
          this.closeEmojiPicker();
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
        this.closeEmojiPicker();
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
