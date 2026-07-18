const express = require("express");
const app = express();

app.get("", (req, res) => {
    res.send("<H1>DEFAULT PAGE</H1><br><H1>TO OPEN AN HOME PAGE</H1><br><H1>COPY THIS LINE AND PASTE ON URL</H1><br><H1>http://localhost:5000/home</H1> ")
    res.end()
})
app.get("/home", (req, res) => {
    res.send("<H1>WELLCOME TO HOME PAGE</H1><br><H1>TO OPEN AN ABOUT PAGE</H1><br><H1>COPY THIS LINE AND PASTE ON URL</H1><br><H1>http://localhost:5000/about</H1> ")
})
app.get("/about", (req, res) => {
    res.send("<H1>WELLCOME TO ABOUT PAGE</H1><br><H1>TO OPEN AN CONTACT PAGE</H1><br><H1>COPY THIS LINE AND PASTE ON URL</H1><br><H1>http://localhost:5000/contact</H1> ")
})
app.get("/contact", (req, res) => {
    res.send("<H1>WELLCOME TO CONTACT PAGE</H1><br><H1>THANKS YOU FOR VIST OUR WEBSITE</H1><br><H1>OUR EMAIL:-VIVEKMACK3646@GAMIL.COM</H1><br><H1>CONACT US :-9879154422</H1> ")
})
app.listen(5000, () => {
    console.log("server is running at 5000");
})