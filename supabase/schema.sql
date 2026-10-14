-- ============================================================================
-- Padles Production Database Schema (Supabase PostgreSQL DDL)
-- Idempotent script: Safe to run multiple times in Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. Boards Table
-- ============================================================================
create table if not exists public.boards (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  description text default '',
  author_id uuid references auth.users(id) on delete set null,
  author_display_name text default 'Salman Madani • 6d',
  settings jsonb default '{"wallpaper": "aurora", "reactions": "smileys"}'::jsonb,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 2. Sections Table (Columns)
-- ============================================================================
create table if not exists public.sections (
  id text primary key default gen_random_uuid()::text,
  board_id text not null references public.boards(id) on delete cascade,
  title text not null,
  rank float8 not null default 1000.0,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ============================================================================
-- 3. Posts Table (Cards)
-- ============================================================================
create table if not exists public.posts (
  id text primary key default gen_random_uuid()::text,
  section_id text not null references public.sections(id) on delete cascade,
  board_id text not null references public.boards(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text default 'Anonymous',
  title text default '',
  body text default '',
  color text default 'white',
  type text default 'text',
  attachment jsonb default null,
  content jsonb default null,
  custom_field_values jsonb default '{}'::jsonb,
  pinned boolean default false,
  rank float8 not null default 1000.0,
  reactions_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 4. Comments Table
-- ============================================================================
create table if not exists public.comments (
  id text primary key default gen_random_uuid()::text,
  post_id text not null references public.posts(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null default 'Anonymous',
  text text not null,
  created_at timestamptz default now()
);

-- ============================================================================
-- 5. Reactions Table
-- ============================================================================
create table if not exists public.reactions (
  id text primary key default gen_random_uuid()::text,
  post_id text not null references public.posts(id) on delete cascade,
  user_identifier text not null,
  reaction_type text default 'smiley',
  created_at timestamptz default now(),
  unique (post_id, user_identifier)
);

-- ============================================================================
-- 6. Custom Field Definitions Table
-- ============================================================================
create table if not exists public.custom_fields (
  id text primary key default gen_random_uuid()::text,
  board_id text not null references public.boards(id) on delete cascade,
  name text not null,
  type text not null,
  options jsonb default '[]'::jsonb,
  is_required boolean default false,
  created_at timestamptz default now()
);

-- ============================================================================
-- 7. Indexes for Query Performance
-- ============================================================================
create index if not exists idx_sections_board_id on public.sections(board_id);
create index if not exists idx_sections_rank on public.sections(rank);
create index if not exists idx_posts_board_id on public.posts(board_id);
create index if not exists idx_posts_section_id on public.posts(section_id);
create index if not exists idx_posts_rank on public.posts(rank);
create index if not exists idx_comments_post_id on public.comments(post_id);
create index if not exists idx_reactions_post_id on public.reactions(post_id);

-- ============================================================================
-- 8. Row Level Security (RLS) Policies
-- ============================================================================
alter table public.boards enable row level security;
alter table public.sections enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;
alter table public.custom_fields enable row level security;

-- Drop obsolete wide-open and old policies if present
drop policy if exists "Public full access to boards" on public.boards;
drop policy if exists "Public full access to sections" on public.sections;
drop policy if exists "Public full access to posts" on public.posts;
drop policy if exists "Public full access to comments" on public.comments;
drop policy if exists "Public full access to reactions" on public.reactions;
drop policy if exists "Public full access to custom_fields" on public.custom_fields;
drop policy if exists "Read public boards" on public.boards;
drop policy if exists "Create own boards" on public.boards;
drop policy if exists "Manage own boards" on public.boards;
drop policy if exists "Delete own boards" on public.boards;
drop policy if exists "Read sections of visible boards" on public.sections;
drop policy if exists "Create sections on visible boards" on public.sections;
drop policy if exists "Board owner manages sections" on public.sections;
drop policy if exists "Board owner deletes sections" on public.sections;
drop policy if exists "Read posts on visible boards" on public.posts;
drop policy if exists "Insert posts on public boards" on public.posts;
drop policy if exists "Authors update own posts" on public.posts;
drop policy if exists "Authors delete own posts" on public.posts;
drop policy if exists "Read comments on visible boards" on public.comments;
drop policy if exists "Insert comments on public boards" on public.comments;
drop policy if exists "Authors update own comments" on public.comments;
drop policy if exists "Authors delete own comments" on public.comments;
drop policy if exists "Read reactions on visible boards" on public.reactions;
drop policy if exists "Manage reactions on visible boards" on public.reactions;
drop policy if exists "Read custom_fields on visible boards" on public.custom_fields;
drop policy if exists "Board owner manages custom_fields" on public.custom_fields;

-- ----- BOARDS POLICIES -----
-- Anyone can view public boards, or author can view private boards
create policy "Read public boards" on public.boards
  for select using (is_public = true or (auth.uid() is not null and author_id = auth.uid()));

-- Only authenticated users can create boards, and must set author_id = auth.uid()
create policy "Create own boards" on public.boards
  for insert with check (auth.uid() is not null and author_id = auth.uid());

-- Only board author can update/delete their own boards
create policy "Manage own boards" on public.boards
  for update using (auth.uid() is not null and author_id = auth.uid());
create policy "Delete own boards" on public.boards
  for delete using (auth.uid() is not null and author_id = auth.uid());

-- ----- SECTIONS POLICIES -----
-- Sections are readable if the parent board is readable
create policy "Read sections of visible boards" on public.sections
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = sections.board_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

-- Only board owner can create/update/delete sections (or demo board with null author)
create policy "Create sections on visible boards" on public.sections
  for insert with check (
    exists (
      select 1 from public.boards b
      where b.id = board_id
      and ((auth.uid() is not null and b.author_id = auth.uid()) or (b.is_public = true and b.author_id is null))
    )
  );

create policy "Board owner manages sections" on public.sections
  for update using (
    exists (
      select 1 from public.boards b
      where b.id = board_id
      and ((auth.uid() is not null and b.author_id = auth.uid()) or (b.is_public = true and b.author_id is null))
    )
  );

create policy "Board owner deletes sections" on public.sections
  for delete using (
    exists (
      select 1 from public.boards b
      where b.id = board_id
      and ((auth.uid() is not null and b.author_id = auth.uid()) or (b.is_public = true and b.author_id is null))
    )
  );

-- ----- POSTS POLICIES -----
-- Posts readable if parent board is readable
create policy "Read posts on visible boards" on public.posts
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = posts.board_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

-- Posts can be inserted on public boards or boards owned by user.
-- Ensures that unauthenticated users cannot forge an author_id, and authenticated users match their uid.
create policy "Insert posts on public boards" on public.posts
  for insert with check (
    exists (
      select 1 from public.boards b
      where b.id = board_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
    and (
      (auth.uid() is not null and (author_id = auth.uid() or author_id is null))
      or (auth.uid() is null and author_id is null)
    )
  );

-- Post authors can update their own posts; board owners can update any post on their board
create policy "Authors update own posts" on public.posts
  for update using (
    (auth.uid() is not null and author_id = auth.uid())
    or exists (
      select 1 from public.boards b
      where b.id = board_id
      and (auth.uid() is not null and b.author_id = auth.uid())
    )
    or exists (
      select 1 from public.boards b
      where b.id = board_id
      and b.is_public = true and b.author_id is null and author_id is null
    )
  );

-- Post authors can delete their own posts; board owners can delete any post on their board
create policy "Authors delete own posts" on public.posts
  for delete using (
    (auth.uid() is not null and author_id = auth.uid())
    or exists (
      select 1 from public.boards b
      where b.id = board_id
      and (auth.uid() is not null and b.author_id = auth.uid())
    )
    or exists (
      select 1 from public.boards b
      where b.id = board_id
      and b.is_public = true and b.author_id is null and author_id is null
    )
  );

-- ----- COMMENTS POLICIES -----
create policy "Read comments on visible boards" on public.comments
  for select using (
    exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = comments.post_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

create policy "Insert comments on public boards" on public.comments
  for insert with check (
    exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = post_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
    and (
      (auth.uid() is not null and (author_id = auth.uid() or author_id is null))
      or (auth.uid() is null and author_id is null)
    )
  );

create policy "Authors update own comments" on public.comments
  for update using (
    (auth.uid() is not null and author_id = auth.uid())
    or exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = post_id
      and auth.uid() is not null and b.author_id = auth.uid()
    )
  );

create policy "Authors delete own comments" on public.comments
  for delete using (
    (auth.uid() is not null and author_id = auth.uid())
    or exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = post_id
      and auth.uid() is not null and b.author_id = auth.uid()
    )
  );

-- ----- REACTIONS POLICIES -----
create policy "Read reactions on visible boards" on public.reactions
  for select using (
    exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = reactions.post_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

create policy "Manage reactions on visible boards" on public.reactions
  for all using (
    exists (
      select 1 from public.posts p
      join public.boards b on b.id = p.board_id
      where p.id = post_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

-- ----- CUSTOM FIELDS POLICIES -----
create policy "Read custom_fields on visible boards" on public.custom_fields
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = custom_fields.board_id
      and (b.is_public = true or (auth.uid() is not null and b.author_id = auth.uid()))
    )
  );

create policy "Board owner manages custom_fields" on public.custom_fields
  for all using (
    exists (
      select 1 from public.boards b
      where b.id = board_id
      and ((auth.uid() is not null and b.author_id = auth.uid()) or (b.is_public = true and b.author_id is null))
    )
  );

-- ----- SAFE REACTION INCREMENT RPC -----
create or replace function public.increment_reaction(p_post_id text)
returns void as $$
begin
  update public.posts
  set reactions_count = coalesce(reactions_count, 0) + 1
  where id = p_post_id;
end;
$$ language plpgsql security definer;

-- ============================================================================
-- 9. Realtime Publication Setup
-- ============================================================================
-- Enable PostgreSQL replication stream for Supabase Realtime WebSocket engine
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'boards') then
    alter publication supabase_realtime add table public.boards;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'sections') then
    alter publication supabase_realtime add table public.sections;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'posts') then
    alter publication supabase_realtime add table public.posts;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'comments') then
    alter publication supabase_realtime add table public.comments;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'reactions') then
    alter publication supabase_realtime add table public.reactions;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'custom_fields') then
    alter publication supabase_realtime add table public.custom_fields;
  end if;
