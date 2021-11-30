const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    followers: [
        {
            username: {
                type: String,
                required: true,
            },
        },
    ],
    following: [
        {
            username: {
                type: String,
                required: true,
            },
        },
    ],
    posts: [
        {
            id: {
                type: String,
                required: true,
            },
        },
    ],
    profilePicture: {
        type: Buffer,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
    },
    emailVerificationToken: {
        token: {
            type: String,
            required: true,
        },
        expiresIn: {
            type: Date,
            required: true,
        },
    },
    createdOn: {
        type: Date,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
