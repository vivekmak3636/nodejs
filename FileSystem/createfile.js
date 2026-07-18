const fs = require("fs")
fs.writeFile("data.txt", "HELLO WORLD", (err) => {
    if (err) throw err
    console.log("file is created");
    
})
fs.writeFileSync("data1.html", "hello html")

fs.writeFileSync("data2.html", "hello html")