end $$;

-- Set replica identity to full so update/delete events contain old record values
alter table public.boards replica identity full;
alter table public.sections replica identity full;
alter table public.posts replica identity full;
alter table public.comments replica identity full;
alter table public.reactions replica identity full;

-- ============================================================================
-- 10. Seed Initial Default Board
-- ============================================================================
insert into public.boards (id, title, author_display_name, is_public)
values (
  'board-default-physics',
  'Physics Audio Reflections: I see, I think, I wonder',
  'Salman Madani • 6d',
  true
)
on conflict (id) do nothing;

-- Sections
insert into public.sections (id, board_id, title, rank, is_default)
values
  ('sec-instructions', 'board-default-physics', 'Instructions', 1000.0, true),
  ('sec-balloon-cars', 'board-default-physics', 'Balloon Cars', 2000.0, false),
  ('sec-newton-1', 'board-default-physics', 'Newton''s First Law', 3000.0, false),
  ('sec-bipoc', 'board-default-physics', 'BIPOC Scientists', 4000.0, false),
  ('sec-5', 'board-default-physics', 'Section 5', 5000.0, false)
on conflict (id) do nothing;

-- Initial Posts
insert into public.posts (id, section_id, board_id, title, pinned, type, color, rank, reactions_count, content)
values (
  'card-instructions-1',
  'sec-instructions',
  'board-default-physics',
  'Student Instructions',
  true,
  'text',
  'cyan',
  1000.0,
  3,
  '{
    "intro": "Watch the video or look at the image.",
    "body": "Record yourself or you and your partner talking about what you See, Think, and Wonder:",
    "bullets": [
      "<strong>I see:</strong> Describe what you see",
      "<strong>I think:</strong> Explain what you think is happening. If possible, connect to concepts that we have learned about in class.",
      "<strong>I wonder:</strong> What questions do you have about what you see?"
    ]
  }'::jsonb
)
on conflict (id) do nothing;

