/*
  # Update Bookings Table for Simplified Schema

  Changes:
    - Add message column (for additional information)
    - Add status column (pending, confirmed, completed)
    - Remove payment-related columns
    - Make session_date and session_time nullable (for flexible scheduling)

  1. Modified Columns
    - session_date: Now nullable
    - session_time: Now nullable
    - Add message column
    - Add status column

  2. Removed Columns
    - intention_text
    - payment_status
    - payment_method
    - payment_id
    - amount
    - currency
    - confirmation_sent
*/

-- Add new columns
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed'));

-- Remove old columns
ALTER TABLE bookings DROP COLUMN IF EXISTS intention_text;
ALTER TABLE bookings DROP COLUMN IF EXISTS payment_status;
ALTER TABLE bookings DROP COLUMN IF EXISTS payment_method;
ALTER TABLE bookings DROP COLUMN IF EXISTS payment_id;
ALTER TABLE bookings DROP COLUMN IF EXISTS amount;
ALTER TABLE bookings DROP COLUMN IF EXISTS currency;
ALTER TABLE bookings DROP COLUMN IF EXISTS confirmation_sent;

-- Make session_date and session_time nullable
ALTER TABLE bookings ALTER COLUMN session_date DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN session_time DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN timezone DROP NOT NULL;
