const signUp = require("../model/signUpModel.model");
const sequelize = require("../../../db/dbconnection");
const db = {};
db.sequelize = sequelize;
db.signUp = signUp;
(async () => {
  try {
    await db.sequelize.sync();
    console.log("db sync sucessfull");
  } catch (err) {
    console.error(err, "db sync un-sucessfull");
  }
})();
module.exports = db;