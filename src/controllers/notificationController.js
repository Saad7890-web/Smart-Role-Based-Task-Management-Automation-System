const db = require("../config/db");


const getAllNotifications = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM notifications
            WHERE user_id = $1
            ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json(result.rows);
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Failed to fetch notifications"});
    }
}


module.exports = {
    getAllNotifications,
}