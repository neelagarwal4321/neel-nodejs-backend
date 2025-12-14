const express = require('express');
const app = express();

// setting up parsers for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// setting up ejs as a view engine
app.set("view engine", "ejs");

// creating routes
app.get("/", function(req, res){
    res.send("Chal rha hai...");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});