const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequeize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

(async () => {
  try {
    sequeize.authenticate();
    console.log("authenticaton sucessful")
  } catch (err) {
    console.error(err, "authenticaton unSucessful");
  }
})();

(async () => {
  try {
    sequeize.sync();
    console.log("sync sucessfull")
  } catch (err) {
    console.error(err, "sync unSucessful");
  }
})();

module.exports = sequeize;
