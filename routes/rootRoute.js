const authLogin = require("../src/authclient/routes/AuthLogin.route");
require("../db/dbconnection")
// require('../src')

module.exports = (app) => {
  app.use("/authClient", authLogin);
  // app.use("/cient/user", verifyAuth, userManagement);
  
};