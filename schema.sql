-- SiteTrack Database Schema
-- Run this in Supabase SQL Editor (Database > SQL Editor > New Query)

-- Users (supervisors/admins)
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique,
  phone text,
  pin text not null unique,
  role text not null default 'supervisor' check (role in ('supervisor', 'admin')),
  job_title text,
  created_at timestamptz default now()
);

-- Jobsites
create table jobsites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  status text not null default 'active' check (status in ('active', 'closed')),
  created_at timestamptz default now()
);

-- Equipment
create table equipment (
  id uuid primary key default gen_random_uuid(),
  item_code text unique not null,
  name text not null,
  type text not null check (type in ('Ladder', 'Scaffold', 'Power Tool', 'Hand Tool', 'Safety', 'Generator', 'Other')),
  serial_number text,
  purchase_date date,
  condition text default 'Good' check (condition in ('Good', 'Fair', 'Poor', 'Out of Service')),
  notes text,
  status text not null default 'Available' check (status in ('Available', 'Out', 'Missing')),
  current_site_id uuid references jobsites(id) on delete set null,
  last_scanned_by uuid references users(id) on delete set null,
  last_scanned_at timestamptz,
  created_at timestamptz default now()
);

-- Scan log (audit trail)
create table scan_log (
  id uuid primary key default gen_random_uuid(),
  equipment_id uuid references equipment(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  site_id uuid references jobsites(id) on delete set null,
  action text not null check (action in ('check_out', 'check_in', 'audit', 'mark_missing', 'mark_found')),
  notes text,
  scanned_at timestamptz default now()
);

-- Enable Row Level Security (open for now, lock down later)
alter table users enable row level security;
alter table jobsites enable row level security;
alter table equipment enable row level security;
alter table scan_log enable row level security;

create policy "Allow all" on users for all using (true);
create policy "Allow all" on jobsites for all using (true);
create policy "Allow all" on equipment for all using (true);
create policy "Allow all" on scan_log for all using (true);

-- Seed: RSL Contractors jobsites
insert into jobsites (name, address, status) values
  ('Shop', '4686 Ivy St. Denver, CO 80216', 'active'),
  ('Colorado School of Mines', '1109 19th St. Golden, CO 80401', 'active'),
  ('CU Boulder Res One', '1945 Athens St. Boulder, CO 80302', 'active'),
  ('299 Milwaukee', '221 Milwaukee St. Denver, CO 80206', 'active'),
  ('3850 Blake', '3850 Blake St. Denver, CO 80216', 'active'),
  ('Cherry Lane', '2500 E 2nd Ave. Denver, CO 80206', 'active'),
  ('3875 Walnut', '3875 Walnut St. Denver, CO 80216', 'active'),
  ('3300 Blake', '3300 Blake St. Denver, CO 80216', 'active');

-- Seed: RSL Contractors team
insert into users (name, email, phone, pin, role, job_title) values
  ('Riley Satterfield',  'rsatterfield@rslcontractors.com', '817-791-1340', '1340', 'admin',      'Project Manager'),
  ('Alberto Hernandez',  'ahernandez@rslcontractors.com',  '713-502-4393', '4393', 'admin',      'Superintendent'),
  ('Danny Aretz',        'djaretz@rslcontractors.com',     '346-878-1905', '1905', 'admin',      'Superintendent'),
  ('John Ross',          'jross@rslcontractors.com',       '832-948-2518', '2518', 'admin',      'Assistant Project Manager'),
  ('Jesse Keehner',      'jkeehner@rslcontractors.com',    '346-889-4558', '4558', 'admin',      'Assistant Project Manager'),
  ('Rafael Rivera',      'rafael.rivera@rslcontractors.com','720-579-1561','1561', 'supervisor', null),
  ('Juan Ferrales',      null,                             '720-324-1296', '1296', 'supervisor', 'Driver'),
  ('Ricardo Ferrales',   null,                             '720-290-5832', '5832', 'supervisor', 'Driver'),
  ('Antonio Resendiz',   null,                             '832-960-2396', '2396', 'supervisor', 'Driver');
