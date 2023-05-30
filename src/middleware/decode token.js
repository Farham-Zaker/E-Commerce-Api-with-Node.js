const jwt = require("jsonwebtoken");
const User = require("src/model/user");
module.exports = (token) => {
  const secret_key = process.env.JWT_SECRET_KEY;
  const decodedToken = jwt.verify(token, secret_key);
  return {
    getUser: async () => {
      const user = await User.findOne({ where: { id: decodedToken._id } });
      return user;
    },
    getUserId: async () => {
      return decodedToken._id;
    },
  };
};