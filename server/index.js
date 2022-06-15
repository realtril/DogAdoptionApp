const express = require("express");
const { dogs } = require("./data");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/dogs", async (req, res) => {
  return res.json(dogs);
});

app.listen(4000, () => {
  console.log("listening");
});
