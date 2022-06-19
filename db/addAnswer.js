/* eslint-disable no-undef */
require("util").inspect.defaultOptions.depth = null;
const pool = require('./pool');

const addAnswer = (questionId, body, answerer_name, answerer_email) => {

    let queryString = `INSERT INTO answers (question_id, body, answerer_name, answerer_email, id)
    VALUES (${questionId}, ${body}, ${answerer_name}, ${answerer_email}, ((SELECT MAX(id) FROM answers)+1))
    RETURNING id;`;

    return pool
        .query(queryString)
        .then(data => {
            let id = data.rows[0].id;
            console.log('answer id: ', id)
            return id;
        })
        .catch(err => console.log('Error executing addAnswer query', err))
}

module.exports = addAnswer;