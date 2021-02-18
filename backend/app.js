const express = require('express')
const app = express();
const bodyparser = require("body-parser")
const cors = require('cors')


app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
app.use(cors())

app.use('/todo', require("./todo/todo.controller"))

app.listen(3001, function(){
    console.log("serveur is up");
})