const router = require('express').Router();
const auth = require('../middleware/auth');

const {getAllNotifications, updateNotificationStatus} = require('../controllers/notificationController')


router.get("/", auth, getAllNotifications);
router.patch("/:id/read", auth, updateNotificationStatus);


module.exports = router;