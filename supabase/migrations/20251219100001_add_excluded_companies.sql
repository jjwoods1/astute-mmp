-- Add excluded_companies table for dashboard functionality

CREATE TABLE IF NOT EXISTS excluded_companies (
  id SERIAL PRIMARY KEY,
  company TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and allow all operations (no auth for now)
ALTER TABLE excluded_companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on excluded_companies" ON excluded_companies FOR ALL USING (true) WITH CHECK (true);
