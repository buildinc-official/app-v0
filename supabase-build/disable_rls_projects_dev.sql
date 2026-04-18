-- DEV / UNBLOCK ONLY — do not ship to production with sensitive data.
-- Disables RLS on tables touched by “create project” + nested phases/tasks/materials/members.
-- Run the whole block in Supabase SQL Editor.
--
-- Re-enable later (then re-apply policies from 04_rls_policies.sql):
--   alter table public.projects enable row level security;
--   alter table public.phases enable row level security;
--   ... (same for each table below)

alter table public.projects disable row level security;
alter table public.phases disable row level security;
alter table public.tasks disable row level security;
alter table public.project_members disable row level security;
alter table public.materials disable row level security;
alter table public.material_pricing disable row level security;
