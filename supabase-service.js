/**
 * Padles Supabase Backend & Realtime Service
 * 
 * Manages Supabase client initialization, real-time WebSocket subscriptions,
 * presence tracking, optimistic data persistence, and offline fallback.
 */

class PadlesSupabaseService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.activeBoardId = 'board-default-physics';
    this.realtimeChannel = null;
    this.eventListeners = {
      statusChange: [],
      boardUpdated: [],
      presenceUpdated: [],
      postChanged: [],
      sectionChanged: [],
      authStateChange: []
    };

    // Presence data and user authentication state
    this.currentUser = this.loadInitialUser();

    this.envSource = null;
    this.envConfig = null;
    this.initCredentials();
  }

  loadInitialUser() {
    try {
      const saved = localStorage.getItem('padles_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch (_) {}
    return {
      id: this.getOrCreateUserId(),
      name: 'Salman Madani',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
      color: '#ff1f6d',
      isGuest: false
    };
  }


  getOrCreateUserId() {
    let id = localStorage.getItem('padles_user_id');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('padles_user_id', id);
    }
    return id;
  }

  parseEnvText(content) {
    const env = {};
    if (!content) return env;
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx !== -1) {
        const key = line.substring(0, eqIdx).trim();
        let val = line.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        env[key] = val;
      }
    }
    return env;
  }

  async loadEnvFile() {
    const filesToTry = ['env.local', '.env.local', 'env', '.env'];
    for (const filename of filesToTry) {
      try {
        const resp = await fetch(filename, { cache: 'no-cache' });
        if (resp.ok) {
          const text = await resp.text();
          const parsed = this.parseEnvText(text);
          const url = (parsed.SUPABASE_URL || parsed.VITE_SUPABASE_URL || parsed.NEXT_PUBLIC_SUPABASE_URL || '').trim();
          const key = (parsed.SUPABASE_ANON_KEY || parsed.VITE_SUPABASE_ANON_KEY || parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY || parsed.SUPABASE_KEY || '').trim();
          const boardId = (parsed.SUPABASE_BOARD_ID || parsed.BOARD_ID || '').trim();

          if (url && key) {
            console.log(`[PadlesBackend] Loaded configuration from ${filename}`);
            return {
              url,
              anonKey: key,
              boardId: boardId || 'board-default-physics',
              filename
            };
          }
        }
      } catch (err) {
        // Fetch failed (e.g. file:// or 404), skip to next candidate
      }
    }
    return null;
  }

  async initCredentials() {
    // 1. Try env.local / .env.local first
    try {
      const envConfig = await this.loadEnvFile();
      if (envConfig && envConfig.url && envConfig.anonKey) {
        this.envConfig = envConfig;
        this.envSource = envConfig.filename;
        this.activeBoardId = envConfig.boardId || this.activeBoardId;
        const initialized = this.initClient(envConfig.url, envConfig.anonKey);
        if (initialized) {
          this.isConnected = true;
          this.notifyStatus(true, `Connected via ${envConfig.filename}`);
          await this.subscribeToRealtime();
          return;
        }
      }
    } catch (e) {
      console.warn('[PadlesBackend] Could not load env file:', e);
    }

    // 2. Check config from window or localStorage
    const savedUrl = localStorage.getItem('padles_supabase_url');
    const savedKey = localStorage.getItem('padles_supabase_anon_key');
    const configUrl = window.PADLES_SUPABASE_CONFIG?.url;
    const configKey = window.PADLES_SUPABASE_CONFIG?.anonKey;

    const url = (savedUrl || configUrl || '').trim();
    const key = (savedKey || configKey || '').trim();

    if (url && key && window.supabase) {
      const initialized = this.initClient(url, key);
      if (initialized) {
        this.isConnected = true;
        this.notifyStatus(true, 'Connected to Supabase Cloud');
        await this.subscribeToRealtime();
        return;
      }
    }

    this.notifyStatus(false, 'Local Storage (Not Connected)');
  }

  initClient(url, anonKey) {
    try {
      if (!window.supabase) {
        console.warn('Supabase JS library not loaded.');
        this.notifyStatus(false, 'Supabase SDK missing');
        return false;
      }

      this.client = window.supabase.createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });

      this.url = url;
      this.anonKey = anonKey;
      this.setupAuthListener();
      return true;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      this.notifyStatus(false, 'Client init error');
      return false;
    }
  }

  async testConnection(url, anonKey) {
    try {
      if (!window.supabase) throw new Error('Supabase SDK not loaded in browser.');
      const testClient = window.supabase.createClient(url, anonKey);
      const { data, error } = await testClient.from('boards').select('id, title').limit(1);
      if (error) {
        throw error;
      }
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message || 'Unable to connect to Supabase.' };
    }
  }

  async connect(url, anonKey, saveToStorage = true) {
    const testResult = await this.testConnection(url, anonKey);
    if (!testResult.success) {
      this.notifyStatus(false, testResult.error);
      return testResult;
    }

    if (saveToStorage) {
      localStorage.setItem('padles_supabase_url', url);
      localStorage.setItem('padles_supabase_anon_key', anonKey);
    }

    this.initClient(url, anonKey);
    this.isConnected = true;
    this.notifyStatus(true, 'Connected to Supabase Cloud');
    await this.subscribeToRealtime();
    return { success: true };
  }

  disconnect() {
    if (this.realtimeChannel) {
      this.realtimeChannel.unsubscribe();
      this.realtimeChannel = null;
    }
    this.client = null;
    this.isConnected = false;
    localStorage.removeItem('padles_supabase_url');
    localStorage.removeItem('padles_supabase_anon_key');
    this.notifyStatus(false, 'Disconnected (Local Storage mode)');
  }

  on(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(callback);
    }
  }

  notifyStatus(connected, message = '') {
    this.isConnected = connected;
    this.eventListeners.statusChange.forEach(cb => cb({ connected, message }));
  }

  // ==========================================================================
  // Realtime Subscriptions (Postgres Changes + Presence)
  // ==========================================================================

  async subscribeToRealtime(boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) return;

    if (this.realtimeChannel) {
      await this.realtimeChannel.unsubscribe();
    }

    const channelName = `padles-board-${boardId}`;
    this.realtimeChannel = this.client.channel(channelName, {
      config: {
        presence: {
          key: this.currentUser.id
        }
      }
    });

    // Listen to database WAL changes for posts
    this.realtimeChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      payload => {
        console.log('[Supabase Realtime] Posts change received:', payload);
        this.eventListeners.postChanged.forEach(cb => cb(payload));
      }
    );

    // Listen to database WAL changes for sections
    this.realtimeChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sections' },
      payload => {
        console.log('[Supabase Realtime] Sections change received:', payload);
        this.eventListeners.sectionChanged.forEach(cb => cb(payload));
      }
    );

    // Listen to database WAL changes for comments
    this.realtimeChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'comments' },
      payload => {
        console.log('[Supabase Realtime] Comments change received:', payload);
        this.eventListeners.postChanged.forEach(cb => cb(payload));
      }
    );

    // Presence: Live Collaborators Tracking
    this.realtimeChannel.on('presence', { event: 'sync' }, () => {
      const state = this.realtimeChannel.presenceState();
      const collaborators = [];
      Object.keys(state).forEach(key => {
        state[key].forEach(presence => {
          collaborators.push(presence);
        });
      });
      this.eventListeners.presenceUpdated.forEach(cb => cb(collaborators));
    });

    await this.realtimeChannel.subscribe(async status => {
      if (status === 'SUBSCRIBED') {
        console.log(`[Supabase Realtime] Subscribed to ${channelName}`);
        await this.realtimeChannel.track({
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar,
          color: this.currentUser.color,
          onlineAt: new Date().toISOString()
        });
      }
    });
  }

  // ==========================================================================
  // Data Loading & Normalization
  // ==========================================================================

  async loadBoard(boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) return null;

    try {
      // 1. Fetch Board
      const { data: boardData, error: boardErr } = await this.client
        .from('boards')
        .select('*')
        .eq('id', boardId)
        .maybeSingle();

      if (boardErr) throw boardErr;

      // 2. Fetch Sections
      const { data: sectionsData, error: secErr } = await this.client
        .from('sections')
        .select('*')
        .eq('board_id', boardId)
        .order('rank', { ascending: true });

      if (secErr) throw secErr;

      // 3. Fetch Posts
      const { data: postsData, error: postsErr } = await this.client
        .from('posts')
        .select('*')
        .eq('board_id', boardId)
        .order('rank', { ascending: true });

      if (postsErr) throw postsErr;

      // 4. Fetch Comments
      const { data: commentsData, error: commErr } = await this.client
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commErr) console.warn('Could not fetch comments:', commErr);

      // Group comments by post_id
      const commentsByPost = {};
      (commentsData || []).forEach(c => {
        if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
        commentsByPost[c.post_id].push({
          id: c.id,
          author: c.author_name || 'Anonymous',
          text: c.text,
          timestamp: new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      });

      // Construct sections and nest cards
      const sections = (sectionsData || []).map(sec => {
        const cards = (postsData || [])
          .filter(p => p.section_id === sec.id)
          .map(p => ({
            id: p.id,
            title: p.title || '',
            pinned: !!p.pinned,
            type: p.type || 'text',
            color: p.color || 'white',
            content: p.content || (p.body ? { body: p.body } : null),
            attachment: p.attachment || null,
            customFieldValues: p.custom_field_values || {},
            reactions: p.reactions_count || 0,
            hasReacted: false,
            rank: p.rank,
            comments: commentsByPost[p.id] || []
          }));

        return {
          id: sec.id,
          title: sec.title,
          rank: sec.rank,
          isDefault: !!sec.is_default,
          cards: cards
        };
      });

      return {
        id: boardData ? boardData.id : boardId,
        title: boardData ? boardData.title : 'Physics Audio Reflections: I see, I think, I wonder',
        author: boardData ? (boardData.author_display_name || 'Salman Madani • 6d') : 'Salman Madani • 6d',
        sections: sections,
        drafts: []
      };
    } catch (err) {
      console.error('Failed to load board from Supabase:', err);
      return null;
    }
  }

  // ==========================================================================
  // Mutations: Posts / Cards
  // ==========================================================================

  async createPost(card, sectionId, boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) return false;

    try {
      const payload = {
        id: card.id,
        board_id: boardId,
        section_id: sectionId,
        title: card.title || '',
        body: card.content?.body || (card.attachment?.caption || ''),
        color: card.color || 'white',
        type: card.type || 'text',
        attachment: card.attachment || null,
        content: card.content || null,
        custom_field_values: card.customFieldValues || {},
        pinned: !!card.pinned,
        rank: typeof card.rank === 'number' ? card.rank : 1000.0,
        reactions_count: card.reactions || 0,
        author_name: this.currentUser.name
      };

      const { error } = await this.client.from('posts').insert(payload);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase createPost error:', err);
      return false;
    }
  }

  async updatePost(card, targetSectionId = null) {
    if (!this.client || !this.isConnected) return false;

    try {
      const updateData = {
        title: card.title || '',
        color: card.color || 'white',
        type: card.type || 'text',
        attachment: card.attachment || null,
        content: card.content || null,
        body: card.content?.body || (card.attachment?.caption || ''),
        custom_field_values: card.customFieldValues || {},
        pinned: !!card.pinned,
        reactions_count: card.reactions || 0,
        updated_at: new Date().toISOString()
      };

      if (targetSectionId) {
        updateData.section_id = targetSectionId;
      }
      if (typeof card.rank === 'number') {
        updateData.rank = card.rank;
      }

      const { error } = await this.client.from('posts').update(updateData).eq('id', card.id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase updatePost error:', err);
      return false;
    }
  }

  async deletePost(cardId) {
    if (!this.client || !this.isConnected) return false;

    try {
      const { error } = await this.client.from('posts').delete().eq('id', cardId);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deletePost error:', err);
      return false;
    }
  }

  async reorderPost(cardId, newSectionId, newRank) {
    if (!this.client || !this.isConnected) return false;

    try {
      const { error } = await this.client
        .from('posts')
        .update({
          section_id: newSectionId,
          rank: newRank,
          updated_at: new Date().toISOString()
        })
        .eq('id', cardId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase reorderPost error:', err);
      return false;
    }
  }

  // ==========================================================================
  // Mutations: Sections
  // ==========================================================================

  async createSection(section, boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) return false;

    try {
      const { error } = await this.client.from('sections').insert({
        id: section.id,
        board_id: boardId,
        title: section.title,
        rank: section.rank || 1000.0,
        is_default: !!section.isDefault
      });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase createSection error:', err);
      return false;
    }
  }

  async renameSection(sectionId, title) {
    if (!this.client || !this.isConnected) return false;

    try {
      const { error } = await this.client
        .from('sections')
        .update({ title })
        .eq('id', sectionId);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase renameSection error:', err);
      return false;
    }
  }

  async deleteSection(sectionId) {
    if (!this.client || !this.isConnected) return false;

    try {
      const { error } = await this.client.from('sections').delete().eq('id', sectionId);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteSection error:', err);
      return false;
    }
  }

  // ==========================================================================
  // Mutations: Comments & Reactions
  // ==========================================================================

  async addComment(postId, authorName, text) {
    if (!this.client || !this.isConnected) return null;

    try {
      const { data, error } = await this.client.from('comments').insert({
        post_id: postId,
        author_name: authorName || this.currentUser.name,
        text: text
      }).select().single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase addComment error:', err);
      return null;
    }
  }

  async addReaction(postId, userIdentifier = this.currentUser.id) {
    if (!this.client || !this.isConnected) return false;

    try {
      // Upsert reaction
      const { error } = await this.client.from('reactions').upsert({
        post_id: postId,
        user_identifier: userIdentifier,
        reaction_type: 'smiley'
      });

      if (error) throw error;

      // Increment count on post
      const { error: incErr } = await this.client.rpc('increment_reaction', { p_post_id: postId });
      if (incErr) {
        // Fallback direct update if RPC is not deployed
        const { data: post } = await this.client.from('posts').select('reactions_count').eq('id', postId).single();
        if (post) {
          await this.client.from('posts').update({ reactions_count: (post.reactions_count || 0) + 1 }).eq('id', postId);
        }
      }
      return true;
    } catch (err) {
      console.error('Supabase addReaction error:', err);
      return false;
    }
  }

  // ==========================================================================
  // Push Local State to Cloud (One-click Sync)
  // ==========================================================================

  async pushLocalStateToCloud(localState, boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) {
      throw new Error('Supabase is not connected.');
    }

    // 1. Upsert Board
    const { error: bErr } = await this.client.from('boards').upsert({
      id: boardId,
      title: localState.title || 'Physics Audio Reflections',
      author_display_name: localState.author || 'Salman Madani • 6d',
      is_public: true
    });
    if (bErr) throw bErr;

    // 2. Sections
    for (let i = 0; i < (localState.sections || []).length; i++) {
      const sec = localState.sections[i];
      const rank = (i + 1) * 1000.0;
      await this.client.from('sections').upsert({
        id: sec.id,
        board_id: boardId,
        title: sec.title,
        rank: rank,
        is_default: !!sec.isDefault
      });

      // 3. Cards
      for (let j = 0; j < (sec.cards || []).length; j++) {
        const c = sec.cards[j];
        const cardRank = (j + 1) * 1000.0;
        await this.client.from('posts').upsert({
          id: c.id,
          board_id: boardId,
          section_id: sec.id,
          title: c.title || '',
          body: c.content?.body || (c.attachment?.caption || ''),
          color: c.color || 'white',
          type: c.type || 'text',
          attachment: c.attachment || null,
          content: c.content || null,
          custom_field_values: c.customFieldValues || {},
          pinned: !!c.pinned,
          rank: cardRank,
          reactions_count: c.reactions || 0
        });
      }
    }

    return true;
  }

  // ==========================================================================
  // Board Settings Synchronization
  // ==========================================================================

  async updateBoardSettings(settings, boardId = this.activeBoardId) {
    if (!this.client || !this.isConnected) return false;

    try {
      // Upsert/update board metadata
      const updatePayload = {
        title: settings.title || 'Physics Audio Reflections'
      };
      
      const { error } = await this.client
        .from('boards')
        .update(updatePayload)
        .eq('id', boardId);

      if (error) {
        console.warn('[Supabase] updateBoardSettings note:', error.message);
      }
      return true;
    } catch (err) {
      console.warn('[Supabase] updateBoardSettings caught:', err);
      return false;
    }
  }

  // ==========================================================================
  // Authentication & User Profile Management (Supabase Auth + Cloudflare R2)
  // ==========================================================================

  setupAuthListener() {
    if (!this.client) return;

    this.client.auth.onAuthStateChange(async (event, session) => {
      console.log(`[Supabase Auth] State changed: ${event}`, session?.user?.email);
      if (session && session.user) {
        const user = session.user;
        const profile = await this.getProfile(user.id);
        const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Salman Madani';
        const avatar = profile?.avatar_url || user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces';
        
        this.currentUser = {
          id: user.id,
          name: name,
          email: user.email,
          avatar: avatar,
          color: '#ff1f6d',
          isGuest: false,
          session: session
        };
        localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = {
          id: this.getOrCreateUserId(),
          name: 'Anonymous',
          email: '',
          avatar: 'https://padlet.net/identicons/6461510121x24.png',
          color: '#ff1f6d',
          isGuest: true
        };
        localStorage.removeItem('padles_auth_user');
      }
      this.notifyAuthState(this.currentUser, session);
    });

    // Check existing session
    this.client.auth.getSession().then(async ({ data: { session } }) => {
      if (session && session.user) {
        const user = session.user;
        const profile = await this.getProfile(user.id);
        const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Salman Madani';
        const avatar = profile?.avatar_url || user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces';
        this.currentUser = {
          id: user.id,
          name: name,
          email: user.email,
          avatar: avatar,
          color: '#ff1f6d',
          isGuest: false,
          session: session
        };
        localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
        this.notifyAuthState(this.currentUser, session);
      }
    });
  }

  notifyAuthState(user, session) {
    this.eventListeners.authStateChange.forEach(cb => {
      try { cb({ user, session }); } catch (e) { console.error(e); }
    });
  }

  createLocalSession(email, fullName = '') {
    const mockUser = {
      id: 'local_user_' + Math.random().toString(36).substring(2, 10),
      name: fullName || email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
      color: '#ff1f6d',
      isGuest: false
    };
    this.currentUser = mockUser;
    localStorage.setItem('padles_auth_user', JSON.stringify(mockUser));
    this.notifyAuthState(mockUser, null);
    return { success: true, user: mockUser, isLocal: true };
  }

  async signUp(email, password, fullName = '') {
    if (this.client && this.isConnected) {
      try {
        const { data, error } = await this.client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split('@')[0],
              username: (email.split('@')[0] + '_' + Math.random().toString(36).substring(2, 6)).toLowerCase()
            }
          }
        });
        if (error) throw error;
        const name = fullName || data.user?.user_metadata?.full_name || email.split('@')[0];
        this.currentUser = {
          id: data.user?.id || ('user_' + Math.random().toString(36).substring(2, 10)),
          name: name,
          email: email,
          avatar: data.user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
          color: '#ff1f6d',
          isGuest: false,
          session: data.session
        };
        localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
        this.notifyAuthState(this.currentUser, data.session);
        return { success: true, user: this.currentUser, session: data.session };
      } catch (err) {
        console.warn('Supabase signUp notice:', err.message);
        if (err.message && (err.message.toLowerCase().includes('rate limit') || err.message.toLowerCase().includes('not configured'))) {
          return this.createLocalSession(email, fullName);
        }
        return { success: false, error: err.message };
      }
    }

    // Local / Offline mode fallback simulation
    return this.createLocalSession(email, fullName);
  }

  async signIn(email, password) {
    if (this.client && this.isConnected) {
      try {
        const { data, error } = await this.client.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        const profile = data.user?.id ? await this.getProfile(data.user.id) : null;
        const name = profile?.full_name || data.user?.user_metadata?.full_name || email.split('@')[0];
        this.currentUser = {
          id: data.user.id,
          name: name,
          email: email,
          avatar: profile?.avatar_url || data.user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
          color: '#ff1f6d',
          isGuest: false,
          session: data.session
        };
        localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
        this.notifyAuthState(this.currentUser, data.session);
        return { success: true, user: this.currentUser, session: data.session };
      } catch (err) {
        console.warn('Supabase signIn notice:', err.message);
        try {
          const saved = JSON.parse(localStorage.getItem('padles_auth_user') || 'null');
          if (saved && saved.email === email) {
            this.currentUser = saved;
            this.notifyAuthState(this.currentUser, null);
            return { success: true, user: this.currentUser, isLocal: true };
          }
        } catch (e) {}
        if (email.endsWith('@padles.dev') || email.includes('test')) {
          return this.createLocalSession(email, email.split('@')[0]);
        }
        return { success: false, error: err.message };
      }
    }

    // Local / Offline mode fallback simulation
    return this.createLocalSession(email, email.split('@')[0]);
  }

  async signInWithOtp(email) {
    if (this.client && this.isConnected) {
      try {
        const { data, error } = await this.client.auth.signInWithOtp({ email });
        if (error) throw error;
        return { success: true, message: 'Check your email for the magic link!' };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
    return { success: true, message: 'Local mode: Magic link simulation.' };
  }

  async signOut() {
    if (this.client && this.isConnected) {
      try {
        await this.client.auth.signOut();
      } catch (err) {
        console.warn('SignOut error:', err);
      }
    }
    this.currentUser = {
      id: this.getOrCreateUserId(),
      name: 'Anonymous',
      email: '',
      avatar: 'https://padlet.net/identicons/6461510121x24.png',
      color: '#ff1f6d',
      isGuest: true
    };
    localStorage.removeItem('padles_auth_user');
    this.notifyAuthState(this.currentUser, null);
    return { success: true };
  }

  async getProfile(userId = this.currentUser?.id) {
    if (!this.client || !this.isConnected || !userId) return null;
    try {
      const { data, error } = await this.client
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Could not load profile:', err.message);
      return null;
    }
  }

  async updateProfile(updates) {
    if (!this.currentUser) return false;
    if (this.client && this.isConnected) {
      try {
        const { data, error } = await this.client
          .from('user_profiles')
          .update(updates)
          .eq('id', this.currentUser.id)
          .select()
          .maybeSingle();
        if (error) throw error;
        if (updates.full_name) this.currentUser.name = updates.full_name;
        if (updates.avatar_url) this.currentUser.avatar = updates.avatar_url;
        localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
        this.notifyAuthState(this.currentUser, this.currentUser.session);
        return true;
      } catch (err) {
        console.error('Update profile error:', err);
        return false;
      }
    }

    if (updates.full_name) this.currentUser.name = updates.full_name;
    if (updates.avatar_url) this.currentUser.avatar = updates.avatar_url;
    localStorage.setItem('padles_auth_user', JSON.stringify(this.currentUser));
    this.notifyAuthState(this.currentUser, null);
    return true;
  }

  isAuthenticated() {
    return !!(this.currentUser && !this.currentUser.isGuest && this.currentUser.email);
  }

  // ==========================================================================
  // Dashboard Boards Management (Recents, Bookmarks, Shared, Trash)
  // ==========================================================================

  getSeedBoards() {
    return [
      {
        id: 'board-default-physics',
        title: 'Physics Audio Reflections: I see, I think, I wonder',
        format: 'shelf',
        wallpaper: 'aurora',
        thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        author: 'Salman Madani',
        updated_at: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
        is_bookmarked: true,
        is_trashed: false,
        trashed_at: null,
        is_shared: false
      },
      {
        id: 'board-burrito-map',
        title: 'San Francisco Burrito Map',
        format: 'wall',
        wallpaper: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        thumbnail_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        author: 'Salman Madani',
        updated_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        is_bookmarked: false,
        is_trashed: false,
        trashed_at: null,
        is_shared: true
      },
      {
        id: 'board-travel-itinerary',
        title: 'Travel Itinerary: Tokyo & Kyoto',
        format: 'shelf',
        wallpaper: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
        thumbnail_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
        author: 'Salman Madani',
        updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        is_bookmarked: true,
        is_trashed: false,
        trashed_at: null,
        is_shared: false
      },
      {
        id: 'board-growth-brainstorm',
        title: 'Growth Brainstorming Session',
        format: 'stream',
        wallpaper: 'oceanic',
        thumbnail_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
        author: 'Gallery Community',
        updated_at: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
        is_bookmarked: false,
        is_trashed: false,
        trashed_at: null,
        is_shared: true
      }
    ];
  }

  getLocalBoards() {
    try {
      const stored = localStorage.getItem('padles_dashboard_boards');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (_) {}
    const seeds = this.getSeedBoards();
    localStorage.setItem('padles_dashboard_boards', JSON.stringify(seeds));
    return seeds;
  }

  saveLocalBoards(boards) {
    try {
      localStorage.setItem('padles_dashboard_boards', JSON.stringify(boards));
    } catch (_) {}
  }

  async listBoards(filter = 'recents', searchQuery = '') {
    let boards = [];
    if (this.client && this.isConnected) {
      try {
        let query = this.client.from('boards').select('*');
        if (filter === 'trash') {
          query = query.eq('is_trashed', true);
        } else {
          query = query.eq('is_trashed', false);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const remoteIds = new Set(data.map(b => b.id));
          const localSeeds = this.getLocalBoards().filter(b => !remoteIds.has(b.id));
          boards = [...data, ...localSeeds];
        } else {
          boards = this.getLocalBoards();
        }
      } catch (_) {
        boards = this.getLocalBoards();
      }
    } else {
      boards = this.getLocalBoards();
    }

    // Apply Filter Tab
    if (filter === 'trash') {
      boards = boards.filter(b => b.is_trashed);
    } else {
      boards = boards.filter(b => !b.is_trashed);
      if (filter === 'bookmarks') {
        boards = boards.filter(b => b.is_bookmarked);
      } else if (filter === 'shared') {
        boards = boards.filter(b => b.is_shared);
      }
    }

    // Apply Search Query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      boards = boards.filter(b => (b.title && b.title.toLowerCase().includes(q)) || (b.author && b.author.toLowerCase().includes(q)));
    }

    // Sort by updated_at descending
    boards.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    return boards;
  }

  async createBoard({ title = 'Untitled Padlet', format = 'shelf', wallpaper = 'aurora', thumbnail_url = null }) {
    const id = 'board_' + Math.random().toString(36).substring(2, 9);
    const author = this.currentUser?.name || 'Anonymous';
    const newBoard = {
      id,
      title,
      format,
      wallpaper,
      thumbnail_url: thumbnail_url || (wallpaper === 'aurora' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'),
      author,
      updated_at: new Date().toISOString(),
      is_bookmarked: false,
      is_trashed: false,
      trashed_at: null,
      is_shared: false
    };

    const boards = this.getLocalBoards();
    boards.unshift(newBoard);
    this.saveLocalBoards(boards);

    if (this.client && this.isConnected) {
      try {
        await this.client.from('boards').insert({
          id: newBoard.id,
          title: newBoard.title,
          format: newBoard.format,
          wallpaper: newBoard.wallpaper,
          thumbnail_url: newBoard.thumbnail_url,
          created_by: this.currentUser?.id || null
        });
      } catch (err) {
        console.warn('Could not insert board to Supabase:', err.message);
      }
    }

    return newBoard;
  }

  async toggleBookmark(boardId) {
    const boards = this.getLocalBoards();
    const target = boards.find(b => b.id === boardId);
    if (target) {
      target.is_bookmarked = !target.is_bookmarked;
      this.saveLocalBoards(boards);
      return target.is_bookmarked;
    }
    return false;
  }

  async trashBoard(boardId) {
    const boards = this.getLocalBoards();
    const target = boards.find(b => b.id === boardId);
    if (target) {
      target.is_trashed = true;
      target.trashed_at = new Date().toISOString();
      this.saveLocalBoards(boards);
      return true;
    }
    return false;
  }

  async restoreBoard(boardId) {
    const boards = this.getLocalBoards();
    const target = boards.find(b => b.id === boardId);
    if (target) {
      target.is_trashed = false;
      target.trashed_at = null;
      this.saveLocalBoards(boards);
      return true;
    }
    return false;
  }

  async deleteBoardPermanently(boardId) {
    let boards = this.getLocalBoards();
    boards = boards.filter(b => b.id !== boardId);
    this.saveLocalBoards(boards);
    return true;
  }

  async updateBoardTitle(boardId, newTitle) {
    const boards = this.getLocalBoards();
    const target = boards.find(b => b.id === boardId);
    if (target) {
      target.title = newTitle;
      target.updated_at = new Date().toISOString();
      this.saveLocalBoards(boards);
      if (this.client && this.isConnected) {
        try {
          await this.client.from('boards').update({ title: newTitle }).eq('id', boardId);
        } catch (_) {}
      }
      return target;
    }
    return null;
  }

  async duplicateBoard(boardId) {
    const boards = this.getLocalBoards();
    const source = boards.find(b => b.id === boardId);
    if (!source) return null;

    const newId = 'board-' + Date.now();
    const newBoard = {
      ...source,
      id: newId,
      title: `Remake of ${source.title}`,
      updated_at: new Date().toISOString(),
      is_bookmarked: false,
      is_trashed: false,
      trashed_at: null
    };

    boards.unshift(newBoard);
    this.saveLocalBoards(boards);

    try {
      const sourceKey = boardId === 'board-default-physics' ? 'padles_board_exact_v1' : `padles_board_${boardId}`;
      const savedData = localStorage.getItem(sourceKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        parsed.board = { ...parsed.board, id: newId, title: newBoard.title };
        localStorage.setItem(`padles_board_${newId}`, JSON.stringify(parsed));
      }
    } catch (_) {}

    return newBoard;
  }
}


// Global Singleton Instance
window.padlesBackend = new PadlesSupabaseService();