insert into public.posts (id, section_id, board_id, title, pinned, type, color, rank, reactions_count, attachment)
values
(
  'card-balloon-1',
  'sec-balloon-cars',
  'board-default-physics',
  'balloon car making',
  true,
  'video',
  'cyan',
  1000.0,
  4,
  '{
    "provider": "YouTube",
    "thumbnailUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
    "caption": "balloon car making",
    "videoUrl": "https://youtube.com"
  }'::jsonb
),
(
  'card-balloon-2',
  'sec-balloon-cars',
  'board-default-physics',
  'Balloon car: Newton''s third law',
  true,
  'video',
  'cyan',
  2000.0,
  2,
  '{
    "provider": "YouTube",
    "thumbnailUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    "caption": "Balloon car: Newton''s third law",
    "videoUrl": "https://youtube.com"
  }'::jsonb
),
(
  'card-newton-egg',
  'sec-newton-1',
  'board-default-physics',
  'Newtons First Law Of Motion : Egg Drop',
  true,
  'video',
  'cyan',
  1000.0,
  5,
  '{
    "provider": "YouTube",
    "thumbnailUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "caption": "Newtons First Law Of Motion : Egg Drop",
    "videoUrl": "https://youtube.com"
  }'::jsonb
),
(
  'card-bipoc-1',
  'sec-bipoc',
  'board-default-physics',
  'Classroom Resources - I Am A Scientist',
  true,
  'link',
  'cyan',
  1000.0,
  6,
  '{
    "domain": "iamascientist.info",
    "title": "Classroom Resources - I Am A Scientist",
    "thumbnailUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    "url": "https://iamascientist.info"
  }'::jsonb
)
on conflict (id) do nothing;

