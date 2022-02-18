const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    addtask:{type:String, required:true},
    date:{type:Date, required:true},
    description:{type:String, required:true}
}, {collection:'taskcollection'})

const taskModel = mongoose.model("task", taskSchema)


module.exports = taskModel