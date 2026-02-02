-- Fix for SEC-03: Global Profile Data Leak
-- This script updates the RLS policy for the profiles table.
-- It removes the public view capability and restricts access to:
-- 1. The user who owns the profile
-- 2. Ring administrators

-- Drop existing insecure policy if it exists
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Profiles viewable by self or admin" ON public.profiles;

-- Create new secure policy
CREATE POLICY "Profiles viewable by self or admin" 
ON public.profiles 
FOR SELECT 
USING (
  (auth.uid() = id) OR (public.is_admin())
);
