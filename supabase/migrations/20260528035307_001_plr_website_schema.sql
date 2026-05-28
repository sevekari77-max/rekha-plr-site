/*
  # Past Life Regression Website Schema

  1. New Tables
    - `bookings`
      - Stores all session bookings with client details and payment status
    - `availability`
      - Admin-configured available time slots for sessions
    - `testimonials`
      - Client testimonials for the website
    - `faqs`
      - Frequently asked questions
    - `session_types`
      - Different session packages offered

  2. Security
    - RLS enabled on all tables
    - Public read access for testimonials, FAQs, session types, and availability
    - Authenticated admin access for managing content
    - Bookings have restricted access (only owner and admin)

  3. Notes
    - All timestamps use timestamptz for timezone safety
    - Phone numbers stored as text for international format support
    - Payment status tracked with enum-like text field
*/

-- Session Types Table
CREATE TABLE IF NOT EXISTS session_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  duration_minutes integer NOT NULL,
  price integer NOT NULL,
  currency text DEFAULT 'INR',
  features jsonb DEFAULT '[]'::jsonb,
  is_online boolean DEFAULT true,
  is_in_person boolean DEFAULT true,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Availability Slots Table
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time text NOT NULL,
  end_time text NOT NULL,
  is_available boolean DEFAULT true,
  session_type_id uuid REFERENCES session_types(id),
  created_at timestamptz DEFAULT now()
);

-- Specific date availability (to override or add specific dates)
CREATE TABLE IF NOT EXISTS specific_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  available_date date NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  is_available boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  country text,
  preferred_contact text DEFAULT 'email',
  session_type_id uuid REFERENCES session_types(id) NOT NULL,
  session_date date NOT NULL,
  session_time text NOT NULL,
  timezone text NOT NULL,
  session_mode text DEFAULT 'online' CHECK (session_mode IN ('online', 'in-person')),
  intention_text text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  payment_id text,
  amount integer,
  currency text DEFAULT 'INR',
  confirmation_sent boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for quick booking lookups
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(session_date, session_time);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  location text,
  testimonial_text text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  session_type text,
  is_approved boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE session_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE specific_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Policies for session_types (public read, admin write)
CREATE POLICY "Public can view active session types"
  ON session_types FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage session types"
  ON session_types FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for availability (public read, admin write)
CREATE POLICY "Public can view availability"
  ON availability FOR SELECT
  TO public
  USING (is_available = true);

CREATE POLICY "Admins can manage availability"
  ON availability FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for specific_availability (public read, admin write)
CREATE POLICY "Public can view specific availability"
  ON specific_availability FOR SELECT
  TO public
  USING (is_available = true);

CREATE POLICY "Admins can manage specific availability"
  ON specific_availability FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for bookings (private by default)
CREATE POLICY "Admins can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies for testimonials (approved public read, admin write)
CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for FAQs (public read, admin write)
CREATE POLICY "Public can view active FAQs"
  ON faqs FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage FAQs"
  ON faqs FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Insert default session types
INSERT INTO session_types (name, description, duration_minutes, price, currency, features, is_online, is_in_person, display_order) VALUES
(
  'Introductory PLR Session',
  'A gentle introduction to Past Life Regression for first-time clients. Explore one past life memory in a safe, supportive environment.',
  60,
  3500,
  'INR',
  '["One past life exploration", "Pre-session consultation", "Safe guided journey", "Post-session integration", "Recording of session"]'::jsonb,
  true,
  true,
  1
),
(
  'Deep Healing PLR Session',
  'An extended session for deeper emotional healing. Address specific patterns, fears, or relationship issues through multiple past life explorations.',
  90,
  5500,
  'INR',
  '["Multiple past life explorations", "Deep emotional healing", "Pattern identification", "Energy clearing techniques", "Post-session integration", "Session recording", "Follow-up support"]'::jsonb,
  true,
  true,
  2
),
(
  'PLR + Coaching Session',
  'Comprehensive session combining Past Life Regression with life coaching. Perfect for those seeking clarity on life purpose and direction.',
  120,
  7500,
  'INR',
  '["Complete PLR session", "Life coaching integration", "Action plan creation", "Spiritual guidance", "Life purpose exploration", "Multiple past life glimpses", "Session recording", "2 weeks follow-up support"]'::jsonb,
  true,
  true,
  3
);

