const express = require('express')
const app = express()

// middleware
app.use(function(req, res, next){
    console.log("Middleware 1");
    next();
});


// routes create
app.get("/", function(req, res){
    res.send("Champion");
});

app.get("/profile", function(req, res){
    res.send("Neel");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
 