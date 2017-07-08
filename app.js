const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.set('layout', 'layout')
app.use('/static', express.static('static'))

if (require.main === module) {
    app.listen(3000, function () {
        console.log("Server started on http://localhost:3000/")
    })
}