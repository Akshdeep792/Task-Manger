const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name : String,
    completed : Boolean
})


module.exports = new mongoose.model('Task', TaskSchema);