const express = require("express");
const cors = require("cors");
const { calculateTotalScore } = require('./BowlingGameCalculator');
const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));


app.post("/calculate-total-score", (req, res) => {
  const turns = req.body.turns;
  console.log(turns);

  const totalScore = calculateTotalScore(turns);

  res.json({ score: totalScore });
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
