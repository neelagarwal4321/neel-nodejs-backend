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


// creating post, put, delete and get

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
        members.push(new_member);
        res.status(200).json({succes: true, message:"success", data:new_member});
    }
    catch(error){
        res.status(500).json({succes: false, message:"Internal Server Error", error:error.message});
    }
});

// put api

app.put("/members/:id", (req, res) => {
    const {id} = req.params; // getting the data for updating the entire object values based on the id/anything
    const {name, position} = req.body;
    const member_index = members.findIndex((e) => e.id === id);
    if(member_index === -1){
        res.status(404).json({success: false, message:"user not found"});
    }
    members[member_index] = {...members[member_index], name:name?? members[member_index].name, position:position?? members[member_index].position};
    return res.status(200).json({success:true, message:"user found and changed", data:members});
});

// delete api
app.delete("/members/:id", (req, res) => {
    try{
        const member_index = members.findIndex((e) => e.id === id);
        if(member_index === -1){
            res.status(404).json({success: false, message:"user not found"});
        }
        const deleted_members = members.splice(members_index, 1);
        return res.status(200).json({success:true, message:"success", data:deleted_members[0]});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// get api
app.get("/members", async(req, res) => {
    try{
        const {name} = req.query; // getting the data based on some query
        if(name){
            if(members.find(u => u.name === name.trim())){
                res.status(200).json({succes: true, message:"member found", data:members});
            }
            else{
                return res.status(403).json({success: false, message: "member not found"});
            }
        }
        res.status(200).json({succes: true, message:"success", data:members});
    }
    catch(error){
        res.status(500).json({succes: false, message:"Internal Server Error", error:error.message});
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000.")
});

