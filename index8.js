const express = require('express');

const app = express();

app.use(express.json());

// restful api for a single route

// post api

app.post("/boxing", (req, res) => {
});

// patch api

app.patch("/boxing", (req, res) => {
    
});

// put api

// delete api

// get api