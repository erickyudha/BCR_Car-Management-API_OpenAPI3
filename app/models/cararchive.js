'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarArchive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarArchive.init({
    old_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    rent_per_day: DataTypes.INTEGER,
    createdBy: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CarArchive',
    timestamps: false,
  });
  return CarArchive;
};