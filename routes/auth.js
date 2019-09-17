const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route   GET auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @route   GET auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
