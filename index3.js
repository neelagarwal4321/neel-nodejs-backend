const http = require('http');

const myServer = http.createServer((req, res) => {
    console.log("New Request Received.");
    res.end("Hello from Server.");
});

myServer.listen(8000, ()=>{
    console.log("The server is running on port 8000.")
});