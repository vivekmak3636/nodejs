const fs = require("fs")
fs.readFile("data.txt", "utf8", (err,data) => {
    if (err) throw err
    console.log(data);
})

let data = fs.readFileSync("data1.html", "utf8");
console.log(data);
