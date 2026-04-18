-- 1/5 — Extension, enums, tables, indexes
-- Run in Supabase SQL Editor after previous steps succeed.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'role_enum') then
    create type public.role_enum as enum ('Admin', 'Supervisor', 'Employee');
  end if;

  if not exists (select 1 from pg_type where typname = 'category_enum') then
    create type public.category_enum as enum ('Commercial', 'Residential');
  end if;

  if not exists (select 1 from pg_type where typname = 'status_enum') then
    create type public.status_enum as enum ('Inactive', 'Pending', 'Active', 'Reviewing', 'Completed');
  end if;

  if not exists (select 1 from pg_type where typname = 'approval_status_enum') then
    create type public.approval_status_enum as enum ('Pending', 'Approved', 'Rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'request_type_enum') then
    create type public.request_type_enum as enum (
      'TaskAssignment',
      'MaterialRequest',
      'PaymentRequest',
      'TaskCompletion',
      'JoinOrganisation',
      'JoinProject'
    );
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null default '',
  bio text not null default '',
  admin boolean not null default false
);

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  owner uuid not null references public.profiles(id) on delete restrict,
  description text not null default ''
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  owner uuid not null references public.profiles(id) on delete restrict,
  description text not null default '',
  "orgId" uuid references public.organisations(id) on delete set null,
  "startDate" timestamptz,
  "endDate" timestamptz,
  budget numeric(14,2) not null default 0,
  spent numeric(14,2) not null default 0,
  location text not null default '',
  status public.status_enum not null default 'Inactive',
  category public.category_enum not null default 'Commercial'
);

create table if not exists public.phases (
  id uuid primary key default gen_random_uuid(),
  "projectId" uuid not null references public.projects(id) on delete cascade,
  created_at timestamptz not null default now(),
  name text not null,
  description text not null default '',
  "startDate" timestamptz,
  "endDate" timestamptz,
  budget numeric(14,2) not null default 0,
  "order" integer not null default 1
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  "phaseId" uuid not null references public.phases(id) on delete cascade,
  "projectId" uuid not null references public.projects(id) on delete cascade,
  "projectName" text not null default '',
  "assignedTo" uuid references public.profiles(id) on delete set null,
  name text not null,
  status public.status_enum not null default 'Inactive',
  "plannedBudget" numeric(14,2) not null default 0,
  description text not null default '',
  "startDate" timestamptz,
  "endDate" timestamptz,
  "completedDate" timestamptz,
  "order" integer not null default 1,
  "completionNotes" text not null default '',
  "rejectionReason" text not null default '',
  spent numeric(14,2) not null default 0,
  "estimatedDuration" integer not null default 0,
  "approvedBy" uuid references public.profiles(id) on delete set null,
  "paymentCompleted" boolean not null default false,
  "materialsCompleted" boolean not null default false
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  "taskId" uuid not null references public.tasks(id) on delete cascade,
  "materialId" text not null,
  name text not null default '',
  "plannedQuantity" numeric(14,3) not null default 0,
  "usedQuantity" numeric(14,3) not null default 0,
  "unitCost" numeric(14,2) not null default 0,
  unit text not null default '',
  requested boolean not null default false,
  approved boolean not null default false,
  "deliveredQuantity" numeric(14,3) not null default 0,
  "wasteQuantity" numeric(14,3) not null default 0
);

create table if not exists public.material_pricing (
  id uuid primary key default gen_random_uuid(),
  "user" uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  unit text not null,
  price numeric(14,2) not null default 0
);

create table if not exists public.project_templates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  owner uuid not null references public.profiles(id) on delete cascade,
  data jsonb not null default '{}'::jsonb
);

create table if not exists public.organisation_members (
  id uuid primary key default gen_random_uuid(),
  "joinedAt" timestamptz not null default now(),
  "orgId" uuid not null references public.organisations(id) on delete cascade,
  "userId" uuid not null references public.profiles(id) on delete cascade,
  role public.role_enum not null default 'Employee',
  unique ("orgId", "userId")
);

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  "joinedAt" timestamptz not null default now(),
  "projectId" uuid not null references public.projects(id) on delete cascade,
  "userId" uuid not null references public.profiles(id) on delete cascade,
  role public.role_enum not null default 'Employee',
  unique ("projectId", "userId")
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  "projectId" uuid references public.projects(id) on delete cascade,
  "phaseId" uuid references public.phases(id) on delete set null,
  "taskId" uuid references public.tasks(id) on delete set null,
  "materialId" uuid references public.materials(id) on delete set null,
  "requestedBy" uuid not null references public.profiles(id) on delete cascade,
  "requestedTo" uuid not null references public.profiles(id) on delete cascade,
  "approvedBy" uuid references public.profiles(id) on delete set null,
  type public.request_type_enum not null,
  status public.approval_status_enum not null default 'Pending',
  "requestData" jsonb not null default '{}'::jsonb,
  "approvedAt" timestamptz,
  notes text
);

create table if not exists public.request_photos (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  photo_url text not null,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_organisations_owner on public.organisations(owner);
create index if not exists idx_projects_owner on public.projects(owner);
create index if not exists idx_projects_orgid on public.projects("orgId");
create index if not exists idx_phases_projectid on public.phases("projectId");
create index if not exists idx_tasks_phaseid on public.tasks("phaseId");
create index if not exists idx_tasks_projectid on public.tasks("projectId");
create index if not exists idx_tasks_assignedto on public.tasks("assignedTo");
create index if not exists idx_materials_taskid on public.materials("taskId");
create index if not exists idx_material_pricing_user on public.material_pricing("user");
create index if not exists idx_project_templates_owner on public.project_templates(owner);
create index if not exists idx_org_members_org on public.organisation_members("orgId");
create index if not exists idx_org_members_user on public.organisation_members("userId");
create index if not exists idx_project_members_project on public.project_members("projectId");
create index if not exists idx_project_members_user on public.project_members("userId");
create index if not exists idx_requests_requestedto on public.requests("requestedTo");
create index if not exists idx_requests_requestedby on public.requests("requestedBy");
create index if not exists idx_requests_projectid on public.requests("projectId");
create index if not exists idx_request_photos_request on public.request_photos(request_id);
