-- Migration: Create Trades Table (Trading Journal)
-- Description: Adds the trades table to persist user trade journal entries.

-- 1. Create TRADES Table
CREATE TABLE IF NOT EXISTS public.trades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date TIMESTAMPTZ DEFAULT NOW(),
    
    -- Trade Basics
    market TEXT,
    exchange TEXT,
    broker TEXT,
    account TEXT,
    prop_firm TEXT,
    trade_source TEXT,
    
    -- Setup & Execution
    pair TEXT NOT NULL,
    direction public.signal_direction NOT NULL,
    strategy TEXT,
    leverage TEXT,
    
    -- Price Levels
    entry_price NUMERIC,
    exit_price NUMERIC,
    stop_loss NUMERIC,
    take_profit NUMERIC,
    
    -- Risk & Metrics
    position_size NUMERIC,
    risk_percentage NUMERIC,
    fees NUMERIC,
    funding NUMERIC,
    rr NUMERIC,
    pnl NUMERIC,
    
    -- Review & Psychology
    emotion TEXT,
    mistake TEXT,
    notes TEXT,
    screenshot_url TEXT,
    
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'pending')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add Trigger for updated_at
CREATE TRIGGER update_trades_updated_at
    BEFORE UPDATE ON public.trades
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Add Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trades_user_id ON public.trades(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_pair ON public.trades(pair);
CREATE INDEX IF NOT EXISTS idx_trades_status ON public.trades(status);
CREATE INDEX IF NOT EXISTS idx_trades_date ON public.trades(date);

-- 4. Enable Row Level Security
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- 5. Basic RLS Policies
CREATE POLICY "Users can view their own trades" 
    ON public.trades FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trades" 
    ON public.trades FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trades" 
    ON public.trades FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trades" 
    ON public.trades FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);
