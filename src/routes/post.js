const express = require('express')
const router = express.Router()

router.get('/feed', (req, res) => {
    res.send({
        message: "Feed endpoint is running"
    })
})

module.exports = router