CREATE TABLE IF NOT EXISTS climate_analysis_history (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  overall_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
