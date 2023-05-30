require("dotenv").config();
const controller = require("src/controller.js");
const sequelize = require("./../../../startup/database");
const { hash, genSalt, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = new (class Controller extends controller {
  async singUpRoute(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    let user = await this.User.findOne({ where: { email } });

    if (!user) {
      const { firstName, lastName, email, password } = req.body;
      const salt = process.env.BCRYPT_SALT;
      const hashedPassword = await hash(password, salt);
      const newUser = await this.User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ status: "ok", message: "Account was created" });
    } else {
      res.status(401).json({
        status: "bad",
        message: "There in an account with this Email!",
      });
    }
  }

  async loginRoute(req, res, next) {
    let user = await this.User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res.status(401).json({
        status: "bad",
        response: "There is not any account with this Email!",
      });
    } else {
      const decoded = await compare(req.body.password, user.password);
      if (!decoded) {
        res.status(401).json({
          status: "bad",
          message: "Password is incorrect!",
        });
      } else {
        const jwt_secretKey = process.env.JWT_SECRET_KEY;
        const token = await jwt.sign({ _id: user.id }, jwt_secretKey, {
          expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30 * 6,
        });
        res.status(201).json({ status: "ok", token });
      }
    }
  }
})();
