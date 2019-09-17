const express = require("express");
const connectDB = require("./config/db");
const router = express.Router();

// passport
const session = require("express-session"); // 세션 설정
const passport = require("passport");
const passportConfig = require("./middleware/passport");

//const path = require('path');

const app = express();

// 세션 활성화
app.use(
  session({ secret: "mysecret", resave: true, saveUninitialized: false })
);
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

connectDB();
passportConfig();

app.get("/", async (req, res) => {
  console.log("hi");
  return res.status(200).send(`It's up and running!`);
});
app.get("/login", async (req, res) => {
  return res.status(200).send(`Login Page!`);
});

app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
