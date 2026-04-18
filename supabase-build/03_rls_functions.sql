-- 3/5 — RLS helper functions + template owner id + grants

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.organisations o
    where o.id = org_id and o.owner = auth.uid()
  )
  or exists (
    select 1
    from public.organisation_members om
    where om."orgId" = org_id and om."userId" = auth.uid()
  );
$$;

create or replace function public.is_org_admin_or_owner(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.organisations o
    where o.id = org_id and o.owner = auth.uid()
  )
  or exists (
    select 1
    from public.organisation_members om
    where om."orgId" = org_id
      and om."userId" = auth.uid()
      and om.role = 'Admin'
  );
$$;

create or replace function public.can_access_project(project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.projects p
    left join public.project_members pm
      on pm."projectId" = p.id and pm."userId" = auth.uid()
    where p.id = project_id
      and (
        p.owner = auth.uid()
        or pm.id is not null
        or (p."orgId" is not null and public.is_org_member(p."orgId"))
      )
  );
$$;

create or replace function public.can_manage_project(project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.projects p
    left join public.project_members pm
      on pm."projectId" = p.id and pm."userId" = auth.uid()
    where p.id = project_id
      and (
        p.owner = auth.uid()
        or (pm.id is not null and pm.role in ('Admin', 'Supervisor'))
        or (p."orgId" is not null and public.is_org_admin_or_owner(p."orgId"))
      )
  );
$$;

grant execute on function public.is_org_member(uuid) to authenticated;
grant execute on function public.is_org_admin_or_owner(uuid) to authenticated;
grant execute on function public.can_access_project(uuid) to authenticated;
grant execute on function public.can_manage_project(uuid) to authenticated;

-- Global + private templates: replace placeholder after you create the shared template user.
create or replace function public.template_owner_id()
returns uuid
language sql
stable
as $$
  select '00000000-0000-0000-0000-000000000000'::uuid;
$$;
