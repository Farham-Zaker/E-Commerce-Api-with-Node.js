const { check } = require("express-validator");

const changeNameValidator = () => {
  return [
    check("firstName").notEmpty().withMessage({
      status: "bad",
      message: "The first name field can not be empty.",
    }),
    check("lastName").notEmpty().withMessage({
      status: "bad",
      message: "The last name field can not be empty.",
    }),
  ];
};

module.exports = changeNameValidator;
