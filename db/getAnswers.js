/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const getAnswers = (id) => {

  let queryString = `
  SELECT 
    answers.id AS answer_id, 
    answers.body, 
    answers.date_written as date,
    answers.answerer_name, 
    answers.helpful as helpfulness, 
    json_agg(answer_photos.url) AS photos
  FROM answers 
  LEFT JOIN answer_photos 
  ON answer_photos.answer_id = answers.id
  WHERE question_id = ${id} 
  AND reported = 0 
  GROUP BY answers.id
  `;

  return pool
    .query(queryString)
    .then(data => {
      //result.answers = {};

      data.rows.forEach(row => {
        var date = new Date(row.date / 1000);
        row.date = date.toISOString();
        if (!row.photos[0]) {
          row.photos = [];
        }
      })
      let fullAnswers = {
        questions: id,
        page: 1,
        count: 5,
        results: data.rows
      }
      return fullAnswers;
    })
    .catch(err => console.log('Error executing getQuestions query', err))
}

module.exports = getAnswers;