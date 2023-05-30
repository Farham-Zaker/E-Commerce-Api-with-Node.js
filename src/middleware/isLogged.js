const jwt = require("jsonwebtoken");
const User = require("src/model/user.js");

module.exports = async (req, res, next) => {
  const token = req.params.token;
  const secret_key = process.env.JWT_SECRET_KEY;
  const decoded = await jwt.verify(token, secret_key);
  if (!decoded) {
    res
      .status(401)
      .json({ status: "bad", message: "You have not login, first login." });
  }
  next();
};
