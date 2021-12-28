const { TooManyAttemptsError } = require('passport-local-mongoose/lib/errors');
const Tasks = require('../models/task');
const asyncWrapper = require('../middlewares/async-wrapper');

const getAllTasks = asyncWrapper(async (req, res) => {

    const tasks = await Tasks.find({});
    res.status(200).json({ tasks })

})
const createTasks = asyncWrapper(async (req, res) => {

    const tasks = await Tasks.create(req.body);
    res.status(201).json({ tasks });


})
const getTasks = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const tasks = await Tasks.findOne({ _id: taskID });

    if (!tasks) {
        res.status(404).json({ msg: `No tasks with id ${taskID}` })
    }
    res.status(201).json({ tasks });


})
const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const tasks = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });
    res.status(201).json({ tasks });
})
const deleteTasks = asyncWrapper( async (req, res) => {
    
        const { id: taskID } = req.params;
        const tasks = await Tasks.findOneAndDelete({ _id: taskID });

        if (!tasks) {
            res.status(404).json({ msg: `No tasks with id ${taskID}` })
        }
        res.status(201).json({ tasks: null, msg: 'success' });
    
}
)
module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}