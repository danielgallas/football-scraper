const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const results = require("./routes/results");

port = process.env.PORT || 5001;

// middleware
app.use(express.json());
app.use("/api/v1/results", results);

// starting the server and the database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
