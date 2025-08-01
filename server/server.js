const express = require("express");
const app = express();

let a = 5;
for (let i = 0; i < a; i++) {
  console.log(i);
}
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
