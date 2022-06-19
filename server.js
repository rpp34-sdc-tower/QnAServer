/* eslint-disable no-undef */
const app = require("./app");
const port = 3006;

app.listen(port, () => {
  console.log(`QnA Server listening on port ${port}!`);
});