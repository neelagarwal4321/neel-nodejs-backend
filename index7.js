// complete practice

const express = require('express');

const app = express();

app.use(express.json());

// app.get("/members", async(req, res) => {
//     try{
//         const {name} = req.query;
//         const member = [{
//             name: "Neel",
//             age: 23,
//             house: "Gryffindor"
//         }, {
//             name: "Riya",
//             age: "23",
//             house: "Slytherin"
//         }];
//         if(!member){
//             res.status(400).json({success:false, message:"the member is not found"});
//         }
//         if(name){
//             if(String(name) || typeof name === 'string'){
//                 return res.status(200).json({success:true, message:"the member is present", data:member});
//             }
//         }
//         return res.status(200).json({success:true, message:"the member is present", data:member});
//     }
//     catch(error){
//         return res.status(500).json({success:false, message:"Internal Server Error", data:error.message});
//     }
// });

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
        if(!String(genre) || typeof genre !== 'string'){
            res.status(400).json({success:false, message:"not a valid movie genre"});
        }
        if(movies.find((m) => m.id === id)){
            res.status(400).json({success:false, message:"movie already present abd exists"});
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
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
}); 

// patch api movies route

app.patch("/movies/:id", (req, res) => {
    try{
        const {id} = req.params;
        const {name, genre} = req.body;
        const movies_index = movies.findIndex((e) => e.id === id);
        if(movies_index === -1){
            res.status(404).json({success:false, message:"Movie not found"});
        }
        if(!name && !genre){
            res.status(400).json({success:false, message:"Any one of the above field."});
        }
        if(name){
            movies[movies_index].name = name; 
        }
        if(genre){
            movies[movies_index].genre = genre; 
        }
        return res.status(200).json({success:true, message:"movie details edited and updated individually", data:movies});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// put api movies route

app.put("/movies/:id", (req, res) => {
    const {id} = req.params;
    const {name, genre} = req.body;
    const movies_index = movies.findIndex((m) => m.id === id);
    if(movies_index === -1){
        res.status(404).json({success:false, message:"Movie not found"});
    }
    movies[movies_index] = {...movies[movies_index], name:name?? movies[movies_index].name, genre:genre?? movies[movies_index].genre};
    return res.status(200).json({success:true, message:"movie details edited and updated completely", data:movies});
});

// delete api movies route

app.delete("/movies/:id", (req, res) => {
    try{
        const {id} = req.params;
        const movies_index = movies.findIndex((m) => m.id === id);
        if(movies_index === -1){
            res.status(404).json({success:false, message:"Movie not found"});
        }
        const deleted_movie = movies.splice(movies_index, 1);
        return res.status(200).json({success:true, message:"Movie deleted successfully", data:deleted_movie});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});

// get api movies route

app.get("/movies/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "Please enter a valid id"});
        }
        const movieId = String(id);
        const movies_index = movies.findIndex(m => m.id === movieId.trim());
        if(movies_index === -1){
            return res.status(404).json({success: false, message: "Movie not found"});
        }
        return res.status(200).json({success: true, message: "Success",data: movies[movies_index]});
    }
    catch(error){
        return res.status(500).json({success: false, message: "Internal Server Error", error: error.message});
    }
});


app.get("/movies", (req, res) => {
    try{
        return res.status(200).json({success:true, message:"The movie is added successfully", data:movies});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
});


app.listen(8000, () => {
    console.log("The server is running on port 8000.")
});