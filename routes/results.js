const express = require("express");
const router = express.Router();
const { getResults, updateResults } = require("../controllers/results");

router.route("/").get(getResults).put(updateResults);

module.exports = router;
