const http = require('http');

// http server
const myServer = http.createServer((req, res) => {
    console.log(req.headers);
    res.end("Hello from Server.");
});

myServer.listen(8000, ()=>{
    console.log("The server is running on port 8000.")
});