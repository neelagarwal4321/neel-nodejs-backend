const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // rendering ejs files

app.get("/", function(req,res){
    res.send("Chal rha hai...");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
