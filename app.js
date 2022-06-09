/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db/queries');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World! Welcome to the Jurassic Park -background music-");
});

//an example to get data from db
app.get('/users', db.getUsers);

// -------- ALL GET request below --------
// get a list of questions for a particular product
app.get('/qa/questions', (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'relevant';
  let id = req.query.product_id;

  getReviews(id, sort, count, page)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send('server get reviews error');
    })
});

// Returns answers for a given question.
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let id = req.query.product_id;
  getReviewsMetadata(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send('server get reviews metadata error');
    })
});


// -------- ALL POST request below --------
// post an question
app.post('/qa/questions', (req, res) => {
  var newQuestions = req.body;
  addReview(newQuestions.product_id, newQuestions.rating, newQuestions.summary, newQuestions.body, newQuestions.recommend, newQuestions.name, newQuestions.email)
    .then (id => {
      addPhotos(id, newQuestions.photos);
      addCharacteristicsReviews(id, newQuestions.characteristics);
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(500).send('server post question error');
    })
})

// post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let id = req.params.question_id;
  var newQuestions = req.body;
  addReview(newQuestions.product_id, newQuestions.rating, newQuestions.summary, newQuestions.body, newQuestions.recommend, newQuestions.name, newQuestions.email)
    .then (id => {
      addPhotos(id, newQuestions.photos);
      addCharacteristicsReviews(id, newQuestions.characteristics);
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(500).send('server post answer error');
    })
})

// -------- ALL put requests below --------
// report a questions as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let id = req.params.question_id;
  markReviewHelpful(id)
    .then(() => {
      res.sendStatus(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a questions helpful error');
    })
});

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  let id = req.params.question_id;
  markReviewReported(id)
    .then(() => {
      res.sendStatus(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a questions report error');
    })
});


// report a answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let id = req.params.answer_id;
  markReviewHelpful(id)
    .then(() => {
      res.sendStatus(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a answers helpful error');
    })
});

// report a answers
app.put('/qa/answers/:answer_id/report', (req, res) => {
  let id = req.params.answer_id;
  markReviewReported(id)
    .then(() => {
      res.sendStatus(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a answers report error');
    })
});


module.exports = app;