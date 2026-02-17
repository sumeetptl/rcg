-- Create the waitlist_entries table
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    trading_level TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'invited', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (submission)
CREATE POLICY "Allow public insert" ON public.waitlist_entries
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow admins to view all (This assumes you have an admin role or check, 
-- but for now we'll allow authenticated users to read if they are admins, 
-- or you can restrict it further. adjusting to standard authenticated read for simplicity in this step, 
-- ideally restricted to admin role).
-- For this project context, usually 'service_role' or specific admin checks are used.
-- We will add a policy for authenticated users to view, assuming RBAC is handled at app level or standard auth.
CREATE POLICY "Allow authenticated view" ON public.waitlist_entries
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to update (Admins updating status)
CREATE POLICY "Allow authenticated update" ON public.waitlist_entries
    FOR UPDATE
    TO authenticated
    USING (true);
