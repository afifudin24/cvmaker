'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserInfo.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user', // Nama alias
      });
    }
  }
  UserInfo.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Nama tabel user
          key: 'id',
        },
        allowNull: false,
      },
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      bornDate: DataTypes.DATE,
      address: DataTypes.STRING,
      hobby: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserInfo',
    },
  );
  return UserInfo;
};
