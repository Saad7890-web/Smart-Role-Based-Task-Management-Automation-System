const router = require('express').Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const { createTask, getAllTasksByProjectId } = require('../controllers/taskController');

router.post('/', auth, allowRoles('Admin', 'Manager'), createTask);
router.post('/', auth, allowRoles('Admin', 'Manager'), getAllTasksByProjectId);

module.exports = router;
