const express = require("express");
const app = express();
app.use(express.json());
let users = [
    {
        id: 1,
        name: "Vivek",
        Num: 9879154422,
        email: "vivekmack3646@gmail.com"
    },
    {
        id: 2,
        name: "Vasim",
        Num: 987989563,
        email: "loya12@gmail.com"
    },
    {
        id: 3,
        name: "Savaj",
        Num: 9856325263,
        email: "savaj12@gmail.com"
    }
]

//check server is runnig or not
app.get("", (req, res) => {
    res.send("SERVER IS RUNNING...")
})

//fatch data from array
app.get("/users", (req, res) => {
    res.json(users);

})
//fatch single data from array
app.get("/users/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let user = users.find((u) => id === u.id);
    if (!user) {
        res.json({
            message: "User not found"
        });
        return
    }
    res.json(user);
})
//to add user
app.post('/users', (req, res) => {
    let data = req.body;
    let user = {
        id: users.length + 1,
        name: data.name,
        num: data.num,
        email: data.email
    }
    users.push(user);
    res.json(user)
})

//update
app.put("/users/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let user = users.find((u) => u.id === id);

    if (!user) {
        return res.json({
            message: "User not found"
        });
    }

    user.name = req.body.name || user.name;
    user.num = req.body.num || user.num;
    user.email = req.body.email || user.email;

    res.json({
        message: "User updated successfully",
        data: user
    });
});

app.delete('/users/:id', (req, res) => {

    let id = parseInt(req.params.id);
    let index = users.findIndex((u) => u.id === id);
    if (index == -1) {
        res.json({
            'message': 'user not found'
        })
        return
    }
    users.splice(index, 1);
    res.json({
        message: 'user deleted successfully'
    });
})


//set localhost
app.listen(5000, () => {
    console.log("SERVER RUNNING ON 5000....");

})