/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const reportQuestion = (questionId) => {

  let queryString = `UPDATE questions
  SET reported = reported + 1
  WHERE question_id = ${questionId};`;

  return pool
    .query(queryString)
    .then(() => {
        return;
    })
    .catch(err => console.log('Error report Question query', err))
}

module.exports = reportQuestion;