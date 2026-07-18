const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
let hashpassword = "";
app.get('/', (req, res) => {
    res.send('server is working');
});
app.post('/', async (req, res) => {
    let { username, password } = req.body;

    hashpassword = await bcrypt.hash(password, 10);

    res.json({
        username,
        password: hashpassword
    })


})
app.post('/login', async (req, res) => {
    let { username, password } = req.body;

    let result = await bcrypt.compare(password, hashpassword);
    if (!result) {

        return res.json({
            message: "invalid password"
        })
    }
    res.json({
        message: "Login successfully."
    })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


