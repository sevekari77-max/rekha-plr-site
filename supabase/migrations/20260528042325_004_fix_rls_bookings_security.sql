/*
  # Fix RLS Policies for Bookings Table

  Changes:
    - Drop the overly permissive INSERT policy
    - Add validated INSERT policy with proper constraints
    - Add rate limiting checks

  Security Improvements:
    - INSERT policy validates required fields exist
    - Rate limiting: one pending booking per email
    - Data integrity constraints at database level
*/

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

-- Create a more restrictive INSERT policy
CREATE POLICY "Public can submit valid booking requests"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (
    full_name IS NOT NULL 
    AND length(trim(full_name)) >= 2
    AND email IS NOT NULL 
    AND phone IS NOT NULL 
    AND length(trim(phone)) >= 10
    AND session_type_id IS NOT NULL
    AND country IS NOT NULL
    AND length(trim(country)) >= 2
    -- Rate limit: prevent if email already has a pending booking
    AND NOT EXISTS (
      SELECT 1 FROM bookings b
      WHERE lower(b.email) = lower(bookings.email)
      AND b.status = 'pending'
    )
  );

-- Add constraints for data validation
DO $$
BEGIN
  -- Add email format constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_email_format'
  ) THEN
    ALTER TABLE bookings 
      ADD CONSTRAINT check_email_format 
      CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;

  -- Add phone format constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_phone_length'
  ) THEN
    ALTER TABLE bookings 
      ADD CONSTRAINT check_phone_length 
      CHECK (length(trim(phone)) >= 10);
  END IF;

  -- Add name length constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_name_length'
  ) THEN
    ALTER TABLE bookings 
      ADD CONSTRAINT check_name_length 
      CHECK (length(trim(full_name)) >= 2);
  END IF;

  -- Add country length constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_country_length'
  ) THEN
    ALTER TABLE bookings 
      ADD CONSTRAINT check_country_length 
      CHECK (length(trim(country)) >= 2);
  END IF;
END $$;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email_status 
  ON bookings(email, status);

-- Create index for created_at lookups
CREATE INDEX IF NOT EXISTS idx_bookings_created_at 
  ON bookings(created_at DESC);
