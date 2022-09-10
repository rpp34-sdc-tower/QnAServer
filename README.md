Retail Q&A | Back-end services for e-commerce site
Perform ETL (load csv files to db) and initialize db setups

In PostgreSQL, run the following queries files:

psql db_name < file_path

Run schema.sql

Run copyData.sql (if deployed to cloud, run copyData-AWS-EC2.sql instead)

Run setPrimarykeySequence.sql

Run createIndex.sql

After load testing APIs using K6, run deleteK6TestData.sql to delete load test data.

Language: JavaScript | NodeJS | ExpressJS

Style guide: Airbnb JavaScript Style Guide (https://github.com/airbnb/javascript)

Database: Postgres

Test suite: Jest
