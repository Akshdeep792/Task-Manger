const getAllTasks = (req, res) => {
    res.send('All items');
}
const createTasks = (req, res) => {
    res.json(req.body);
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