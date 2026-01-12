const express = require('express');
const app = express();

app.use(express.json);

// restful api

const electives = [];

app.post("/electives", (req, res) => {
    try{
        const {name, code, credits} = req.body;
        if(!String(name) || name.trim().length === 0){
            res.status(404).json({success:false, message:"wrong subject"});
        }
        if(!String(code) || code.trim().length === 0){
            res.status(404).json({success:false, message:"wrong subject code"});
        }
        if(Number(credits) === undefined || Number(credits) > 4 ){
            res.status(404).json({success:false, message:"enter valid credits"});
        }
        if(electives.find((e) => e.code === code)){
            res.status(404).json({success:false, message:"subject already exists"});
        }
        const new_elective =[{
            name,
            code,
            credits
        }];
        electives.push(new_elective);
        return res.status(200).json({success:true, message:"successfully added elective subject", data:electives});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

app.get("/electives", async(req, res) => {
    try{
        const {code} = req.query;
        if(code){
            const code_subject = electives.find((e) => e.code === code);
            if(!code_subject){
                res.status(404).json({success:false, message:"User not found"});
            }
            return res.status(200).json({success: true, data: {code: code_subject.code}});
        }
        return res.status(200).json({success: true, data: {code: code_subject.code}});
    }
    
});

app.put("/electives", (req, res) => {

});

app.delete("/electives", (req, res) => {
    try{

    }
    catch(error){

    }
});



app.listen(8000, () => {
    console.log("The Server is running on port 8000.");
});