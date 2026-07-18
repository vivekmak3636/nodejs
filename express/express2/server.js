const express = require("express");
const app = express()
app.get("/under", (req, res) => {
    res.send("server is running");
})

app.post("/add", (req, res) => {
    res.send("post method is called");
})

app.put("/update", (req, res) => {
    res.send("put method is called");
})

app.delete("/", (req, res) => {
    res.send("delete method is called");
})
app.listen(5000, () =>
{
    console.log("server is running in 5000");
    
})



