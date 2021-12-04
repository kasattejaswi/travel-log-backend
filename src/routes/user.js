const express = require("express");
const router = express.Router();

const user = require("../models/user");
const userStatics = require("../statics/user.json");
const authMiddleware = require("../middleware/auth");
const {
    checkValidRequest,
    checkMinKeysInRequest,
} = require("../utilities/utils");

// Get the details of the user
router.get("/user", authMiddleware, (req, res) => {
    res.send({
        success: true,
        user: req.user,
    });
});

// Login for a particular
router.post("/login", async (req, res) => {
    if (
        !checkValidRequest(
            Object.keys(req.body),
            userStatics.login.post.allAllowedKeys
        )
    ) {
        return res.status(400).send({
            success: false,
            message: "Failed to login. Some keys are invalid",
        });
    }
    if (
        !checkMinKeysInRequest(
            Object.keys(req.body),
            userStatics.login.post.minimumKeys
        )
    ) {
        return res.status(400).send({
            success: false,
            message: "Failed to login. Some required keys are missing",
        });
    }
    const username = req.body.username || undefined;
    const email = req.body.email || undefined;
    if (!(username || email)) {
        return res.status(400).send({
            success: false,
            message: "Failed to login. Username or email required to login",
        });
    }
    const password = req.body.password;
    try {
        const userdata = await user.findByCredentials(
            username,
            email,
            password
        );
        const token = await userdata.generateToken();
        res.send({
            success: true,
            message: "Login successful",
            user: userdata,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: "Username or password incorrect",
        });
    }
});

// Update self user
router.patch("/user", authMiddleware, (req, res) => {
    res.send({ message: "You are updating the current user" });
});

// Create a new user
router.post("/user", async (req, res) => {
    if (
        !checkValidRequest(
            Object.keys(req.body),
            userStatics.user.post.allAllowedKeys
        )
    ) {
        return res.status(400).send({
            success: false,
            message: "Failed to create new user. Some keys are invalid",
        });
    }

    if (
        !checkMinKeysInRequest(
            Object.keys(req.body),
            userStatics.user.post.minimumKeys
        )
    ) {
        return res.status(400).send({
            success: false,
            message:
                "Failed to create new user. Some required keys are missing",
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
        password: req.body.password,
    };
    try {
        const newUser = new user(userBody);
        await newUser.save();
        const token = await newUser.generateToken();
        return res.status(201).send({
            success: true,
            message: "User created successfully",
            token,
        });
    } catch (err) {
        if (err && err.code === 11000) {
            let duplicateKey;
            if (err.keyPattern.email) {
                duplicateKey = "Email";
            }
            if (err.keyPattern.userName) {
                duplicateKey = "Username";
            }
            return res.status(409).send({
                success: false,
                message: `Failed to create a new user: ${duplicateKey} already present`,
            });
        } else {
            return res.status(500).send({
                success: false,
                message:
                    "Error occurred while creating user. Connect with administrator",
            });
        }
    }
});

// Delete an existing user
router.delete("/user", authMiddleware, (res, req) => {
    res.send({
        message: "Deleting an existing user",
    });
});

// Check if username is unique or not
router.get("/isunique", (req, res) => {
    res.send({ message: "Check if username is unique or not" });
});

// Follow a particular user
router.post("/follow", authMiddleware, (req, res) => {
    res.send({ message: "Following this user" });
});

// Unfollow a particular user
router.post("/unfollow", authMiddleware, (req, res) => {
    res.send({ message: "Unfollowing this user" });
});

module.exports = router;
