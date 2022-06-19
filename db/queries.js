/* eslint-disable no-undef */
const getQuestions = require('./getQuestions');
const getOneQuestion = require('./getOneQuestion');
const getAnswers = require('./getAnswers');
const addQuestion = require('./addQuestion');
const addAnswer = require('./addAnswer');
const addAnswerPhotos = require('./addAnswerPhotos')
const markQuestionHelpful = require('./markQuestionHelpful');
const reportQuestion = require('./reportQuestion');
const markAnswerHelpful = require('./markAnswerHelpful');
const reportAnswer = require('./reportAnswer');

module.exports = {
  getQuestions, getOneQuestion, getAnswers, addQuestion, addAnswer, addAnswerPhotos, markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer
}