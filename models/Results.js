const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  _id: { type: Number },
  round: { type: Number },
  team1: { type: String },
  team2: { type: String },
  finalScore1: { type: Number },
  finalScore2: { type: Number },
});

module.exports = mongoose.model("Results", resultsSchema);
