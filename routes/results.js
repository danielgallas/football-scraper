const express = require("express");
const router = express.Router();
const { getResults, updateResults } = require("../controllers/results");

router.route("/").get(getResults).patch(updateResults);

module.exports = router;