-- Insert default availability (Mon-Sat, 10 AM - 6 PM)
INSERT INTO availability (day_of_week, start_time, end_time, is_available) VALUES
(1, '10:00', '18:00', true),
(2, '10:00', '18:00', true),
(3, '10:00', '18:00', true),
(4, '10:00', '18:00', true),
(5, '10:00', '18:00', true),
(6, '10:00', '14:00', true);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, location, testimonial_text, rating, session_type, is_approved, display_order) VALUES
(
  'Meena S.',
  'Mumbai, India',
  'My first PLR session was a transformative experience. I came with anxiety about my relationships, and the session helped me understand patterns I''ve carried for lifetimes. The therapist was incredibly gentle and supportive throughout.',
  5,
  'Deep Healing PLR Session',
  true,
  1
),
(
  'Robert K.',
  'London, UK',
  'I was skeptical at first, but the online session was just as powerful as I imagine an in-person session would be. I gained clarity on fears that I''ve struggled with for years. Highly recommend for anyone seeking emotional healing.',
  5,
  'Introductory PLR Session',
  true,
  2
),
(
  'Priya M.',
  'Bangalore, India',
  'The PLR + Coaching session gave me exactly what I needed - emotional healing and a clear direction forward. Understanding my past life connections helped me make peace with my current life challenges.',
  5,
  'PLR + Coaching Session',
  true,
  3
),
(
  'David L.',
  'Sydney, Australia',
  'As someone dealing with unexplained anxieties, this session was life-changing. The therapist created such a safe space. I finally understand the root of my fears and feel so much lighter.',
  5,
  'Deep Healing PLR Session',
  true,
  4
),
(
  'Anita R.',
  'Delhi, India',
  'I had my session online and was worried it wouldn''t be as effective. But the experience was beautiful and deeply healing. The therapist guided me with such care and patience. Thank you for this healing journey.',
  5,
  'Introductory PLR Session',
  true,
  5
);

-- Insert FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
(
  'Is Past Life Regression safe?',
  'Yes, Past Life Regression is a safe and gentle therapeutic technique when conducted by a trained professional. You remain in control throughout the session and can open your eyes or stop at any time. Many people find it to be a deeply relaxing and healing experience.',
  'safety',
  1
),
(
  'Will I remember what happened during the session?',
  'Yes, you will remember your experience. Unlike-stage hypnotism, therapeutic PLR keeps you fully aware and in control. Many clients find their memories vivid and meaningful, often bringing lasting insights and healing.',
  'session',
  2
),
(
  'How should I prepare for my PLR session?',
  'Come with an open mind and a comfortable, quiet space for online sessions. Avoid caffeine for a few hours before the session. Wear comfortable clothing. Have water nearby. Most importantly, set an intention for what you hope to explore or heal.',
  'preparation',
  3
),
(
  'Are online PLR sessions effective?',
  'Absolutely! Online sessions are just as effective as in-person sessions. Many clients find they can relax even more deeply in their own familiar space. All you need is a stable internet connection, a quiet room, and a comfortable place to lie down or sit.',
  'online',
  4
),
(
  'What if I feel emotional after the session?',
  'It''s normal and healthy to feel emotional after a healing session, as deep healing can bring up emotions. The therapist will guide you through integration and provide support. Many clients report feeling lighter, clearer, and more at peace after processing their emotions.',
  'post-session',
  5
),
(
  'How many sessions do I need?',
  'Some people experience significant shifts in just one session, while others benefit from multiple sessions for deeper healing. Your therapist will discuss what''s best for your specific needs and goals.',
  'general',
  6
),
(
  'Will I actually see past lives?',
  'Everyone experiences PLR differently. Some people see vivid images or scenes, others feel sensations or emotions, and some receive intuitive insights. There''s no wrong way to experience your session. The healing happens regardless of how the information comes through.',
  'session',
  7
),
(
  'Is PLR against any religion?',
  'PLR is a therapeutic technique that can be practiced by people of any faith or no faith. It does not require you to believe in reincarnation. Many people of various religious backgrounds have found healing through PLR, and you can interpret your experience through your own spiritual lens.',
  'general',
  8
);
