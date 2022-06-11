/* eslint-disable no-undef */
const pool = require('./pool');

const getQuestions = (id, page, count) => {

  // let queryString = `
  // SELECT r.review_id, r.rating, r.summary, r.recommend, r.response, r.body, to_timestamp(r.date/1000) AS date, r.reviewer_name, r.helpfulness,
  // (
  //   SELECT array_to_json(array_agg(photosGroup)) FROM
  //     (
  //        SELECT p.photo_id AS id, p.url
  //        FROM reviews_photos p
  //        inner join reviews
  //        on p.review_id = reviews.review_id
  //        WHERE p.review_id = r.review_id
  //        GROUP BY p.photo_id
  //        ) photosGroup
  //      ) AS photos
  //   FROM reviews r
  //   WHERE r.product_id = ${id} AND r.reported = false
  //   GROUP BY r.review_id
  //   ${sort}
  //   LIMIT ${count};
  //   `;
  let queryString = `select * from questions where product_id = 1;`;


  return pool
    .query(queryString)
    .then(data => {
      for (var i = 0; i < data.rows.length; i++) {
        if (data.rows[i].photos === null) {
          data.rows[i].photos = [];
        }
        if (data.rows[i].response === 'null') {
          data.rows[i].response = null;
        }
      }
      var questions = {
        product: id,
        results: data.rows
      }
      return questions;
    })
    .catch(err => console.log('Error executing getQuestions query', err))
}

module.exports = getQuestions;