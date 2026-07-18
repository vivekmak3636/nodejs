// 
const express = require('express');
const app = express();

app.get("", (req, res) => {
    res.send("<a href='/about'>about</a>");
});

app.get("/about", (req, res) => {
    res.send("<a href='/'>home</a>");
});

app.listen(5000); 
