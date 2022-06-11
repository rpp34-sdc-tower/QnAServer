/* eslint-disable no-undef */
/* eslint-disable no-console */
const fs = require('fs');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');
// create a ReadStream from csv file using fs.createReadStream() function.
// This ReadStream object will ‘pipe’ a CsvParserStream object generated from
// fast-csv parse() function:
const stream = fs.createReadStream('questions2.csv');
const csvData = [];
const csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    csvData.push(data);
  })
  .on('end', () => {
    // remove the first line: header
    csvData.shift();
    // connect to the PostgreSQL database
    const pool = new Pool({
      host: 'localhost',
      user: 'king-manchow',
      database: 'qnadb',
      password: '',
      port: 5432,
    });
    const query = 'INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4)';
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log(`inserted ${res.rowCount} row:`, row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
  // save csvData
stream.pipe(csvStream);
