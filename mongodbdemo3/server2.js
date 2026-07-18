const express = require('express');
const app = express();


const filter = (req, res, next) => {
    let age = parseInt(req.query.age);
    if (!age) {
        res.send("Please provide your age");
    }
    else if (age < 18) {
        res.send("you cant visit us");
    }
    else {
        next();
    }
}
app.use(filter);

app.get('/', (req, res) => {
    res.send('server is working');
});
app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});
app.get('/about', (req, res) => {
    res.send('Welcome to the about page');
}
);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


