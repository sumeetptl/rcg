-- Fix for SEC-01: Privilege Escalation via Signup Metadata
-- This script updates the handle_new_user function to ignore any role provided in metadata
-- and strictly enforce the default 'user' role for new signups.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, first_name, last_name, avatar_url, role, plan)
  VALUES (
    NEW.id,
    -- Use email as fallback username if metadata is missing
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url',
    -- FIX: Hardcode role to 'user' to prevent privilege escalation via metadata
    'user'::user_role,
    'free'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Fallback for any other errors to ensure user creation succeeds
    INSERT INTO public.profiles (id, first_name, role, plan)
    VALUES (NEW.id, 'User', 'user', 'free');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
