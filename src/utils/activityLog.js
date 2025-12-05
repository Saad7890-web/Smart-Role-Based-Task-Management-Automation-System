const db = require('../config/db');

const logActivity = async (userId, action, description)=> {
    try{
        await db.query(
            `INSERT INTO activity_logs (user_id, action, description)
            VALUES($1, $2, $3)`,
            [userId, action, description]
        );


    }catch(err){
        console.error(err);

    }
}

module.exports = logActivity;