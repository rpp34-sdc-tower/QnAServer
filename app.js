/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db/queries');
const pool = require('./db/pool');
const path = require('path');


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World! Welcome to the Jurassic Park");
});

/*--- ALL GET reques ---*/
// get a list of questions for a particular product
// app.get('/qa/questions', (req, res) => {
//   let page = req.query.page || 1;
//   let count = req.query.count || 5;
//   let id = req.query.product_id;

//   db.getQuestions(id, page, count, (err, data) => {
//     if (err) {
//       res.status(500).send('server get Questions error!');
//     }
//     console.log('---',data.rows);
//     return data.rows;
//   })
//     .then((data) => {
//       res.status(200).send(data);
//     })
// });

app.get(`/qa/questions`, async (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let id = req.query.product_id;
  let ret = { product_id: id }
  const eachQuestion = async (qs) => {
    for (let q of qs.results) {
      q.answers = {};
      let answers = await pool.query(`SELECT 
      answers.id, 
      answers.body, 
      to_timestamp(answers.date_written/1000) as date,
      answers.answerer_name,
      answers.helpful as helpfulness, 
      json_agg(answer_photos.url) AS photos
      FROM answers 
      LEFT JOIN answer_photos 
      ON answer_photos.answer_id = answers.id
      WHERE question_id = ${q.question_id} 
      AND reported = 0 GROUP BY answers.id`);
      for (let answer of answers.rows) {
        q.answers[JSON.stringify(answer.id)] = answer
      }
    }
    res.send(qs);
  };
  pool.query(`SELECT 
  question_id, 
  question_body,
  to_timestamp(question_date/1000) as question_date, 
  asker_name,
   question_helpfulness,
   reported 
   FROM questions WHERE product_id = ${id} 
   AND reported = 0 
   LIMIT ${count}`)
    .then(output => {
      ret.results = output.rows;
      return ret
    })
    .then(() => {
      eachQuestion(ret)
    })

})

// Returns answers for a given question.
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let id = req.params.question_id;
  db.getAnswers(id)
    .then(data => {
      console.log('Getting answers in server now...', data)
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send('server get Answers error');
    })
});
/*--- END ALL GET REQUESTS ---*/

/*--- ALL POST request below ---*/
// post an question
app.post('/qa/questions', (req, res) => {
  var newQuestion = req.query;
  db.addQuestion(newQuestion.product_id, newQuestion.body, newQuestion.name, newQuestion.email)
    .then(() => {
      res.status(201).send('CREATED new question');
    })
    .catch(err => {
      res.status(500).send('server post question error');
    })
});

// post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let questionId = req.params.question_id;
  var newAnswer = req.query;
  db.addAnswer(questionId, newAnswer.body, newAnswer.name, newAnswer.email)
    .then(id => {
      //console.log(JSON.stringify(newAnswer.photos));
      db.addAnswerPhotos(id, newAnswer.photos)
      return;
    })
    .then(() => {
      res.status(201).send('CREATED new answer & answer\'s photos');
    })
    .catch(err => {
      res.status(500).send('server post question error');
    })
});
/*--- ALL POST request END ---*/

// -------- ALL put requests below --------
// report a questions as helpful

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let id = req.params.question_id;
  db.markQuestionHelpful(id)
    .then(() => {
      res.status(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a questions helpful error');
    })
});

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  let id = req.params.question_id;
  db.reportQuestion(id)
    .then(() => {
      res.status(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a questions report error');
    })
});


// report a answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let id = req.params.answer_id;
  db.markAnswerHelpful(id)
    .then(() => {
      res.status(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a answers helpful error');
    })
});

// report a answers
app.put('/qa/answers/:answer_id/report', (req, res) => {
  let id = req.params.answer_id;
  db.reportAnswer(id)
    .then(() => {
      res.status(204).send('NO CONTENT');
    })
    .catch(err => {
      res.status(500).send('server put a answers report error');
    })
});

//below is loader.io site ownership verification
//http://18.207.212.159/loaderio-b303ab9663f8fe00b42f0b1af214a971.txt
app.get('/loaderio-b303ab9663f8fe00b42f0b1af214a971', async (req, res) => {
  var options = {
    root: path.join(__dirname)
  };

  var fileName = 'loaderio-b303ab9663f8fe00b42f0b1af214a971.txt';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

module.exports = app;