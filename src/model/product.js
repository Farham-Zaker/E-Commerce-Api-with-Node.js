const sequelize = require("./../../startup/database");
const { Sequelize, DataTypes, Model } = require("sequelize");

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    imageDestination: DataTypes.STRING,
    category: DataTypes.STRING,
    quantities: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    details: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "products",
  }
);

Product.sync();

module.exports = Product;
