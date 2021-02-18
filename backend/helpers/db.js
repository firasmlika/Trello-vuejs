//configuration mongooss
const config = require("../config")
const mongoose = require("mongoose")
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = { 
   ToDo: require('../todo/todo.model')
}