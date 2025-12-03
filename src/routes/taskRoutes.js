const router = require('express').Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const { createTask, getAllTasksByProjectId, getMyTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');

router.post('/', auth, allowRoles('Admin', 'Manager'), createTask);
router.get('/project/:project_id', auth, allowRoles('Admin', 'Manager'), getAllTasksByProjectId);
router.get('/my-task', auth, allowRoles('Employee'), getMyTasks);
router.patch('/status/:id', auth, allowRoles('Employee', 'Admin', 'Manager'), updateTaskStatus);
router.delete('/:id', auth, allowRoles('Admin', 'Manager'), deleteTask);

module.exports = router;
