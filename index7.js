// complete practice

const express = require('express');

const app = express();

app.use(express.json());

app.get("/members", async(req, res) => {
    try{
        const {name} = req.query;
        const member = [{
            name: "Neel",
            age: 23,
            house: "Gryffindor"
        }, {
            name: "Riya",
            age: "23",
            house: "Slytherin"
        }];
        if(!member){
            res.status(400).json({success:false, message:"the member is not found"});
        }
        if(name){
            if(String(name) || typeof name === 'string'){
                return res.status(200).json({success:true, message:"the member is present", data:member});
            }
        }
        return res.status(200).json({success:true, message:"the member is present", data:member});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", data:error.message});
    }
});

// restful api for the movies route

// post api movies route

app.post("/movies", (req, res) => {

});

// patch api movies route

app.patch("/movies/:id", (req, res) => {

});

// put api movies route

app.put("/movies/:id", (req, res) => {

});

// delete api movies route

// get api movies route