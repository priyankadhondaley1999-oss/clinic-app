import { createClient } from '@supabase/supabase-js'

// ── Replace these with your Supabase project values ───────────────────────────
// Found in: Supabase dashboard → Settings → API
const SUPABASE_URL = 'https://teqqwhvbkuudjmhxwgxo.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcXF3aHZia3V1ZGptaHh3Z3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5Njg5NTAsImV4cCI6MjA5MzU0NDk1MH0.iE6LPe6SpMKciZyL8bZGzs-k6uQtTuoxGts-SVEXQmQ'
// ─────────────────────────────────────────────────────────────────────────────

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Database schema (run this in Supabase SQL editor once) ────────────────────
export const SCHEMA_SQL = `
-- Patients table
create table if not exists patients (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name text not null,
  date_of_birth date,
  age integer,
  gender text,
  phone text,
  email text,
  address text,
  occupation text,
  referred_by text,
  file_number text unique,
  consultation_type text, -- 'quick_relief' or 'full_picture'
  status text default 'active' -- 'active', 'completed', 'archived'
);

-- Simple intake forms (Quick Relief)
create table if not exists intake_simple (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  patient_id uuid references patients(id) on delete cascade,
  complaint text,
  duration text,
  area_affected text,
  pain_score integer,
  health_conditions text,
  medications text,
  allergies text,
  previous_treatment text,
  previous_treatment_detail text,
  consent_signed boolean default false,
  signature text,
  raw_data jsonb
);

-- Full functional intake forms (The Full Picture)
create table if not exists intake_full (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  patient_id uuid references patients(id) on delete cascade,
  -- Chief concern
  complaint text,
  duration text,
  previous_treatment text,
  previous_treatment_detail text,
  goal_short text,
  goal_long text,
  -- Medical
  conditions text[],
  conditions_other text,
  medications text,
  allergy_drug text,
  allergy_material text,
  allergy_food text,
  surgeries text,
  family_history text[],
  -- Lifestyle
  diet_type text,
  meals_per_day text,
  water_intake text,
  diet_habits text[],
  sleep_hours text,
  sleep_quality text,
  sleep_symptoms text[],
  exercise text,
  stress_level integer,
  stress_factors text[],
  habits text[],
  -- Dental
  last_visit text,
  last_visit_reason text,
  oral_symptoms text[],
  brushing text,
  flossing text,
  toothpaste text,
  mouthwash text,
  hygiene_extras text[],
  prev_dental text[],
  anxiety_level integer,
  dental_trauma text,
  -- Hormonal
  hormonal text[],
  hormonal_oral text,
  toxins text[],
  amalgam text,
  metal_sensitivity text,
  recent_labs text,
  consent_signed boolean default false,
  signature text,
  raw_data jsonb
);

-- Clinical examination records
create table if not exists examinations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  patient_id uuid references patients(id) on delete cascade,
  exam_type text, -- 'simple' or 'full'
  raw_data jsonb,
  -- Simple exam fields
  chief_complaint text,
  pain_score integer,
  diagnosis text,
  treatment_provided text[],
  prescription text,
  further_treatment text,
  next_appointment text,
  -- Full exam summary
  primary_diagnosis text,
  secondary_diagnosis text,
  phase1 text,
  phase2 text,
  phase3 text,
  phase4 text
);

-- Generated reports (briefings, treatment plans, summaries)
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  patient_id uuid references patients(id) on delete cascade,
  report_type text, -- 'pre_consultation_brief', 'treatment_summary', 'treatment_plan'
  prompt_used text,
  storage_path text, -- path to PDF in Supabase storage
  generated_at timestamptz default now()
);

-- Enable Row Level Security on all tables
alter table patients enable row level security;
alter table intake_simple enable row level security;
alter table intake_full enable row level security;
alter table examinations enable row level security;
alter table reports enable row level security;

-- RLS Policies — only authenticated users (clinic staff) can access
create policy "Authenticated users can do everything" on patients
  for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything" on intake_simple
  for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything" on intake_full
  for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything" on examinations
  for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything" on reports
  for all using (auth.role() = 'authenticated');

-- Storage bucket for PDFs
insert into storage.buckets (id, name, public)
values ('patient-reports', 'patient-reports', false)
on conflict do nothing;

create policy "Authenticated users can manage patient reports"
  on storage.objects for all
  using (bucket_id = 'patient-reports' and auth.role() = 'authenticated');

-- Auto-update updated_at on patients
create or replace function update_updated_at()
returns trigger as \$\$
begin
  new.updated_at = now();
  return new;
end;
\$\$ language plpgsql;

create trigger patients_updated_at
  before update on patients
  for each row execute function update_updated_at();
`
