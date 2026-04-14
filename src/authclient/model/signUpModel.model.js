const sequelize = require("../../../db/dbconnection");
const { DataTypes } = require("sequelize");
const signUp = sequelize.define(
  "signup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "signUp",
    timestamps: true,
  },
);
module.exports = signUp;
