const db = require("../config/db");


const getAllLogs = async(req, res) => {
    try{
        const logs = await db.query(
            `SELECT activity_logs.*, users.username 
             FROM activity_logs
             LEFT JOIN users ON users.id = activity_logs.user_id
             ORDER BY created_at DESC`
        );
        res.json(logs);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Failed to fetch activity logs" });
    }
}

module.exports = {
    getAllLogs,
};