const router = require('express').Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const { createTask } = require('../controllers/taskController');

router.post('/', auth, allowRoles('Admin', 'Manager'), createTask);

module.exports = router;
