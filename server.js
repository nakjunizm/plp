const express = require("express");
const connectDB = require("./config/db");
const router = express.Router();
//const path = require('path');

const app = express();

connectDB();

router.get("/", async (req, res) => {
  res.status(200).send(`It's up and running!`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});