const db = require("../config/db");
const notifyUser = require("../utils/notify");
const logActivity = require("../utils/activityLog");


const createTask = async (req, res) => {
    const {project_id, assigned_to, title, description, prioriy, deadline} = req.body;

    try {
        const result = await db.query(
            `INSERT INTO tasks (project_id, assigned_to,  created_by, title, description, prioriy, deadline)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [project_id, assigned_to,  req.user.id, title, description, prioriy, deadline]
        )

        await notifyUser(assigned_to, "New Task Assigned", `You Have Been Assigned a new task ${title}`);
        await logActivity(req.user.id, "TASK_CREATED", `Task created: ${title}`);
        res.status(201).json({task: result.rows[0]});
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Task creation failed"});
    }
};

const getAllTasksByProjectId = async (req, res) => {
    try{
        const result = await db.query(
        `SELECT t.*, u.username AS assigned_user 
         FROM tasks t
         LEFT JOIN users u ON t.assigned_to = u.id
         WHERE t.project_id = $1 AND t.is_active = true`
         [req.params.project_id]
        );

        res.status(200).json({tasks:result.rows});
    } catch (err){
        console.error(err);
        res.status(500).json({message: "Failed to retrieve tasks"});
    }
}

const getMyTasks = async(req, res) => {
    try {
      const result = await db.query(
        `SELECT *
         FROM tasks
         WHERE assigned_to = $1 AND is_active = true`,
        [req.user.id]
      );

      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch employee tasks" });
    }
  
}

const updateTaskStatus = async (req, res) => {
     try {
      const result = await db.query(
        `UPDATE tasks 
         SET status = $1, updated_at = NOW()
         WHERE id = $2 AND assigned_to = $3
         RETURNING *`,
        [status, req.params.id, req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Task not found or not yours" });
      }
      await notifyUser(req.user.id, "Task Status Updated", `Your task status is now: ${status}`);
      await logActivity(req.user.id, "TASK_STATUS", `Task ID ${id} status changed to ${status}`);

      res.json({ message: "Task updated", task: result.rows[0] });
     
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update task status" });
    }
}

const deleteTask = async (req, res) => {
      try {
      const result = await db.query(
        `UPDATE tasks
         SET is_active = false, updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [req.params.id]
      );
      await logActivity(req.user.id, "TASK_DELETED", `Task ID ${id} deleted`);

      res.json({ message: "Task deleted", task: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Task deletion failed" });
    }
}


module.exports = {
    createTask,
    getAllTasksByProjectId,
    getMyTasks,
    updateTaskStatus,
    deleteTask,
}

