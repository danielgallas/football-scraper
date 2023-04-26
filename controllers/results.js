const Results = require("../models/Results");
const getScores = require("../scraper/scraper");

const getResults = async (req, res) => {
  try {
    const results = await getScores();
    res.status(201).send(results);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateResults = () => {};

module.exports = { getResults, updateResults };
