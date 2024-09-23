'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CV.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  CV.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      skills: DataTypes.TEXT,
      education: DataTypes.TEXT,
      experience: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'CV',
    },
  );
  return CV;
};
