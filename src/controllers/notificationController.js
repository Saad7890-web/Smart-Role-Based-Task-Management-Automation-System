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


const updateNotificationStatus = async (req, res) => {
    try {
        const result = await db.query(
            `UPDATE notifications
            SET is_read = true
            WHERE id = $1 AND user_id = $2
            RETURNING *`,
            [req.params.id, req.user.id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({message:"Not found"});
        }
        res.json({message: "marked as read", notification: res.result.rows[0]});
    }
    catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update notification" });
  }
}


module.exports = {
    getAllNotifications,
    updateNotificationStatus,
}