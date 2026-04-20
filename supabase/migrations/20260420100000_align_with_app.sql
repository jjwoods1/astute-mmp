-- Align the schema with the app's expectations after removing Prisma.
-- Adds missing FK constraints, indexes, bigint widening for file_size,
-- and a default for proposals.user_id (previously supplied by Prisma).

-- Foreign keys: testimonials -> companies(company_tag)
ALTER TABLE written_testimonials
  ADD CONSTRAINT written_testimonials_company_tag_fkey
  FOREIGN KEY (company_tag) REFERENCES companies(company_tag)
  ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE video_testimonials
  ADD CONSTRAINT video_testimonials_company_tag_fkey
  FOREIGN KEY (company_tag) REFERENCES companies(company_tag)
  ON UPDATE CASCADE ON DELETE RESTRICT;

-- Indexes to support FK lookups and company_tag filters
CREATE INDEX IF NOT EXISTS idx_written_testimonials_company_tag
  ON written_testimonials (company_tag);

CREATE INDEX IF NOT EXISTS idx_video_testimonials_company_tag
  ON video_testimonials (company_tag);

-- Widen file_size to BIGINT (video files routinely exceed 2 GB signed-int range)
ALTER TABLE video_testimonials
  ALTER COLUMN file_size TYPE BIGINT;

-- Mirror the Prisma default('default') on proposals.user_id at the DB layer
ALTER TABLE proposals
  ALTER COLUMN user_id SET DEFAULT 'default';
