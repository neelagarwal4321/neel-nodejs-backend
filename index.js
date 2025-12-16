const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// creating API
app.get("/", function(req, res){
    res.render("index.ejs")
});

app.get("/profile", async(req, res) => {
    try{
        const user = [{
            id: 1,
            name: "neel",
            role: "admin",
            age: 23
        }, {
            id: 2,
            name: "jerry",
            role: "servant",
            age: 16
        }];
        if(!user){
            res.status(404).json({success:false, message:"this profile was not found.."});
        }
        res.status(200).json({success:true, data:user})
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error..", error:error.message})
    }
});

// creating another API
app.get("/ages", async(req, res) => {
    try{
        const {age} = req.query;
        const user = [{
            id: 1,
            name: "neel",
            role: "admin",
            age: 23
        }, {
            id: 2,
            name: "jerry",
            role: "cutie",
            age: 16
        }];
        if(age){
            if(Number(age)<18){
                res.status(200).json({success: true, message: "success", data:user});
            }
            else{
                res.status(403).json({success: false, message: "age must be greater than 18 bsdk.."});
            }
        }
        res.status(200).json({success: true, message: "success", data:user});
    }
    catch(error){
        res.status(500).json({success: false, message:"internal server error..", error:error.message});
    }
});


app.listen(3000, () => {
    console.log("server is running on port 3000.")
});