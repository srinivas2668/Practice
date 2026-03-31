const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('employeelist', 'root', 'Srinu@123', {
  dialect: 'mysql',
  host: "localhost",
});
module.exports = sequelize;