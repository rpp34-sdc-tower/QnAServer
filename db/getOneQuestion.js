/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');
const getOneQuestion = (data, cb) => {
  let allDataResult = [];
  data.results.forEach(result => {
    let id = result.question_id;
    let queryString = `SELECT answers.id, answers.body, answers.date_written as date,
    answers.answerer_name, answers.helpful as helpfulness, json_agg(answer_photos.url) AS photos
    FROM answers 
    LEFT JOIN answer_photos 
    ON answer_photos.answer_id = answers.id
    WHERE question_id = ${id} AND reported = 0 GROUP BY answers.id`;

    return pool
      .query(queryString)
      .then(data => {
        result.answers = {};
        data.rows.forEach(row => {
          if (!row.photos[0]) {
            row.photos = [];
          }
          let answerId = row.id;
          if (result.answers[answerId] === undefined) {
            result.answers[answerId] = row;
          }
          if (!allDataResult.includes(result)) {
            allDataResult.push(result);
          }
        })
        //console.log('allD--', allDataResult);
        cb(null, allDataResult);
      })
      .catch(err => console.log('Error executing getQuestions query', err))
  })
  //console.log('allDataResult: ', allDataResult);
  //cb(result);
}

module.exports = getOneQuestion;

// const eachQuestion = async (qs) => {
//   for (let q of qs.results) {
//     q.answers = {};
//     let answers = await pool.query(`SELECT answers.id, answers.body, to_timestamp(answers.date_written/1000) as date,
//     answers.answerer_name, answers.helpful as helpfulness, json_agg(photos.url) AS photos
//     FROM answers LEFT JOIN photos ON photos.answer_id = answers.id
//     WHERE question_id = ${q.question_id} AND reported = 'false' GROUP BY answers.id`);
//     for (let answer of answers.rows) {
//       q.answers[JSON.stringify(answer.id)] = answer
//     }
//   }
//   res.send(qs);
//   // res.sendStatus(200);
// };

