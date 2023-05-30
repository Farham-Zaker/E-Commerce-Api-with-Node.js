const jwt = require("jsonwebtoken");
const decodeToken = require("src/middleware/decode token")
module.exports = async (req, res, next) => {
  const token = req.params.token;
  const user = await decodeToken(token).getUser()
  console.log(user)
  if (!user.isAdmin) {
    res.status(401).json({
      status: "bad",
      message: "You are not admin.",
    });
  } else {
    next();
  }
};
