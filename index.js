const express = require('express');
const app = express();

// setting up parsers for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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