const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
    res.send({ message: "You are calling user route" });
});

module.exports = router