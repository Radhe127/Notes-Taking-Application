-- Run this whole file once in the Supabase SQL editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled',
  content text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table notes enable row level security;

create policy "notes_select_own" on notes
  for select using (auth.uid() = user_id);
create policy "notes_insert_own" on notes
  for insert with check (auth.uid() = user_id);
create policy "notes_update_own" on notes
  for update using (auth.uid() = user_id);
create policy "notes_delete_own" on notes
  for delete using (auth.uid() = user_id);

-- Keep updated_at fresh on every edit.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists notes_set_updated_at on notes;
create trigger notes_set_updated_at
  before update on notes
  for each row execute function set_updated_at();

create index if not exists notes_user_id_idx on notes (user_id);
