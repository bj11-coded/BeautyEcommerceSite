'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Models) {
    }
  }
  Product.init({
     
    name: DataTypes.STRING,
    cat_name: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  // Product.associate = function(models){
  //   Product.belongsTo(models.Category,{ as:"category",foreignKey:"categoryId"});
  // }
  return Product;
};