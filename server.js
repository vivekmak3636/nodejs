const { log } = require('console');
let  http  = require('http');


http.createServer((req, res) => {
    res.write("Hello Vivek");
    res.write();
    res.end();

}).listen(5000, () => {
    console.log("SERVER IS RUNNING");
    
})