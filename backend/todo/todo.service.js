const db = require("../helpers/db")
const ToDo = db.ToDo



async function addTodo(todo) {
 const toDoObjetMongoose = new ToDo(todo)
 return await toDoObjetMongoose.save()
}

async function getAll() {
    return await ToDo.find()
}

async function _delete(id) {
    await ToDo.findByIdAndRemove(id);
}

async function update(id,type) {
    await ToDo.updateOne({ _id: id}, { type: type}).exec()
}

module.exports = { 
    addTodo,
    getAll,
    delete: _delete,
    update
}