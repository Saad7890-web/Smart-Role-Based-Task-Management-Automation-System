const router = require('express').Router();
const auth = require('../middleware/auth');

const {getAllNotifications} = require('../controllers/notificationController')


router.get("/", auth, getAllNotifications);

