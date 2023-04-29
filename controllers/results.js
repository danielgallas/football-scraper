const Results = require("../models/Results");
const getScores = require("../scraper/scraper");

const getResults = async (req, res) => {
  try {
    const fetchResults = await getScores();
    return await res.status(201).json({ fetchResults });
  } catch (error) {
    res.status(406).send("This is what you need to figure out");
  }
};

const updateResults = async (req, res) => {
  try {
    const fetchResults = await getScores();
    await Results.deleteMany({});
    await Results.create(fetchResults);
    return res.status(201).send("updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getResults, updateResults };
