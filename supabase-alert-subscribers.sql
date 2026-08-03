-- Email alerts for NOVA drop — run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/hgeddhazzxrnheogeqpq/sql

CREATE TABLE IF NOT EXISTS alert_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'nova',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS alert_subscribers_email_idx ON alert_subscribers(email);

ALTER TABLE alert_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "alert_subscribers_insert" ON alert_subscribers;
CREATE POLICY "alert_subscribers_insert" ON alert_subscribers FOR INSERT WITH CHECK (true);
