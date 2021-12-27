const { TooManyAttemptsError } = require('passport-local-mongoose/lib/errors');
const Task = require('../models/task');


const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json({ task })
    } catch (err) {
        res.status(500).json({ msg: err });

    }
}
const createTasks = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err });
    }

}
const getTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });

        if (!task) {
            res.status(404).json({ msg: `No task with id ${taskID}` })
        }
        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ msg: err });

    }

}
const updateTasks = async (req, res) => {
    try{const { id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new:true,
        runValidators : true
    });
    res.status(201).json({ task});}catch(err){
        res.status(500).json({ msg: err });
        
    }
}
const deleteTasks = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });

        if (!task) {
            res.status(404).json({ msg: `No task with id ${taskID}` })
        }
        res.status(201).json({ task : null , msg : 'success'});
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