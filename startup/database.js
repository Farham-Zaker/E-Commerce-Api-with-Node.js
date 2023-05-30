const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(() => {
    console.error("Unable to connect to the database.");
  });

module.exports = sequelize;
