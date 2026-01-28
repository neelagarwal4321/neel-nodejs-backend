const express = require('express');

const app = express();

app.use(express.json());

// restful api for a single route

// post api

app.post("/boxing", (req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// patch api

app.patch("/boxing", (req, res) => {

});

// put api

app.put("/boxing", (req, res) => {

});

// delete api

app.delete("/boxing", (req, res) => {

});

// get api

app.get("/boxing", async(req, res) => {

});