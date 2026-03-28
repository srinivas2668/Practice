require('dotenv').config();
const express = require("express");
const multer = require("multer");
const { vaultLogin } = require('./controllers/authController');
const { authMiddleware } = require("./middlewares/auth");
const sequelize = require('./config/database'); // Your Sequelize connection
const app = express();
const upload = multer();

app.use(express.json());

app.post('/vault-log-in', upload.none(), vaultLogin);
app.get('/valut-dashboard', authMiddleware);

const PORT = 3000;
sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Server on http://localhost:3000`));
    })
    .catch(err => {
        console.error('❌ Sync Error:', err.message);
    });