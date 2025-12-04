const db = require('../config/db');

const notifyUser = async (userId, title, message) => {
    try{
        await db.query(
            `INSERT INTO notifications (user_id, title, message)
            VALUES($1,$2,$3)`,
            [userId, title, message]
        );
    } catch(err) {
        console.error("Notification Error: ", err);
    }
};

module.exports = notifyUser;