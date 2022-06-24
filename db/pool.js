/* eslint-disable no-undef */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  password: 'Fmcc:_9077',
  host: 'ec2-54-91-188-181.compute-1.amazonaws.com',
  port: 5432,
  database: 'qnadb'
});

module.exports = pool;