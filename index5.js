const express = require('express');
const app = express();

app.use(express.json());

// get api practice.

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
            else{
                res.status(403).json({success:false, message:"must be a valiid ID (numeric)."});
            }
        }
        res.status(200).json({success:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error.", error:error.message});
    }
});

// post api practice.

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

// REVIEW APIs creation (post, delete and get). review route

const review = [];

// post api /review route.

app.post("/reviews", (req,res) => {
    try{
        const {movie_title, rating, review_text} = req.body;
        if(!String(movie_title)){
            return res.status(400).json({ success: false, message: "Movie title is required." });
        }
        else if(!review_text || typeof review_text !== 'string' || review_text.trim().length === 0){
            return res.status(403).json({success:false, message: "Review text is required." });
        }
        else if((Number(rating)!==0 && Number(rating)>5)){
            return res.status(403).json({success:false, message: "Rating must be between 1 and 5." });
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

// delete api /review/user_id route.

app.delete("/reviews/:user_id", (req, res) => {
    try{
        const userId = Number(req.params.user_id);
        const reviewIndex = review.findIndex(r => r.user_id === userId);

        if(reviewIndex === -1){
            return res.status(404).json({success: false, message: "Review not found."});
        }
        review.splice(reviewIndex, 1);
        res.status(200).json({success: true, message: "Review deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:true, message: "Internal Server Error..", error:error.message});
    }
});

// get api review route.

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


// Another new API
const users = [];

app.post("/register", (req,res) => {
    try{
        const {username, password, confirm_password} = req.body;

        if (!username || typeof username !== 'string' || username.trim().length < 3) {
            return res.status(400).json({success: false, message: "Username must be at least 3 characters."});
        }
        if (!password || typeof password !== 'string' || password.trim().length < 6) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters."});
        }
        if (password !== confirm_password) {
            return res.status(400).json({success: false, message: "Passwords do not match."});
        }

        if(users.find(u => u.username === username.trim())){
            return res.status(400).json({success: false, message:"User already exists."});
        }
        const new_user = [{
            username: username.trim(),
            password,
        }];
        users.push(new_user);
        res.status(200).json({success:true, message:"successfully registered", data: new_user.username});
    }
    catch(error){
        return res.status(500).json({success:true, message:"Internal Server Error", error:error.message});
    }
});

// put api for this route

app.put("/register/:username", (req, res) => {
	const {username} = req.params;
	const {password} = req.body;
	const user_index = users.findIndex((e) => e.username === username.trim());
	if(user_index === -1){
		res.status(404).json({sucess:false, message:"user not found"});
	}
    users[user_index] = {...users[user_index], password:password?? users[user_index].password};
    return res.status(200).json({sucess:true, message:"user found", data:users});
});

// delete api for this route

app.delete("/register/:id", (req, res) => {
    try{
        const user_index = users.findIndex((e) => e.username === username.trim());
        if(user_index === -1){
            res.status(404).json({sucess:false, message:"user not found"});
        }
        const deleted_user = users.splice(user_index, 1);
        return res.status(200).json({success:true, message:"user deleted", data:users});
    }
    catch(error){
        return res.status(500).json({success:false, message:"internal server error", error:error.message});
    }
});

app.get("/register", async(req, res) => {
    try{
        const {username} = req.query;
        if(username){
            const user = users.find(u => u.username === username);
            if(!user){
                return res.status(404).json({success: false, message: "User not found."});
            }
            res.status(200).json({ success: true, data: {username: user.username}});
        }
        res.status(200).json({ success: true, data: users.map(u => ({ username: u.username }))});
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});