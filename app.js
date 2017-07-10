const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const mongoose = require('mongoose')
mongoose.Promise = require("bluebird")
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.set('layout', 'layout')
app.use('/static', express.static('static'))

mongoose.connect('mongodb://localhost:27017/snips');

if (require.main === module) {
    app.listen(3000, function () {
        console.log("Server started on http://localhost:3000/")
    })
}