const express = require('express');
const app = express();

app.use(express.json());

// get api practice

app.get("/profile", async(req, res) => {
    try{
        const {id} = req.query;
        const user = [{
            name: "Cristiano",
            age: 40,
            id: 100
        }, {
            name: "Lionel",
            age: 38,
            id: 101
        }];
        if(id){
            if(Number(id)){
                res.status(200).json({success:true, message:"success", data:user});
            }
            res.status(403).json({success:false, message:"must be a valiid ID (numeric)."});
        }
        res.status(200).json({success:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error.", error:error.message});
    }
});

// post api practice 

app.post("/cart", (req,res) => {
    try{
        const {item, qty} = req.body;
        if(!String(item) && Number(qty)==undefined){
            res.status(403).json({success:false, message:"must be a valid item and quantity."});
        }
        const cart = [{
            name: "Riya",
            item,
            qty
        }];
        res.status(200).json({success:true, message:"success", data:cart});
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error.", error:error.message});
    }
});

// REVIEW APIs creation (post and get)

const review = [];

app.post("/reviews", (req,res) => {
    try{
        const {movie_title, rating, review_text} = req.body;
        if(!String(movie_title)){
            return res.status(400).json({ success: false, message: "Movie title is required." });
        }
        else if(!review_text || typeof review_text !== 'string' || review_text.trim().length === 0){
            res.status(403).json({success:false, message: "Review text is required." });
        }
        else if((Number(rating)!==0 && Number(rating)>5)){
            res.status(403).json({success:false, message: "Rating must be between 1 and 5." });
        }
        const new_review = [{
            user_id: Date.now(),
            movie_title,
            rating,
            review_text,
        }];
        review.push(new_review);
        res.status(200).json({success:true, message:"successfully given review", data:review});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error.", error:error.message});
    }
});

app.delete("/reviews/:user_id", (req, res) => {
    try{
        const userId = Number(req.params.user_id);
        const reviewIndex = review.findIndex(r => r.user_id === userId);

        if(reviewIndex === -1){
            return res.status(404).json({ success: false, message: "Review not found." });
        }
        review.splice(reviewIndex, 1);
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    }
    catch(error){
        res.status(500).json({ success:true, message: "Internal Server Error..", error:error.message});
    }
});

app.get("/reviews", async(req, res) => {
    try{
        res.status(200).json({success:true, message:"successfully given review", data:review});
    }
    catch(error){
        res.status(500).json({success:false, message:"Internal Server Error.", error:error.message});
    }
});

app.listen(3000, () => {
    console.log("The server is running on port 3000.")
});