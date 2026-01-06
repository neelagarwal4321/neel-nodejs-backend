const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res){
    res.render("index.ejs");
});

const user = [];
// creating API
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
        const user_info = [{
            name:"Neel",
            age:23,
            id:Date.now(),
            car:"Ferrari LaFerrari"
        },{
            name:"Riya",
            age:22,
            id:Date.now(),
            car:"Rolls Royce Ghost"
        }];

        if(!user_info){
            res.status(403).json({success: false, message: "The user is not found.."});
        }
        else if(age){
            if(Number(age)>18){
                res.status(200).json({success: true, message: "success", data:user_info});
            }
            else{
                res.status(403).json({success: false, message: "age must be greater than 18 bsdk.."});
            }
        }
        res.status(200).json({success: true, message: "success", data:user_info});
    }
    catch(error){
        res.status(500).json({success: false, message:"internal server error..", error:error.message});
    }
});

// post API.

const chat = [];

app.post("/chat", (req,res) => {
    try{
        const {name, text} = req.body();
        if(!String(name)){
            res.status(403).json({status:false, message:"Enter a valid name"});
        }
        else if(!(String(text))){
            res.status(403).json({status:false, message:"Don't didn't go through"});
        }
        const new_chat = [{
            name,
            text,
            id: Date.now()
        }];
        chat.push(new_user);
        res.status(200).json({sucess:true, message:"Successfully text sent", data:chat});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal server error", error:error.message});
    }
});


// creating post and get

const members = [];

app.post("/members", (req, res) => {
    try{
        const {name, position} = req.body;
        if(!String(name) || typeof name !== 'string'){
            return res.status(403).json({success: false, message: "not a valid name"});
        }
        if(!String(position) || typeof position !== 'string'){
            return res.status(403).json({success: false, message: "not a valid position"});
        }
        if(members.find(u => u.name === name.trim())){
            return res.status(400).json({success: false, message:"members already exists."});
        }
        const new_member = [{
            name,
            position,
            id: Date.now(),
        }];
        members.push(new_members);
        res.status(200).json({succes: true, message:"success", data:new_member});
    }
    catch(error){
        res.status(500).json({succes: false, message:"Internal Server Error", error:error.message});
    }
});

app.get("/members", async(req, res) => {
    try{

    }
    catch{

    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000.")
});

