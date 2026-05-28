/*
  # Update PLR Website Schema - Simplified Version

  Changes:
    - Remove testimonials table (not needed)
    - Remove price fields from session_types
    - Simplify bookings to focus on inquiry/information
    - Update FAQs to match new requirements

  1. Modified Tables
    - session_types: Remove price-related fields
    - bookings: Simplified for contact/inquiry
    - faqs: Updated questions

  2. Removed Tables
    - testimonials (not needed for this version)
*/

-- Drop testimonials table if exists
DROP TABLE IF EXISTS testimonials CASCADE;

-- Update session_types to remove pricing
ALTER TABLE session_types DROP COLUMN IF EXISTS price;
ALTER TABLE session_types DROP COLUMN IF EXISTS currency;

-- Clear and re-insert session types
DELETE FROM session_types;

INSERT INTO session_types (id, name, description, duration_minutes, features, is_online, is_in_person, display_order) VALUES
(
  gen_random_uuid(),
  'Introductory Session',
  'A gentle introduction to Past Life Regression for those new to this practice. Experience your first guided journey in a safe, supportive environment.',
  60,
  '["Guided relaxation", "First past life exploration", "Supportive environment", "Post-session discussion"]'::jsonb,
  true,
  true,
  1
),
(
  gen_random_uuid(),
  'Deep PLR Session',
  'An extended session for deeper exploration. Ideal for addressing specific patterns, recurring themes, or seeking greater understanding.',
  90,
  '["Extended exploration time", "Pattern recognition", "Deeper relaxation", "Comprehensive session", "Integration support"]'::jsonb,
  true,
  true,
  2
),
(
  gen_random_uuid(),
  'PLR + Guidance Session',
  'A comprehensive session combining Past Life Regression with personal guidance. Perfect for those seeking clarity on life direction.',
  120,
  '["Complete PLR session", "Personal guidance", "Clarity exploration", "Life direction insights", "Extended support"]'::jsonb,
  true,
  true,
  3
);

-- Clear and re-insert FAQs
DELETE FROM faqs;

INSERT INTO faqs (question, answer, category, display_order) VALUES
(
  'What is Past Life Regression?',
  'Past Life Regression is a guided relaxation technique that helps you access memories and experiences from previous lifetimes. It uses gentle, safe methods to help you explore and understand patterns in your current life.',
  'general',
  1
),
(
  'Is Past Life Regression safe?',
  'Yes, when conducted by a trained professional, PLR is completely safe. You remain aware and in control throughout the session. It is a gentle, relaxing experience that many find deeply peaceful and insightful.',
  'safety',
  2
),
(
  'Are online sessions effective?',
  'Absolutely. Online sessions are just as effective as in-person sessions. Many clients find they can relax more deeply in their own familiar environment. All you need is a quiet space and a stable internet connection.',
  'online',
  3
),
(
  'How should I prepare for my session?',
  'Choose a quiet, comfortable space where you wont be disturbed. Avoid caffeine for a few hours before the session. Wear comfortable clothing. Most importantly, come with an open mind and a willingness to explore.',
  'preparation',
  4
),
(
  'What happens during a session?',
  'The session begins with a conversation about your intentions. You will then be gently guided into a relaxed state. During this state, you may experience memories or insights. Afterward, there is time to discuss and integrate your experience.',
  'session',
  5
);

-- Clear and re-insert availability
DELETE FROM availability;

INSERT INTO availability (day_of_week, start_time, end_time, is_available) VALUES
(1, '10:00', '18:00', true),
(2, '10:00', '18:00', true),
(3, '10:00', '18:00', true),
(4, '10:00', '18:00', true),
(5, '10:00', '18:00', true),
(6, '10:00', '15:00', true);
