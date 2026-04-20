-- 2/5 — Profile row on signup (trigger on auth.users)

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
set row_security = off
as $$
begin
  -- Never read admin from raw_user_meta_data: it is set by the client on signUp.
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
