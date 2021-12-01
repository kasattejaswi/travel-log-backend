const express = require('express')
const user = require('./routes/user')
const posts = require('./routes/post')
const db = require('./db/connection')

const app = express()
app.use(express.json())
app.use(user)
app.use(posts)

app.listen(3000, () => {
    console.log("Application is running on port 3000")
})