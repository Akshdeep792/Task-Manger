const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {getAllTasks, createTasks, getTasks, updateTasks, deleteTasks} = require('../controllers/tasks');



router.route('/').get(getAllTasks).post(createTasks);
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks);

module.exports = router