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

-- Drop existing public policies if present to prevent errors on rerun
drop policy if exists "Public full access to boards" on public.boards;
drop policy if exists "Public full access to sections" on public.sections;
drop policy if exists "Public full access to posts" on public.posts;
drop policy if exists "Public full access to comments" on public.comments;
drop policy if exists "Public full access to reactions" on public.reactions;
drop policy if exists "Public full access to custom_fields" on public.custom_fields;

-- Allow anon and authenticated roles full read and write access for collaboration
create policy "Public full access to boards" on public.boards for all using (true) with check (true);
create policy "Public full access to sections" on public.sections for all using (true) with check (true);
create policy "Public full access to posts" on public.posts for all using (true) with check (true);
create policy "Public full access to comments" on public.comments for all using (true) with check (true);
create policy "Public full access to reactions" on public.reactions for all using (true) with check (true);
create policy "Public full access to custom_fields" on public.custom_fields for all using (true) with check (true);

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
drop policy if exists "Public manage bookmarks" on public.user_bookmarks;
drop policy if exists "Public manage recents" on public.user_recents;

create policy "Public read profiles" on public.user_profiles for select using (true);
create policy "Users update own profile" on public.user_profiles for all using (true) with check (true);
create policy "Public manage bookmarks" on public.user_bookmarks for all using (true) with check (true);
create policy "Public manage recents" on public.user_recents for all using (true) with check (true);

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

