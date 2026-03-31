const express = require("express");
const app = express();
const sequelize = require("../src/config/database")
const userRouter = require("./routes/userRoutes");
app.use(express.json());
require("./models/User"); // when we create table we need this  // for creating table use sequelize.sync();

app.use('/usermanage', userRouter);


sequelize.authenticate()
    .then(() => {
        console.log('database conneted sucessfully and creting table')
        sequelize.sync();
    }).then(() => {
        app.listen(3000, () => {
            console.log("server runing")
        })
    }).catch((err) => {
        console.error(err, "Not Sync Properly")
    })