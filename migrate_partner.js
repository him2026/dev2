const { Client } = require('pg');

const DATABASE_URL = "postgresql://postgres:Himdev%402026@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const sql = `
-- PARTNER LINKS TABLE (pairing between user and partner)
CREATE TABLE IF NOT EXISTS partner_links (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  partner_name VARCHAR(255),
  partner_email VARCHAR(255),
  pairing_code VARCHAR(16) UNIQUE NOT NULL,   -- e.g. "HIM-7X9K-4M2P"
  is_active BOOLEAN DEFAULT FALSE,            -- becomes true once partner connects
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  connected_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE         -- code expires after 24h
);

-- PARTNER SESSIONS TABLE (partner login sessions)
CREATE TABLE IF NOT EXISTS partner_sessions (
  id SERIAL PRIMARY KEY,
  partner_link_id INT NOT NULL REFERENCES partner_links(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);
`;

async function main() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Supabase.");
    await client.query(sql);
    console.log("Partner tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    await client.end();
  }
}

main();
