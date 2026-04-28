-- Add INSERT policy for profiles
-- This allows the frontend to upsert the profile during initial setup if the trigger didn't run

create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
