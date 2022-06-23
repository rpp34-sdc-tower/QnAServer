/* eslint-disable no-undef */
const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test GET /qa/questions", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/qa/questions")
      .query({
        page: 1,
        count: 10,
        product_id: 900010
      })
      .expect(200);
  });
});

describe("Test GET /qa/questions/:question_id/answers", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/qa/questions/:question_id/answers")
      .query({
        question_id: 6879000
      })
      .expect(200);
  });
});

describe("Test POST /qa/questions", () => {
  test("It should response the POST method", () => {
    return request(app)
      .post("/qa/questions")
      .query({
        product_id: 10010,
        body: "hi",
        name: 'piggy',
        email: "google.com"
      })
      .expect(201);
  });
});

describe("Test POST /qa/questions/:question_id/answers", () => {
  test("It should response the POST method", () => {
    return request(app)
      .post("/qa/questions/:question_id/answers")
      .query({
        question_id: 10010,
        body: "hi",
        name: 'piggy',
        email: "google.com"
      })
      .expect(201);
  });
});

describe("Test PUT /qa/questions/:question_id/helpful", () => {
  test("It should response the PUT method", () => {
    return request(app)
      .put("/qa/questions/:question_id/helpful")
      .query({
        question_id: 10010,
      })
      .expect(204);
  });
});

describe("Test PUT /qa/questions/:question_id/report", () => {
  test("It should response the PUT method", () => {
    return request(app)
      .put("/qa/questions/:question_id/report")
      .query({
        question_id: 10010,
      })
      .expect(204);
  });
});

describe("Test PUT /qa/answers/:answer_id/helpful", () => {
  test("It should response the PUT method", () => {
    return request(app)
      .put("/qa/answers/:answer_id/helpful")
      .query({
        answer_id: 10010,
      })
      .expect(204);
  });
});

describe("Test PUT /qa/answers/:answer_id/report", () => {
  test("It should response the PUT method", () => {
    return request(app)
      .put("/qa/answers/:answer_id/report")
      .query({
        answer_id: 10010,
      })
      .expect(204);
  });
});