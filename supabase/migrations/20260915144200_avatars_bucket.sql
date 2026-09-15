-- Create a new public storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Policy to allow public read access to avatars
create policy "Avatar images are publicly accessible."
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Policy to allow authenticated users to upload their own avatar
create policy "Users can upload their own avatar."
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow authenticated users to update their own avatar
create policy "Users can update their own avatar."
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow authenticated users to delete their own avatar
create policy "Users can delete their own avatar."
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin policies (assuming an admin has the 'admin' role in auth.users or similar, though storage policies use auth.uid())
-- For simplicity based on the plan, if we need admin to manage these, we would need to check public.is_admin()
-- However, storage policies run in the context of the storage schema. We can call public.is_admin().
create policy "Admins can manage all avatars."
on storage.objects for all
to authenticated
using (
  bucket_id = 'avatars' and
  public.is_admin()
);
