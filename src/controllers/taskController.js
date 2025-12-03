const db = require("../config/db");

const createTask = async (req, res) => {
    const {project_id, assigned_to, title, description, prioriy, deadline} = req.body;

    try {
        const result = await db.query(
            `INSERT INTO tasks (project_id, assigned_to,  created_by, title, description, prioriy, deadline)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [project_id, assigned_to,  req.user.id, title, description, prioriy, deadline]
        )
        req.status(201).json({task: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Task creation failed"});
    }
};

module.exports = {
    createTask,
}

