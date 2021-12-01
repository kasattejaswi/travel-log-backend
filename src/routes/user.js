const express = require("express");
const router = express.Router();

const user = require("../models/user");
const { checkValidRequest,checkMinKeysInRequest } = require("../utilities/utils");

// Get the details of the user
router.get("/user", (req, res) => {
    res.send({ message: "You are getting the user details" });
});

// Update a particular user
router.patch("/user", (req, res) => {
    res.send({ message: "You are updating the current user" });
});

// Create a new user
router.post("/user", async (req, res) => {
    if (
        !checkValidRequest(Object.keys(req.body), [
            "username",
            "firstName",
            "lastName",
            "dateOfBirth",
            "password",
            "email",
        ])
    ) {
        return res.status(400).send({
            success: false,
            errorMessage: "Some keys are invalid",
        });
    }

    if (
        !checkMinKeysInRequest(Object.keys(req.body), [
            "username",
            "firstName",
            "lastName",
            "dateOfBirth",
            "password",
            "email",
        ])
    ) {
        return res.status(400).send({
            success: false,
            errorMessage: "Some required keys are missing",
        });
    }

    const userBody = {
        userName: req.body.username,
        name: {
            first: req.body.firstName,
            last: req.body.lastName,
        },
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password
    };
    const newUser = new user(userBody);
    await newUser.save();
    res.send({
        message: "Creating a new user",
    });
});

// Delete an existing user
router.delete("/user", (res, req) => {
    res.send({
        message: "Deleting an existing user",
    });
});

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
