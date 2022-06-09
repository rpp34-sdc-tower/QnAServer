//script to use on postgres from terminal

//creating tables
CREATE TABLE questions (
    id integer PRIMARY KEY,
    product_id integer NOT NULL,
    body VARCHAR(255),
    date_written NUMERIC NOT NULL,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported INT NOT NULL,
    helpful INT NOT NULL
    );

CREATE TABLE answers (
    id integer PRIMARY KEY,
    question_id integer REFERENCES questions (id),
    body VARCHAR(255),
    date_written NUMERIC NOT NULL,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    reported INT NOT NULL,
    helpful INT NOT NULL
    );

CREATE TABLE answer_photos (
    id integer PRIMARY KEY,
    answer_id integer REFERENCES answers (id),
    url VARCHAR(255)
    );
//drop table
DROP TABLE;

//this is to load the data
COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/king-manchow/Documents/HackReactor/SDC/QnAServer/db/raw_csv_data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/king-manchow/Documents/HackReactor/SDC/QnAServer/db/raw_csv_data/answers.csv'
DELIMITER ','
CSV HEADER;

COPY answer_photos(id, answer_id, url)
FROM '/Users/king-manchow/Documents/HackReactor/SDC/QnAServer/db/raw_csv_data/answers_photos.csv'
DELIMITER ','
CSV HEADER;