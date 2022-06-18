/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const addQuestion = (productId, body, asker_name, asker_email) => {

  let queryString = `INSERT INTO questions 
  (product_id, question_body, asker_name, asker_email, question_id)
  VALUES (${productId}, ${body}, ${asker_name}, ${asker_email}, 
          ((SELECT MAX(question_id) FROM questions)+1)
        );`;

  return pool
    .query(queryString)
    .then(() => {
        return;
    })
    .catch(err => console.log('Error executing getQuestions query', err))
}

module.exports = addQuestion;