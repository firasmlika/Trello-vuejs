const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Type = module.exports = Object.freeze({
    Backlog: 'Backlog',
    InProgress: 'InProgress',
    Testing: 'Testing',
    Done: 'Done',
});

const schema = new Schema({
    text: { type: String },
    type: { type: String, enum: Object.values(Type), required: true },
})

schema.set("toJSON",{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id
    }

})

Object.assign(schema.statics, { Type, });

module.exports = mongoose.model("todo", schema)