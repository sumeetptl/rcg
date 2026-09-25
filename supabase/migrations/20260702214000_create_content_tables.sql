-- Migration: Create Content Tables (News, Blogs, Signals)
-- Description: Adds tables for news, blogs, and signals as per the approved architecture.

-- 1. Create Custom Enums (if they don't exist)
DO $$ BEGIN
    CREATE TYPE public.content_access_level AS ENUM ('public', 'free', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.signal_direction AS ENUM ('LONG', 'SHORT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create timestamp trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Create NEWS Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    category TEXT,
    source TEXT,
    source_url TEXT,
    thumbnail TEXT,
    is_premium BOOLEAN DEFAULT false,
    access_level public.content_access_level DEFAULT 'public',
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create BLOGS Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    tags TEXT[],
    is_premium BOOLEAN DEFAULT false,
    access_level public.content_access_level DEFAULT 'public',
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create SIGNALS Table
CREATE TABLE IF NOT EXISTS public.signals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    asset TEXT NOT NULL,
    direction public.signal_direction NOT NULL,
    entry_price NUMERIC,
    stop_loss NUMERIC,
    target_1 NUMERIC,
    target_2 NUMERIC,
    target_3 NUMERIC,
    timeframe TEXT,
    confidence TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'closed', 'pending', 'draft', 'cancelled')),
    access_level public.content_access_level DEFAULT 'premium',
    result TEXT CHECK (result IN ('win', 'loss', 'breakeven')),
    result_note TEXT,
    context TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Add Triggers for updated_at
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_signals_updated_at
    BEFORE UPDATE ON public.signals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Add Indexes for performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON public.blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at);

CREATE INDEX IF NOT EXISTS idx_signals_asset ON public.signals(asset);
CREATE INDEX IF NOT EXISTS idx_signals_status ON public.signals(status);
CREATE INDEX IF NOT EXISTS idx_signals_created_by ON public.signals(created_by);

-- 8. Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;

-- 9. Basic RLS Policies (Draft)
CREATE POLICY "Allow public view of public news" ON public.news FOR SELECT USING (access_level = 'public' AND status = 'published');
CREATE POLICY "Allow authenticated view of all news" ON public.news FOR SELECT TO authenticated USING (status = 'published');

CREATE POLICY "Allow public view of public blogs" ON public.blogs FOR SELECT USING (access_level = 'public' AND status = 'published');
CREATE POLICY "Allow authenticated view of all blogs" ON public.blogs FOR SELECT TO authenticated USING (status = 'published');

CREATE POLICY "Allow authenticated view of signals" ON public.signals FOR SELECT TO authenticated USING (status != 'draft');

-- 10. Seed Data
INSERT INTO public.news (title, slug, summary, category, status, published_at)
VALUES 
('Bitcoin breaks key resistance level', 'btc-breaks-resistance', 'Bitcoin surges past 65k on strong institutional demand.', 'Markets', 'published', NOW()),
('Ethereum Layer 2 scaling solutions see record TVL', 'eth-l2-record-tvl', 'Arbitrum and Optimism combined TVL reaches new all time high.', 'Technology', 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blogs (title, slug, excerpt, tags, status, published_at)
VALUES 
('How to manage risk in crypto trading', 'risk-management-crypto', 'A comprehensive guide to position sizing and stop losses.', ARRAY['Education', 'Trading'], 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.signals (title, asset, direction, entry_price, stop_loss, target_1, target_2, timeframe, confidence, status)
VALUES 
('BTC Long Setup', 'BTC/USD', 'LONG', 64500, 62000, 68000, 72000, '4H', 'High', 'active'),
('ETH Short Opportunity', 'ETH/USD', 'SHORT', 3500, 3650, 3200, 3000, '1D', 'Medium', 'active');
