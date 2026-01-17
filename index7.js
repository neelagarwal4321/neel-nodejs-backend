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

const movies = [];

// post api movies route

app.post("/movies", (req, res) => {
    try{
        const {name,id,genre} = req.body;
        if(!String(name) || typeof name !== 'string' || name.trim().length === 0){
            res.status(400).json({success:false, message:"not a valid movie name"});
        }
        if(!String(id) || typeof id !== 'string' || id.trim().length === 0){
            res.status(400).json({success:false, message:"not a valid movie id"});
        }
        if(!String(genre) || typeof genre !== 'string' || genre.trim().length === 0 || String(genre) !== "Action" || String(genre) !== "Comedy" || String(genre) !== "Horror" || String(genre) !== "Sci-Fi"){
            res.status(400).json({success:false, message:"not a valid movie genre"});
        }
        const new_movie = [{
            name,
            id,
            genre
        }];
        movies.push(new_movie);
        return res.status(200).json({success:true, message:"The movie is added successfully", data:movies});
    }
    catch(error){
        return res.status(400).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// patch api movies route

app.patch("/movies/:id", (req, res) => {

});

// put api movies route

app.put("/movies/:id", (req, res) => {

});

// delete api movies route

app.delete("/movies/:id", (req, res) => {

});

// get api movies route

app.get("/movies/:id", (req, res) => {

});


app.listen(8000, () => {
    consol.log("The server is running on port 8000.")
});