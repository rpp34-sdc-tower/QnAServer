/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const getOne = require('./getOneQuestion');
const pool = require('./pool');

const getQuestions = (id, page, count, callback) => {

  let queryString1 = `SELECT question_id, question_body, question_date, 
asker_name, question_helpfulness, reported 
FROM questions WHERE product_id = ${id} 
AND reported = 0
LIMIT ${count}`;

  return pool
    .query(queryString1)
    .then(data => {
      data.rows.forEach(row => {
        var date = new Date(row.question_date / 1000);
        row.question_date = date.toISOString();
        row.reported = false;
      })
      var allQuestions = {
        results: data.rows,
      }
      return allQuestions;
    })
    .then(data => {
      getOne(data, (err, result) => {
        if (err) {
          console.log('getOnequestions\'s error', err);
        }
        //console.log('result...:', result, '---end result');
        callback(null, result);
      })
    })
    // .then(data => {
    //   var allQuestions = { product_id: id };
    //   allQuestions["results"] = data;
    //   console.log('---data:  ..', data, '---end');
    //   //return allQuestions;
    // })
    .catch(err => console.log('Error executing getQuestions query', err))
}

module.exports = getQuestions;