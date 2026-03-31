const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/database");
const User = sequelize.define('UserTable',
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "client"
        }
    },
    {
        tableName: "EmployeeList",
        timestamps: true,
    }
);
module.exports = User;