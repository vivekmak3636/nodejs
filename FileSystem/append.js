const fs = require("fs")

fs.appendFile("data.txt", "\nMY name is vivek", (err) => {
    if(err) throw err
})

fs.appendFileSync("data1.html","\n MY NAME IS SULULU")