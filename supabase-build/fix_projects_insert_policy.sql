-- Run once if project INSERT fails with 42501 for org members. Safe to re-run.
-- Uses is_org_member() so membership is checked with row_security off (not via nested EXISTS + RLS).

drop policy if exists projects_insert_owner on public.projects;
create policy projects_insert_owner on public.projects
for insert to authenticated
with check (
  owner = auth.uid()
  and (
    "orgId" is null
    or public.is_org_member("orgId")
  )
);

drop function if exists public.projects_insert_allowed(uuid, uuid);
