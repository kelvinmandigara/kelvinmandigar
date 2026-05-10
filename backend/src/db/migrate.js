const pool = require('./pool');

const schemaSql = `
CREATE TABLE IF NOT EXISTS citizens (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  id_number VARCHAR(50) UNIQUE NOT NULL,
  photo_base64 TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_applications (
  id SERIAL PRIMARY KEY,
  citizen_id INTEGER NOT NULL REFERENCES citizens(id) ON DELETE CASCADE,
  service_type VARCHAR(60) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'submitted',
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function migrate() {
  await pool.query(schemaSql);
  await pool.end();
  // eslint-disable-next-line no-console
  console.log('Migration completed successfully.');
}

migrate().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Migration failed:', error);
  process.exit(1);
});
