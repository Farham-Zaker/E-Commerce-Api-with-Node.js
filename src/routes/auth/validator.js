const { check } = require("express-validator");

module.exports = new (class validator {
  signUpValdator() {
    return [
      check("firstName").notEmpty().withMessage({
        status: "bad",
        message: "Please enter your first name.",
      }),
      check("lastName").notEmpty().withMessage({
        status: "bad",
        message: "Please enter your last name.",
      }),
      check("email").isEmail().withMessage({
        status: "bad",
        message: "Your Email is not correct.",
      }),
      check("email").notEmpty().withMessage({
        status: "bad",
        message: "Email input can not be empty!"
      }),
      check("password").isLength({ min: 8 }).withMessage({
        status: "bad",
        message: "Passwors must be more than 8 character.",
      }),
    ];
  }
  loginValdator() {
    return [
      check("email").isEmail().withMessage({
        status: "bad",
        message: "Your Email is not valid!",
      }),
      check("email").notEmpty().withMessage({
        status: "bad",
        message: "Please enter your email",
      }),
      check("password").isLength({ min: 8 }).withMessage({
        status: "bad",
        message: "Password can not be less than 8 character!",
      }),
      check("password").notEmpty().withMessage({
        status: "bad",
        message: "Password can not be empty!",
      }),
    ];
  }
})();
