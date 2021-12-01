const express = require('express')
const user = require('./routes/user')
const posts = require('./routes/post')
const db = require('./db/connection')
const context = '/api/v1'
const app = express()
app.use(express.json())
app.use(context, user)
app.use(context, posts)

app.listen(3000, () => {
    console.log("Application is running on port 3000")
})