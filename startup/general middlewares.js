require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
module.exports = (server, express) => {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());

  server.use(passport.initialize());
};
