-- Run once if org INSERT fails or returns no row (RLS on SELECT after insert).
-- Safe to re-run.

drop policy if exists org_select_visible on public.organisations;
create policy org_select_visible on public.organisations
for select to authenticated
using (
  owner = auth.uid()
  OR exists (
    select 1 from public.organisation_members om
    where om."orgId" = organisations.id
      and om."userId" = auth.uid()
  )
);
