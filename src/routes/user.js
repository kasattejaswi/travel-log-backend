const express = require("express");
const router = express.Router();

// Get the details of the user
router.get("/user", (req, res) => {
    res.send({ message: "You are getting the user details" });
});

// Update a particular user
router.patch("/user", (req, res) => {
    res.send({message: "You are updating the current user"})
})

// Create a new user
router.post("/user", (req, res) => {
    res.send({
        message: "Creating a new user"
    })
})

// Delete an existing user
router.delete("/user", (res, req) => {
    res.send({
        message: "Deleting an existing user"
    })
})

// Check if username is unique or not
router.get("/isunique", (req, res) => {
    res.send({ message: "Check if username is unique or not" });
});

// Follow a particular user
router.post("/follow", (req, res) => {
    res.send({ message: "Following this user" });
});

// Unfollow a particular user
router.post("/unfollow", (req, res) => {
    res.send({ message: "Unfollowing this user" });
});

module.exports = router;
