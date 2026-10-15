-- Migration: Add hit_targets column to signals table
-- Description: Stores which take-profit targets were achieved (e.g. [1, 2] means TP1 and TP2 hit).
-- Also adds an achieved_roi column (numeric) to store the final realised ROI percentage.

ALTER TABLE public.signals
  ADD COLUMN IF NOT EXISTS hit_targets INTEGER[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS achieved_roi NUMERIC;
