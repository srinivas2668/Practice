const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/rootRoute")(app);

app.listen(3000, () => {
    console.log("server is running")
})