const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Must provide name!'],
        trim: true,
        maxlength : [20, 'Name cannot be bigger than 20 characters']
    },
    completed :{
        type: Boolean,
        default : false
    } 
})


module.exports = new mongoose.model('Task', TaskSchema);