const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    caption: {
        type: String,
    },
    likedBy: [
        {
            username: {
                type: String,
                required: true,
            },
        },
    ],
    comments: [
        {
            commentText: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
        },
    ],
    createdOn: {
        type: Date,
        required: true,
    },
});

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
