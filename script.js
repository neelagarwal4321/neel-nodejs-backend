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

// this route will throw an error and go to the console / error handling middleware
// and send a response to the client
app.get("/profile", function(req, res, next){
    return next(new Error("profile page not found"));
});

// error handling (always at the end) | the output is shown in the frotnend URL
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send("Something broke!");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
 