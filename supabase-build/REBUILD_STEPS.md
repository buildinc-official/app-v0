# Supabase: rebuild database from scratch

Run these **in order** in the Supabase SQL Editor (one file per run). Do not wrap in a single `begin`/`commit`.

| Step | File |
|------|------|
| 1 | `01_schema.sql` |
| 2 | `02_auth_trigger.sql` |
| 3 | `03_rls_functions.sql` |
| 4 | `04_rls_policies.sql` |
| 5 | `05_storage.sql` |

## After the five steps

1. Set app env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_TEMPLATE_OWNER_ID` (shared template user UUID).
2. **Template owner (global + private templates):** After that user exists in `public.profiles`, replace `public.template_owner_id()` — either paste their UUID in `03_rls_functions.sql` and re-run only that function block, or run:

```sql
create or replace function public.template_owner_id()
returns uuid
language sql
stable
as $$
  select id from public.profiles where email = 'your-template-owner@email.com' limit 1;
$$;
```

3. `NEXT_PUBLIC_TEMPLATE_OWNER_ID` must match the same UUID as `template_owner_id()`.

## Optional: existing users without profiles

If `auth.users` had rows before `02_auth_trigger.sql` existed, run `backfill_profiles_from_auth.sql` once.

## If organisation create fails (or success toast but no org)

Run `fix_org_select_policy.sql` once (updates SELECT so owners always see their org row; needed for `insert().select()` after create).

## Folder contents

- `01_schema.sql` … `05_storage.sql` — required rebuild.
- `backfill_profiles_from_auth.sql` — optional backfill only.
- `REBUILD_STEPS.md` — this file.
