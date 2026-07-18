const fs = require("fs")
fs.unlink("data2.html", (err) => {
    if (err) throw err
    console.log("DELETE");
    
})
fs.unlinkSync("data2.html");