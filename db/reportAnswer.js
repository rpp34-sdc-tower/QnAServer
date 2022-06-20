/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const reportAnswer = (answerId) => {

  let queryString = `UPDATE answers
  SET reported = reported + 1
  WHERE id = ${answerId};`;

  return pool
    .query(queryString)
    .then(() => {
        return;
    })
    .catch(err => console.log('Error report Answer query', err))
}

module.exports = reportAnswer;