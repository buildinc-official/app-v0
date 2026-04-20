-- profiles.admin must never be derived from auth user_metadata (client-controlled).
-- Promote admins only via SQL (service role) or a future trusted admin API.

-- RLS: block self-service admin escalation on insert/update (service_role bypasses RLS).
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
for update to authenticated
using (id = auth.uid())
with check (
  id = auth.uid()
  and admin = (select p.admin from public.profiles p where p.id = auth.uid())
);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
for insert to authenticated
with check (id = auth.uid() and admin = false);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
set row_security = off
as $$
begin
  insert into public.profiles (id, email, name, bio, admin)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'bio', ''),
    false
  )
  on conflict (id) do update
  set
    email = excluded.email,
    name = excluded.name,
    bio = excluded.bio;

  return new;
end;
$$;

-- Ensure signup creates a profile row (idempotent on databases that already have this trigger).
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
