const express = require('express');
const app = express();
const path = require("path");

// setting up parsers for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for every request, find the static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// setting up ejs as a view engine
app.set("view engine", "ejs");

// creating routes using ejs files
app.get("/", function(req, res){
    res.render("index");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
}); 