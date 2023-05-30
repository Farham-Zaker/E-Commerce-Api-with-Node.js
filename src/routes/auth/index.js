const express = require("express");
const router = express.Router();
const {
  signUpValdator,
  loginValdator,
} = require("src/routes/auth/validator.js");
const {
  singUpRoute,
  loginRoute,
  bodyValdator,
} = require("src/routes/auth/controller.js");

// Sign up
router.post("/signUp", signUpValdator(), bodyValdator, singUpRoute);

// Login
router.post("/login", loginValdator(), bodyValdator, loginRoute);

module.exports = router;
