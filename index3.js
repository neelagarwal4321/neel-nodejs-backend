const http = require('http');
const fs = require('fs');

// http server
const myServer = http.createServer((req, res) => {
    // creating a simple log string
    const log = `${Date.now()}: ${req.url} New Req. Received.\n`;
    // appending the log everytime during a new request
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url){
            case "/":
                res.end("Hello from Home.");
                break;
            case "/about":
                res.end("Hello I am Neel Agarwal.");
                break;
            default:
                res.end("404 Not Found.");
        }
    });
});

myServer.listen(8000, ()=>{
    console.log("The server is running on port 8000.")
});