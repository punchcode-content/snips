const express = require('express')

const app = express()


if (require.main === module) {
    app.listen(3000, function () {
        console.log("Server started on http://localhost:3000/")
    })
}