-- ============================================================================
-- 11. Dashboard & User Profile Schema Extensions
-- ============================================================================

-- Add dashboard columns to boards table if they do not exist
alter table public.boards add column if not exists is_trashed boolean default false;
alter table public.boards add column if not exists trashed_at timestamptz default null;
alter table public.boards add column if not exists thumbnail_url text default null;
alter table public.boards add column if not exists format text default 'shelf';
alter table public.boards add column if not exists wallpaper text default 'aurora';

-- User Profiles Table (Linked to Supabase Auth, avatars stored on Cloudflare R2)
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text unique,
  full_name text default 'Anonymous Padler',
  avatar_url text default null, -- Stored in Cloudflare R2
  tier text default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User Bookmarks Table (Starred boards)
create table if not exists public.user_bookmarks (
  user_id uuid references auth.users(id) on delete cascade,
  board_id text references public.boards(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, board_id)
);

-- User Recents Table (Recently visited boards)
create table if not exists public.user_recents (
  user_id uuid references auth.users(id) on delete cascade,
  board_id text references public.boards(id) on delete cascade,
  viewed_at timestamptz default now(),
  primary key (user_id, board_id)
);

-- Indexes for performance
create index if not exists idx_boards_author on public.boards(author_id);
create index if not exists idx_boards_trashed on public.boards(is_trashed);
create index if not exists idx_user_bookmarks_user on public.user_bookmarks(user_id);
create index if not exists idx_user_recents_user on public.user_recents(user_id, viewed_at desc);

-- RLS for new tables
alter table public.user_profiles enable row level security;
alter table public.user_bookmarks enable row level security;
alter table public.user_recents enable row level security;

drop policy if exists "Public read profiles" on public.user_profiles;
drop policy if exists "Users update own profile" on public.user_profiles;
drop policy if exists "Users insert own profile" on public.user_profiles;
drop policy if exists "Public manage bookmarks" on public.user_bookmarks;
drop policy if exists "Public manage recents" on public.user_recents;
drop policy if exists "Manage own bookmarks" on public.user_bookmarks;
drop policy if exists "Manage own recents" on public.user_recents;

-- Public can read profiles (names, avatars, usernames)
create policy "Public read profiles" on public.user_profiles
  for select using (true);

-- Users can only insert their own profile
create policy "Users insert own profile" on public.user_profiles
  for insert with check (auth.uid() is not null and id = auth.uid());

-- Users can only update their own profile
create policy "Users update own profile" on public.user_profiles
  for update using (auth.uid() is not null and id = auth.uid())
  with check (auth.uid() is not null and id = auth.uid());

-- Bookmarks: user can only view, insert, and delete their OWN bookmarks
create policy "Manage own bookmarks" on public.user_bookmarks
  for all using (auth.uid() is not null and user_id = auth.uid())
  with check (auth.uid() is not null and user_id = auth.uid());

-- Recents: user can only view, insert, and delete their OWN browsing recents
create policy "Manage own recents" on public.user_recents
  for all using (auth.uid() is not null and user_id = auth.uid())
  with check (auth.uid() is not null and user_id = auth.uid());

-- Realtime publication for profiles and bookmarks
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'user_profiles') then
    alter publication supabase_realtime add table public.user_profiles;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'user_bookmarks') then
    alter publication supabase_realtime add table public.user_bookmarks;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'user_recents') then
    alter publication supabase_realtime add table public.user_recents;
  end if;
end $$;

-- Trigger to automatically create user_profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name, username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 6))
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

