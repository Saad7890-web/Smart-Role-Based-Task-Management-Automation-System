const router = require('express').Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const { createTask, getAllTasksByProjectId, getMyTasks, updateTaskStatus } = require('../controllers/taskController');

router.post('/', auth, allowRoles('Admin', 'Manager'), createTask);
router.get('/project/:project_id', auth, allowRoles('Admin', 'Manager'), getAllTasksByProjectId);
router.get('/my-task', auth, allowRoles('Employee'), getMyTasks);
router.patch('/status/:id', auth, allowRoles('Employee'), updateTaskStatus);

module.exports = router;
