const express = require("express")
const router = express.Router()
const todoService = require("../todo/todo.service")

module.exports = router
router.post("/add", addTodo)
router.post('/delete', deleteToDo)
router.post('/getAll', getAll)
router.post('/update', update)

function addTodo(req, res, next){
    todoService
    .addTodo(req.body) //todo
    .then((doc) => res.status(200).json({ doc: doc}))
    .catch((err)=> res.status(400).json({ err }))
}

function getAll(req, res, next){
    todoService
    .getAll()
    .then((todos) => res.status(200).json({ success: true, todo: todos}))
    .catch((err)=> res.status(400).json({ err }))

}

function deleteToDo(req, res, next) {
    todoService
    .delete(req.body.id)
    .then(() => res.status(200).json({ success: true}))
    .catch((err)=> res.status(400).json({ err }))
}

function update(req, res, next) {
    todoService
    .update(req.body.id, req.body.type)
    .then(() => res.status(200).json({ success: true}))
    .catch((err)=> res.status(400).json({ err }))
}