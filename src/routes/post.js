const express = require("express");
const router = express.Router();

// Get the feed for the timeline
router.get("/feed", (req, res) => {
    res.send({
        message: "Getting the feed for the timeline",
    });
});

// Create a new post
router.post("/post", (req, res) => {
    res.send({
        message: "Creating a new post",
    });
});

// Get a post
router.get("/post", (req, res) => {
    res.send({
        message: "Get a particular post"
    })
})

// Delete a post
router.delete("/post", (req, res) => {
    res.send({
        message: "Delete a particular post"
    })
})

// Like a particular post
router.post("/like", (req, res) => {
    res.send({
        message: "Liking a post",
    });
});

// Unlike a particular post already liked
router.post("/unlike", (req, res) => {
    res.send({
        message: "Unliking a particular post",
    });
});

// Comment on a particular post already created
router.post("/comment", (req, res) => {
    res.send({
        message: "Add a comment on a particular post",
    });
});

// Delete a particular comment on a post
router.delete("/comment", (req, res) => {
    res.send({
        message: "Delete a particular comment",
    });
});

// Update an existing comment
router.patch("/comment", (req, res) => {
    res.send({
        message: "Update an existing comment",
    });
});

module.exports = router;
