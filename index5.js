const express = require('express');
const app = express();

app.use(express.json());

app.get("/fifawc", async(req,res) => {
    try{
        const fifa = [{
            host: "South Africa",
            year: 2010,
            winner: "Spain"
        }, {
            host: "Brazil",
            year: 2014,
            winner: "Germany"
        }];
        if(!fifa){
            res.status(404).json({success:false, message:"404.. Profile Not Found"});
        }
        res.status(200).json({success:true, message:"Profile found.. success", data:fifa});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

const winners = [];

app.post("/icc/winners", (req, res) => {
    try{
        const {host, winners, year} = req.body();
        if(!String(host)){
            res.status(403).json({success:false, message:"Give a valid host."});
        }
        if(!(Number(year)>=1931 && Number(year)<=2027)){
            res.status(403).json({success:false, message:"Give a valid year."});
        }
        if(!String(winners)){
            res.status(403).json({success:false, message:"Give a valid winner."});
        }
        const new_winners = [{
            host,
            winners,
            year,
            id: Date.now()
        }];
        winners.push(new_winners);
        res.status(200).json({success:false, message:"success", data:winners});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

app.get("/icc/winners", async(req, res) => {
    try{
        res.status(200).json({success:false, message:"success", data:winners});
    }
    catch{
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

app.listen(8000, () => {
    console.log("server running on port 8000...");
});