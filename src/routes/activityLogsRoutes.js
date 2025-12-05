const router = require('express').Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');

const {getAllLogs} = require('../controllers/activityLogController');

router.get("/", auth, allowRoles("Admin"), getAllLogs);

module.exports = router;