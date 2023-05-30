const sequelize = require("./../../startup/database");
const { DataTypes, Sequelize, Model } = require("sequelize");
const { hash } = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("email", value);

        let adminEmails = process.env.ADMIN_EMAILS;
        adminEmails = adminEmails.split(",");
        adminEmails.map((email) => {
          if (value === email) {
            this.setDataValue("isAdmin", true);
          }
        });
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    likes: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
    favorites: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
    shoppingCards: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
  },
  {
    sequelize,
    modelName: "users",
  }
);

User.sync();

module.exports = User;
