const fs = require("fs")
fs.rename("data1.html", "data.html", (err) => {
    if(err) throw err    
})
fs.renameSync("data.html","data1.html")