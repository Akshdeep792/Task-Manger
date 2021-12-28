const { TooManyAttemptsError } = require('passport-local-mongoose/lib/errors');
const Tasks = require('../models/task');


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        console.log(tasks);
        res.status(200).json({ tasks })
    } catch (err) {
        res.status(500).json({ msg: err });

    }
}
const createTasks = async (req, res) => {
    try {
        const tasks = await Tasks.create(req.body);
        res.status(201).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: err });
    }

}
const getTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const tasks = await Tasks.findOne({ _id: taskID });

        if (!tasks) {
            res.status(404).json({ msg: `No tasks with id ${taskID}` })
        }
        res.status(201).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: err });
    }

}
const updateTasks = async (req, res) => {
    try{const { id: taskID} = req.params;
    const tasks = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
        new:true,
        runValidators : true
    });
    res.status(201).json({ tasks});}catch(err){
        res.status(500).json({ msg: err });
        
    }
}
const deleteTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const tasks = await Tasks.findOneAndDelete({ _id: taskID });

        if (!tasks) {
            res.status(404).json({ msg: `No tasks with id ${taskID}` })
        }
        res.status(201).json({ tasks : null , msg : 'success'});
    } catch (err) {
        res.status(500).json({ msg: err });

    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}