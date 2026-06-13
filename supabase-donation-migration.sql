-- =============================================
-- NaoFlix Donation System - Supabase Migration
-- =============================================

-- 1. Table: donation_goals
-- Stores monthly server donation targets
create table if not exists public.donation_goals (
  id bigint generated always as identity primary key,
  title text not null default 'Target Server Bulanan',
  target_amount integer not null default 1000000,
  current_amount integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Table: donators
-- Stores individual donation records
create table if not exists public.donators (
  id bigint generated always as identity primary key,
  name text not null default 'Anonim',
  amount integer not null default 0,
  message text,
  created_at timestamptz not null default now()
);

-- 3. Index for top donators query (sorted by amount)
create index if not exists idx_donators_amount on public.donators (amount desc);

-- 4. Index for latest active goal
create index if not exists idx_donation_goals_active on public.donation_goals (is_active, created_at desc);

-- 5. Enable Row Level Security
alter table public.donation_goals enable row level security;
alter table public.donators enable row level security;

-- 6. RLS Policies: Everyone can READ, only service_role can WRITE
-- donation_goals: public read
create policy "Anyone can view donation goals"
  on public.donation_goals
  for select
  using (true);

-- donation_goals: only service_role (webhook backend) can insert/update
create policy "Service role can manage donation goals"
  on public.donation_goals
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- donators: public read
create policy "Anyone can view donators"
  on public.donators
  for select
  using (true);

-- donators: only service_role (webhook backend) can insert
create policy "Service role can insert donators"
  on public.donators
  for insert
  with check (auth.role() = 'service_role');

-- donators: only service_role can update
create policy "Service role can update donators"
  on public.donators
  for update
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- 7. Enable Realtime for live updates on the web
alter publication supabase_realtime add table public.donators;
alter publication supabase_realtime add table public.donation_goals;

-- 8. Seed: Insert a default donation goal
insert into public.donation_goals (title, target_amount, current_amount, is_active)
values ('Target Server Bulanan', 500000, 0, true);
