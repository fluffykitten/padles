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
  { id: 'padlet', name: 'Padlet', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { id: 'arcade', name: 'Padlet Arcade', isNew: true, icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m8-2h.01m3 0h.01"/></svg>' },
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
    this.storageKey = 'padles_shelf_board_state';
    this.sectionsTrack = document.getElementById('sectionsTrack');
    this.postModal = document.getElementById('composerCardWrapper');
    this.composerCardWrapper = this.postModal;
    this.composerCard = document.getElementById('composerCard');
    this.titleInput = document.getElementById('composerTitleInput');
    this.bodyInput = document.getElementById('composerBodyInput');
    this.publishBtn = document.getElementById('publishBtn');
    this.colorPickerPill = document.getElementById('colorPickerPill');
    this.sectionSelectorPill = document.getElementById('sectionSelectorPill');
    this.currentColorDot = document.getElementById('currentColorDot');
    this.currentColorLabel = document.getElementById('currentColorLabel');
    this.currentSectionLabel = document.getElementById('currentSectionLabel');
    this.colorPaletteDropdown = document.getElementById('composerColorPalette');
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

    // Card Context Menu (Padlet Authentic 14-Item Menu & 6 Swatches)
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
    this.attachEventListeners();
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
        author: 'Salman Madani • 6d',
        title: 'Physics Audio Reflections: I see, I think, I wonder',
        sections: [
          {
            id: 'sec-instructions',
            title: 'Instructions',
            cards: [
              {
                id: 'card-instructions-1',
                title: 'Student Instructions',
                pinned: true,
                type: 'text',
                color: 'cyan',
                content: {
                  intro: 'Watch the video or look at the image.',
                  body: 'Record yourself or you and your partner talking about what you See, Think, and Wonder:',
                  bullets: [
                    '<strong>I see:</strong> Describe what you see',
                    '<strong>I think:</strong> Explain what you think is happening. If possible, connect to concepts that we have learned about in class.',
                    '<strong>I wonder:</strong> What questions do you have about what you see?'
                  ]
                },
                reactions: 3,
                hasReacted: false
              }
            ]
          },
          {
            id: 'sec-balloon-cars',
            title: 'Balloon Cars',
            cards: [
              {
                id: 'card-balloon-1',
                title: 'balloon car making',
                pinned: true,
                type: 'video',
                color: 'cyan',
                attachment: {
                  provider: 'YouTube',
                  thumbnailUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
                  caption: 'balloon car making',
                  videoUrl: 'https://youtube.com'
                },
                reactions: 4,
                hasReacted: false
              },
              {
                id: 'card-balloon-2',
                title: "Balloon car: Newton's third law",
                pinned: true,
                type: 'video',
                color: 'cyan',
                attachment: {
                  provider: 'YouTube',
                  thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
                  caption: "Balloon car: Newton's third law",
                  videoUrl: 'https://youtube.com'
                },
                reactions: 2,
                hasReacted: false
              }
            ]
          },
          {
            id: 'sec-newton-1',
            title: "Newton's First Law",
            cards: [
              {
                id: 'card-newton-egg',
                title: "Newtons First Law Of Motion : Egg Drop",
                pinned: true,
                type: 'video',
                color: 'cyan',
                attachment: {
                  provider: 'YouTube',
                  thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
                  caption: "Newtons First Law Of Motion : Egg Drop",
                  videoUrl: 'https://youtube.com'
                },
                reactions: 5,
                hasReacted: false
              }
            ]
          },
          {
            id: 'sec-bipoc',
            title: 'BIPOC Scientists',
            cards: [
              {
                id: 'card-bipoc-1',
                title: 'Classroom Resources - I Am A Scientist',
                pinned: true,
                type: 'link',
                color: 'cyan',
                attachment: {
                  domain: 'iamascientist.info',
                  title: 'Classroom Resources - I Am A Scientist',
                  thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
                  url: 'https://iamascientist.info'
                },
                reactions: 6,
                hasReacted: false
              }
            ]
          },
          {
            id: 'sec-5',
            title: 'Section 5',
            cards: []
          }
        ],
        drafts: [
          { id: 'draft-1', draftNumber: 1, title: '', body: '', color: 'white', sectionId: 'sec-instructions', attachment: null, isMinimized: true },
          { id: 'draft-2', draftNumber: 2, title: '', body: '', color: 'white', sectionId: 'sec-balloon-cars', attachment: null, isMinimized: true },
          { id: 'draft-3', draftNumber: 3, title: '', body: '', color: 'white', sectionId: 'sec-newton-1', attachment: null, isMinimized: true }
        ]
      };
    }

    if (!state.drafts) {
      state.drafts = [
        { id: 'draft-1', draftNumber: 1, title: '', body: '', color: 'white', sectionId: 'sec-instructions', attachment: null, isMinimized: true },
        { id: 'draft-2', draftNumber: 2, title: '', body: '', color: 'white', sectionId: 'sec-balloon-cars', attachment: null, isMinimized: true },
        { id: 'draft-3', draftNumber: 3, title: '', body: '', color: 'white', sectionId: 'sec-newton-1', attachment: null, isMinimized: true }
      ];
    }

    if (!state.customFields) {
      state.customFields = [];
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

      // Section Header
      const header = document.createElement('div');
      header.className = 'section-header';
      header.innerHTML = `
        <span class="section-title" title="${this.escapeHtml(section.title)}">${this.escapeHtml(section.title)}</span>
        <button class="section-menu-btn" title="Section options" aria-label="Section options" data-section-id="${section.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="19" cy="12" r="1.5"/>
            <circle cx="5" cy="12" r="1.5"/>
          </svg>
        </button>
      `;

      const menuBtn = header.querySelector('.section-menu-btn');
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openSectionContextMenu(section.id, menuBtn);
      });

      // Quick "+" Add Button under Header
      const addBtn = document.createElement('button');
      addBtn.className = 'section-add-btn';
      addBtn.title = `Add post to ${section.title}`;
      addBtn.innerHTML = `<span>+</span>`;
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

      sectionCol.appendChild(header);
      sectionCol.appendChild(addBtn);
      sectionCol.appendChild(cardsStack);
      this.sectionsTrack.appendChild(sectionCol);
    });
  }

  renderCardElement(card, sectionId) {
    const el = document.createElement('article');
    el.className = 'padlet-card';
    el.id = card.id;
    el.draggable = true;

    // Apply card custom palette if defined
    if (card.color) {
      const pal = this.getPalette(card.color);
      if (pal) {
        el.style.backgroundColor = pal.cardBg;
        el.style.borderColor = pal.border;
      }
    }

    // Header with Pinned status, Quick Edit button, and 3-dots actions
    let topBarHtml = `
      <div class="card-top-bar">
        ${card.pinned ? `
          <span class="card-pinned-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
            Pinned
          </span>` : '<span></span>'}
        <div class="card-action-group">
          <button type="button" class="card-edit-btn" title="Edit this post" aria-label="Edit this post" data-testid="surfacePostEditButton">
            <svg viewBox="0 0 32 32" width="12" height="12" fill="currentColor">
              <path d="M24 3.34a4.65 4.65 0 0 0-3.299 1.361l-2.547 2.547a1 1 0 0 0-.236.234L5.944 19.456c-.28.28-.485.628-.594 1.01l-1.978 6.926a1 1 0 0 0 .255.981 1 1 0 0 0 .981.255l6.927-1.978.001-.001c.38-.109.727-.312 1.008-.592l11.949-11.951q.169-.113.281-.281l2.525-2.525a4.68 4.68 0 0 0 0-6.599 4.65 4.65 0 0 0-3.3-1.361zm0 1.988c.681 0 1.36.262 1.884.786h.001a2.65 2.65 0 0 1 0 3.771l-1.96 1.96-3.771-3.771 1.96-1.96a2.66 2.66 0 0 1 1.885-.786zm-5.259 4.16 3.771 3.771-11.383 11.383a.35.35 0 0 1-.145.085l-.656.187-3.242-3.242.188-.657v-.001a.3.3 0 0 1 .085-.143L18.742 9.489zM6.457 23.871l1.672 1.672-2.34.668z"/>
            </svg>
            <span>Edit</span>
          </button>
          <div class="card-action-divider"></div>
          <button type="button" class="card-dots-btn" title="More post actions" aria-label="More post actions" data-testid="surfacePostMoreActionsButton">
            <svg viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
              <path d="M16 10a3.143 3.143 0 1 1 0-6.286A3.143 3.143 0 0 1 16 10m0 9.143a3.143 3.143 0 1 1 0-6.286 3.143 3.143 0 0 1 0 6.286m-3.143 6a3.143 3.143 0 1 0 6.286 0 3.143 3.143 0 0 0-6.286 0"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    let titleHtml = card.title ? `<h3 class="card-title">${this.escapeHtml(card.title)}</h3>` : '';
    let bodyHtml = '';

    if (card.type === 'video' && card.attachment) {
      bodyHtml = `
        <div class="media-attachment-video">
          <img src="${card.attachment.thumbnailUrl}" class="video-thumb" alt="${this.escapeHtml(card.attachment.caption)}" />
          <button class="play-overlay-btn" title="Play Video" aria-label="Play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3"/>
            </svg>
          </button>
          <span class="youtube-badge">${card.attachment.provider || 'YouTube'}</span>
        </div>
        <p class="card-caption">${this.escapeHtml(card.attachment.caption)}</p>
      `;
      titleHtml = '';
    } else if (card.type === 'link' && card.attachment) {
      bodyHtml = `
        <div class="media-attachment-link">
          <img src="${card.attachment.thumbnailUrl}" class="link-thumb" alt="${this.escapeHtml(card.attachment.title)}" />
          <div class="link-meta">
            <span class="link-domain">${this.escapeHtml(card.attachment.domain)}</span>
            <span class="link-title">${this.escapeHtml(card.attachment.title)}</span>
          </div>
        </div>
      `;
      titleHtml = '';
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

    let bottomBarHtml = `
      <div class="card-bottom-bar">
        <button class="reaction-btn ${card.hasReacted ? 'has-reacted' : ''}" title="Add reaction" aria-label="Add reaction">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M11.168 3c0.657 0 1.299 0.064 1.92 0.188-0.171 0.455-0.287 0.937-0.342 1.437-0.511-0.098-1.038-0.151-1.578-0.151-4.616 0-8.359 3.743-8.359 8.359s3.743 8.358 8.359 8.358c4.616 0 8.358-3.742 8.358-8.358 0-0.54-0.053-1.068-0.151-1.579 0.5-0.055 0.982-0.172 1.437-0.342 0.123 0.622 0.189 1.264 0.189 1.922-0 5.431-4.403 9.833-9.833 9.833s-9.833-4.402-9.833-9.833c0-5.431 4.402-9.833 9.833-9.833z"/>
            <path d="M6.654 15.447c0.32-0.252 0.783-0.196 1.035 0.124 0.835 1.059 2.105 1.689 3.479 1.689 1.373-0 2.64-0.628 3.475-1.685 0.252-0.32 0.717-0.375 1.037-0.122s0.373 0.717 0.121 1.036c-1.112 1.407-2.804 2.246-4.633 2.246-1.831 0-3.525-0.841-4.637-2.251-0.252-0.32-0.197-0.784 0.122-1.036z"/>
            <path d="M8.219 9.638c0.678 0 1.228 0.551 1.228 1.229s-0.55 1.228-1.228 1.228-1.228-0.55-1.228-1.228c0-0.678 0.549-1.229 1.228-1.229z"/>
            <path d="M14.119 9.638c0.26 0 0.501 0.081 0.699 0.219 0.050 0.043 0.101 0.085 0.152 0.126 0.232 0.223 0.376 0.537 0.376 0.884-0 0.678-0.55 1.228-1.228 1.228s-1.229-0.55-1.229-1.228c0-0.678 0.551-1.229 1.229-1.229z"/>
            <path d="M18.667 0.333c-2.761 0-5 2.239-5 5s2.239 5 5 5c2.761 0 5-2.239 5-5s-2.239-5-5-5zM18.667 1.697c0.251 0 0.455 0.204 0.455 0.455v2.727h2.727c0.251 0 0.454 0.204 0.454 0.455s-0.204 0.455-0.454 0.455h-2.727v2.727c0 0.251-0.204 0.455-0.455 0.455s-0.455-0.204-0.455-0.455v-2.727h-2.727c-0.251 0-0.455-0.204-0.455-0.455s0.204-0.455 0.455-0.455h2.727v-2.727c0-0.251 0.204-0.455 0.455-0.455z"/>
          </svg>
          <span>${card.reactions > 0 ? card.reactions : '+'}</span>
        </button>
      </div>
    `;

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

    el.innerHTML = topBarHtml + titleHtml + bodyHtml + customFieldsHtml + bottomBarHtml;

    // Quick Edit click handler
    const editBtn = el.querySelector('.card-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editPost(card.id);
      });
    }

    // 3-dots Context Menu click handler
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
      reactBtn.querySelector('span').textContent = card.reactions > 0 ? card.reactions : '+';
      this.saveState();
      this.showToast(card.hasReacted ? 'Reaction added' : 'Reaction removed');
    });

    // Clicking card opens expanded theater view
    el.addEventListener('click', (e) => {
      if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.play-overlay-btn')) {
        this.openCardDetailModal(card.id);
      }
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

      sourceSection.cards = sourceSection.cards.filter(c => c.id !== this.draggedCard.id);
      targetSection.cards.push(this.draggedCard);

      this.saveState();
      this.renderBoard();
      this.showToast(`Moved to ${targetSection.title}`);
    });
  }

  /* ========================================================================
     Padlet-Authentic Multiple Drafts & Composer Management
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

    // If active draft open, sync it first
    if (this.activeDraftId) {
      this.syncActiveDraftFromInputs();
      this.activeDraftId = null;
    }

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

    // Mount composer card into dock wrapper
    if (this.composerCardWrapper) {
      this.composerCardWrapper.hidden = false;
      this.composerCardWrapper.appendChild(this.composerCard);
    }
    this.composerCard.hidden = false;
    this.composerCard.classList.remove('composer-pop-in');
    void this.composerCard.offsetWidth;
    this.composerCard.classList.add('composer-pop-in');

    this.renderDraftsDock();
    this.titleInput.focus();
    this.showToast(`Editing "${card.title || 'post'}"`);
  }

  cancelEditPost() {
    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.hidden = true;
    if (this.composerCardWrapper) this.composerCardWrapper.hidden = true;
    this.renderDraftsDock();
  }

  saveEditedCard() {
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

    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.hidden = true;
    if (this.composerCardWrapper) this.composerCardWrapper.hidden = true;

    this.saveState();
    this.renderBoard();
    this.renderDraftsDock();
    this.showToast('Post updated!');
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
      this.publishBtn.classList.add('is-update');
    } else {
      this.publishBtn.textContent = 'Publish';
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
        this.syncActiveDraftFromInputs();
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
        this.syncActiveDraftFromInputs();
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
            break;
          }
          case 'new-section-right': {
            const nextNum = this.state.sections.length + 1;
            const newSec = { id: 'sec-' + Date.now(), title: `Section ${nextNum}`, cards: [] };
            this.state.sections.splice(sectionIndex + 1, 0, newSec);
            this.saveState();
            this.renderBoard();
            this.showToast(`Created section to the right`);
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
            break;
          }

          case 'delete-post': {
            if (section) {
              section.cards = section.cards.filter(c => c.id !== card.id);
              this.saveState();
              this.renderBoard();
              this.showToast('Post deleted');
            }
            break;
          }
        }
      });
    });
  }

  openCardContextMenu(card, targetEl) {
    this.closeAllPopovers();
    this.activeContextCard = card;
    if (!this.cardContextMenu || !targetEl) return;

    this.renderCardMenuColors(card);

    if (this.pinActionLabel) {
      this.pinActionLabel.textContent = card.pinned ? 'Unpin post' : 'Pin post';
    }

    const rect = targetEl.getBoundingClientRect();
    const menuWidth = 256;
    let left = rect.right - menuWidth;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }

    // Measure height accurately
    this.cardContextMenu.style.visibility = 'hidden';
    this.cardContextMenu.hidden = false;
    const menuHeight = this.cardContextMenu.offsetHeight || 440;
    this.cardContextMenu.style.visibility = 'visible';

    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 12) {
      const topAbove = rect.top - menuHeight - 6;
      if (topAbove >= 12) {
        top = topAbove;
      } else {
        top = Math.max(12, window.innerHeight - menuHeight - 12);
      }
    }

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
      case 'upload':
        this.handleToolAction('upload');
        break;
      case 'camera':
        this.handleToolAction('camera');
        break;
      case 'ai-image':
      case 'arcade':
        this.handleToolAction('ai');
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
          provider: 'Padlet Poll',
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
    if (this.composerState.attachment) {
      this.previewTypeBadge.textContent = this.composerState.attachment.provider || this.composerState.attachment.type;
      this.previewTitleText.textContent = this.composerState.attachment.title || this.composerState.attachment.caption;
      this.activeAttachmentPreview.hidden = false;
    } else {
      this.activeAttachmentPreview.hidden = true;
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

        if (promptTick) promptTick.classList.add('is-visible');
        if (promptText) {
          promptText.innerHTML = `<strong style="color: #c084fc; font-weight: 700;">${this.escapeHtml(title)}</strong> <span style="color: rgba(255, 255, 255, 0.65); margin-left: 4px;">${this.escapeHtml(desc)}</span>`;
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
    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeComposer();
        this.closeSearchModal();
        this.searchOverlay.hidden = true;
        this.searchOverlay.classList.remove('is-open');
      }
    });

    // Window actions for Post Composer
    document.getElementById('closeModalBtn').addEventListener('click', () => this.closeActiveDraft());
    document.getElementById('minimizeModalBtn').addEventListener('click', () => this.minimizeActiveDraft());
    document.getElementById('expandModalBtn').addEventListener('click', () => this.toggleComposerExpanded());
    document.getElementById('schedulePostBtn').addEventListener('click', () => this.openScheduleModal());
    document.getElementById('closeSubmodalBtn').addEventListener('click', () => this.closeSearchModal());

    // Drafts Bulk Action Dropdown
    this.dockBulkActionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.draftsBulkMenu.hidden = !this.draftsBulkMenu.hidden;
    });

    this.bulkPublishAllBtn.addEventListener('click', () => this.publishAllDrafts());
    this.bulkDeleteAllBtn.addEventListener('click', () => this.deleteAllDrafts());

    document.addEventListener('click', (e) => {
      if (this.draftsBulkMenu && !this.draftsBulkMenu.hidden && !this.dockBulkActionWrapper.contains(e.target)) {
        this.draftsBulkMenu.hidden = true;
      }
      if (this.sectionContextMenu && !this.sectionContextMenu.hidden && !this.sectionContextMenu.contains(e.target)) {
        this.closeSectionContextMenu();
      }
    });

    this.searchAttachmentModal.addEventListener('click', (e) => {
      if (e.target === this.searchAttachmentModal) this.closeSearchModal();
    });

    // Yellow "+ Post" button opens Composer
    document.getElementById('mainPostBtn').addEventListener('click', () => {
      this.createNewDraft(this.state.sections[0]?.id);
    });

    // Title & Body typing state for Publish button
    this.titleInput.addEventListener('input', () => this.updatePublishButtonState());
    this.bodyInput.addEventListener('input', () => this.updatePublishButtonState());

    // Publish click
    this.publishBtn.addEventListener('click', () => this.publishActiveDraft());

    // Color Popover toggle (Picture 2)
    document.getElementById('composerPaletteBtn').addEventListener('click', (e) => {
      this.toggleColorPopover(e);
    });

    this.colorPickerPill.addEventListener('click', (e) => {
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
    this.removeAttachmentBtn.addEventListener('click', () => {
      this.composerState.attachment = null;
      this.updateAttachmentPreviewUI();
    });

    // Initialize Padlet Striped Multi-Tool Toolbar & Shortcuts
    this.initAttachmentToolbar();

    // Submodal Search button & Enter key
    document.getElementById('doSearchBtn').addEventListener('click', () => {
      const q = this.mediaQueryInput.value.trim();
      if (q) this.performMediaSearch(q);
    });

    this.mediaQueryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = this.mediaQueryInput.value.trim();
        if (q) this.performMediaSearch(q);
      }
    });

    // Add Section button
    document.getElementById('addSectionBtn').addEventListener('click', () => {
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
    });

    // Search Toggle in Top Header
    document.getElementById('searchToggleBtn').addEventListener('click', () => {
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

    document.getElementById('closeSearchBtn').addEventListener('click', () => {
      this.searchOverlay.hidden = true;
      this.searchOverlay.classList.remove('is-open');
      this.boardSearchInput.value = '';
      this.filterBoard('');
    });

    this.boardSearchInput.addEventListener('input', (e) => {
      this.filterBoard(e.target.value);
    });

    // Top action placeholders
    document.getElementById('slideshowBtn').addEventListener('click', () => {
      this.showToast('Slideshow mode ready');
    });

    document.getElementById('shareBtn').addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      this.showToast('Board link copied to clipboard!');
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.showToast('Settings opened');
    });
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
