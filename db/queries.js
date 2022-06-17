/* eslint-disable no-undef */
const getQuestions = require('./getQuestions');
const getOneQuestion = require('./getOneQuestion');
const getAnswers = require('./getAnswers');
const addQuestion = require('./addQuestion');
const addAnswer = require('./addAnswer');
const markQuestionHelpful = require('./markQuestionHelpful');
const reportQuestion = require('./reportQuestion');
const markAnswerHelpful = require('./markAnswerHelpful');
const reportAnswer = require('./reportAnswer');

module.exports = {
  getQuestions, getOneQuestion, getAnswers, addQuestion, addAnswer, markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer
}