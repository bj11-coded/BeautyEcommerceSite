"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart_item.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    }
  }
  Cart_item.init(
    {
      userId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      productPrice: DataTypes.INTEGER,
      productImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart_item",
    }
  );
  return Cart_item;
};
