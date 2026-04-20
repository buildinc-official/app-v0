-- Run AFTER 01_schema.sql + 02_auth_trigger.sql if auth.users already had rows before the trigger existed.
-- Separate from the main rebuild to avoid SQL Editor timeouts on large auth.users.
-- Safe to re-run: uses ON CONFLICT DO NOTHING.

insert into public.profiles (id, email, name, bio, admin)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data->>'name', ''),
  coalesce(u.raw_user_meta_data->>'bio', ''),
  false
from auth.users u
on conflict (id) do nothing;
