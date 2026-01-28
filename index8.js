const express = require('express');

const app = express();

app.use(express.json());

// restful api for a single route

const boxers = [];

// post api

app.post("/boxing", (req, res) => {
    try{
        const {name, age} = req.body;
        if(!String(name) || typeof name !== 'string' || name.trim().length === 0){
            return res.status(404).json({success:false, message:"Give a valid name"});
        }
        if(!Number(age) || Number(age) === undefined){
            return res.status(404).json({success:false, message:"Give a valid age"});
        }
        if(boxers.find((e) => e.id === id)){
            return res.status(404).json({success:false, message:"Boxer already exists"});
        }
        const new_boxer = [{
            name,
            age,
            id: Date.now()
        }];
        boxers.push(new_boxer);
        return res.status(200).json({success:true, message:"The boxer is added successfully", data:boxers});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// patch api

app.patch("/boxing", (req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// put api

app.put("/boxing", (req, res) => {

});

// delete api

app.delete("/boxing", (req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// get api

app.get("/boxing", async(req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});