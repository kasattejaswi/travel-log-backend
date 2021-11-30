const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/travellogdb")
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((err) => {
        console.log("Failed to connect to DB: " + err);
    });
