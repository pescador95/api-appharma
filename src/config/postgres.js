import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
})

export default  {
  query: (text, params) => pool.query(text, params),
}