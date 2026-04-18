-- 5/5 — Storage bucket + policies for request photos

insert into storage.buckets (id, name, public)
values ('request-photos', 'request-photos', false)
on conflict (id) do nothing;

drop policy if exists "request-photos read auth" on storage.objects;
create policy "request-photos read auth"
on storage.objects for select
to authenticated
using (bucket_id = 'request-photos');

drop policy if exists "request-photos insert auth" on storage.objects;
create policy "request-photos insert auth"
on storage.objects for insert
to authenticated
with check (bucket_id = 'request-photos');

drop policy if exists "request-photos update auth" on storage.objects;
create policy "request-photos update auth"
on storage.objects for update
to authenticated
using (bucket_id = 'request-photos')
with check (bucket_id = 'request-photos');

drop policy if exists "request-photos delete auth" on storage.objects;
create policy "request-photos delete auth"
on storage.objects for delete
to authenticated
using (bucket_id = 'request-photos');
