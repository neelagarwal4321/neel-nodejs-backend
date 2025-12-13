const express = require('express')
const app = express()

// middleware
app.use(function(req, res, next){
    console.log("Middleware 1");
    next();
});

app.use(function(req, res, next){
    console.log("Middleware 2");
    next();
});


// routes create
app.get("/", function(req, res){
    res.send("Champion is running on port 3000");
});

app.get("/about", function(req, res){
    res.send("about page");
});

app.get("/profile", function(req, res){
    res.send("profile page");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
 