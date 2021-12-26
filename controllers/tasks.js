const Task = require('../models/task');


const getAllTasks = (req, res) => {
    res.send('All items');
}
const createTasks = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
}
const getTasks = (req, res) => {
    res.json({ id: req.params.id });
}
const updateTasks = (req, res) => {
    res.send('Update items');
}
const deleteTasks = (req, res) => {
    res.send('Deleteitems');
}

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}