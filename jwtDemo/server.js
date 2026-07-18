const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const router = require('./routes/userRoutes');
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/user", router);
connectDB();
app.get('/', (req, res) => {
    res.send("server is working...");
})
app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
})
