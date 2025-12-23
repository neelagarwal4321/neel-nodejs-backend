const express = require('express');

const app = express();

// routes and APIs

const user = [];

// post api

app.post('/user', (req, res) => {
    try{
        const {job_title, salary} = req.body();
        if(!String(job_title) && Number(salary)==undefined){
            res.status(403).json({success:false, message:"Give a valid title and salary."});
        }
        const new_user = [{
            id: Date.now(),
            name: "Neel",
            job_title,
            salary
        }];
        user.push(new_user);
        res.status(200).json({success:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// get api

app.get("/post", async(req, res) => {
    try{
        res.status(200).json({success:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

app.listen(8000, () => {
    console.log("The server is running on port 8000.");
});