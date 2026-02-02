-- Fix for SEC-04: Unrestricted File Uploads
-- This script updates the storage configuration for 'avatars' and 'images' buckets.
-- It enforces a 5MB size limit and restricts uploads to common image formats.

-- Update avatars bucket
UPDATE storage.buckets
SET 
  file_size_limit = 5242880, -- 5MB in bytes
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp']
WHERE id = 'avatars';

-- Update images bucket
UPDATE storage.buckets
SET 
  file_size_limit = 5242880, -- 5MB in bytes
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp']
WHERE id = 'images';
