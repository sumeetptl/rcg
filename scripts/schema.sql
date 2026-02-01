-- COMPLETE SCHEMA v2.0
-- Consolidated script for Crypto Editorial Platform
-- Run this in Supabase SQL Editor to reset/setup the database.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_plan AS ENUM ('free', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_access_level AS ENUM ('public', 'free', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE signal_direction AS ENUM ('LONG', 'SHORT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE signal_status AS ENUM ('active', 'closed', 'pending', 'draft', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. VALIDATE/CREATE TABLES

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    role user_role DEFAULT 'user',
    plan subscription_plan DEFAULT 'free',
    is_admin BOOLEAN DEFAULT FALSE, -- Deprecated in favor of role, but kept for compat
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWS
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT,
    content TEXT,
    category TEXT,
    source TEXT,
    source_url TEXT,
    thumbnail TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    access_level content_access_level DEFAULT 'public',
    status TEXT DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOGS
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    tags TEXT[],
    is_premium BOOLEAN DEFAULT FALSE,
    access_level content_access_level DEFAULT 'public',
    status TEXT DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SIGNALS
CREATE TABLE IF NOT EXISTS public.signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    asset TEXT NOT NULL,
    direction signal_direction NOT NULL,
    entry_price NUMERIC,
    stop_loss NUMERIC,
    target_1 NUMERIC,
    target_2 NUMERIC,
    target_3 NUMERIC,
    timeframe TEXT,
    confidence TEXT,
    status TEXT DEFAULT 'active', -- Consider migrating to signal_status enum usage if desired, but string is flexible
    access_level content_access_level DEFAULT 'free',
    result TEXT,
    result_note TEXT,
    context TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_signals_asset ON public.signals(asset);
CREATE INDEX IF NOT EXISTS idx_signals_created_by ON public.signals(created_by);

-- 5. TRIGGERS (UPDATED_AT)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE TRIGGER update_news_modtime
    BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE TRIGGER update_blogs_modtime
    BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE TRIGGER update_signals_modtime
    BEFORE UPDATE ON public.signals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. USER MANAGEMENT TRIGGER (CRITICAL FOR AUTH)
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
    -- Safely cast role, default to 'user' if missing or invalid
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'user')::user_role,
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

-- Drop trigger if exists to avoid duplication errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 7. RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;

-- Helper to check admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- News
CREATE POLICY "Admins can manage news" ON public.news FOR ALL USING (public.is_admin());
CREATE POLICY "Public news are viewable" ON public.news FOR SELECT USING (access_level = 'public');
CREATE POLICY "Free news viewable by auth users" ON public.news FOR SELECT USING (access_level = 'free' AND auth.role() = 'authenticated');
CREATE POLICY "Premium news viewable by premium users" ON public.news FOR SELECT USING (
    access_level = 'premium' AND (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan = 'premium') OR public.is_admin()
    )
);

-- Blogs
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL USING (public.is_admin());
CREATE POLICY "Public blogs are viewable" ON public.blogs FOR SELECT USING (access_level = 'public');
CREATE POLICY "Free blogs viewable by auth users" ON public.blogs FOR SELECT USING (access_level = 'free' AND auth.role() = 'authenticated');
CREATE POLICY "Premium blogs viewable by premium users" ON public.blogs FOR SELECT USING (
    access_level = 'premium' AND (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan = 'premium') OR public.is_admin()
    )
);

-- Signals
CREATE POLICY "Admins can manage signals" ON public.signals FOR ALL USING (public.is_admin());
CREATE POLICY "Public signals are viewable" ON public.signals FOR SELECT USING (access_level = 'public');
CREATE POLICY "Free signals viewable by auth users" ON public.signals FOR SELECT USING (access_level = 'free' AND auth.role() = 'authenticated');
CREATE POLICY "Premium signals viewable by premium users" ON public.signals FOR SELECT USING (
    access_level = 'premium' AND (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan = 'premium') OR public.is_admin()
    )
);

-- 8. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Object Access" ON storage.objects FOR SELECT USING ( bucket_id IN ('avatars', 'images') );
CREATE POLICY "Auth Uploads" ON storage.objects FOR INSERT WITH CHECK ( auth.role() = 'authenticated' AND bucket_id IN ('avatars', 'images') );
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING ( public.is_admin() AND bucket_id IN ('avatars', 'images') );

