-- Initial database schema for Astute MMP
-- Run this in the Supabase SQL Editor to create all tables

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company_tag TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  has_written_testimonial BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Video Testimonials table
CREATE TABLE IF NOT EXISTS video_testimonials (
  id SERIAL PRIMARY KEY,
  company_tag TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Written Testimonials table
CREATE TABLE IF NOT EXISTS written_testimonials (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_tag TEXT NOT NULL,
  testimonial_date TEXT,
  testimonial_image_url TEXT,
  testimonial_text TEXT,
  author_name TEXT,
  author_position TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  company_name TEXT,
  table_rows JSONB,
  total_campaign_cost TEXT,
  lead_benchmark TEXT,
  primary_objective TEXT,
  secondary_objective TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE written_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since auth is disabled for now)
-- Use DROP POLICY IF EXISTS to avoid errors on re-run
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow all operations on companies" ON companies;
  DROP POLICY IF EXISTS "Allow all operations on video_testimonials" ON video_testimonials;
  DROP POLICY IF EXISTS "Allow all operations on written_testimonials" ON written_testimonials;
  DROP POLICY IF EXISTS "Allow all operations on proposals" ON proposals;
  DROP POLICY IF EXISTS "Allow all operations on users" ON users;
END $$;

CREATE POLICY "Allow all operations on companies" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on video_testimonials" ON video_testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on written_testimonials" ON written_testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on proposals" ON proposals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
