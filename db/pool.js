/* eslint-disable no-undef */
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'king-manchow',
  password: process.env.PGPASSWORD || '1234',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'qnadb'
});

module.exports = pool;