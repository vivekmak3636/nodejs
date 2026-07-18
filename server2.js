const http = require('http');
http.createServer((req, resp) => {
    resp.writeHead(200, { "Content-Type": "application\json"});

    resp.write(JSON.stringify({ name: 'test', email: 'test.com' }));
    resp.end();
}).listen(5000,()=>{
    console.log("server is running....");
    
});