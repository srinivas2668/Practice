const express = require('express');
const app = express();
require('dotenv').config();

const rootRoute = require("./routes/rootRoute")
app.use(express.json())
rootRoute(app);

app.listen(3000, () => {
    console.log("server is running")
})