const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("index.ejs")
});

app.get("/profile", async(req, res) => {
    try{
        const user = {
            id: 1,
            name: "neel",
            role: "admin"
        }
        if(!user){
            res.status(404).json({success:false, message:"this profile was not file"});
        }
        res.status(200).json({success:true, data:user})
    }
});


app.listen(3000, function(){
    console.log("server is running on port 3000.")
})