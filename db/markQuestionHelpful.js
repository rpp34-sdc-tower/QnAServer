/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const markQuestionHelpful = (questionId) => {

  let queryString = `UPDATE questions
  SET question_helpfulness = question_helpfulness + 1
  WHERE question_id = ${questionId};`;

  return pool
    .query(queryString)
    .then(() => {
        return;
    })
    .catch(err => console.log('Error marking question helpful query', err))
}

module.exports = markQuestionHelpful;