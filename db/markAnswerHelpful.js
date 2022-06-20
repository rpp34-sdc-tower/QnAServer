/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const markAnswerHelpful = (answerId) => {

  let queryString = `UPDATE answers
  SET helpful = helpful + 1
  WHERE id = ${answerId};`;

  return pool
    .query(queryString)
    .then(() => {
        return;
    })
    .catch(err => console.log('Error marking answer helpful query', err))
}

module.exports = markAnswerHelpful;