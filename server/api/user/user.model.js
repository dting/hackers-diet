module.exports = function userModel(sequelize, DataTypes) {
  return sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.',
      },
      validate: {
        isEmail: true,
      },
    },
    google: DataTypes.JSONB,
  });
};
