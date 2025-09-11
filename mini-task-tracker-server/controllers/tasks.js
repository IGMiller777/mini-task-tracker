import TaskService from "../services/tasks.js";

class TaskController {
    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();

            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Getting tasks error' });
        }
    }

    static async createTask(req, res) {
        try {
            const task = await TaskService.createTask(req.body);

            res.status(201).json(task);
        } catch (error) {
            if (error.message.includes('Title is required')) {
                return res.status(400).json({ error: error.message });
            }

            res.status(500).json({ error: 'Error creating task' });
        }
    }

    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updatedTask = await TaskService.updateTask(id, req.body);

            res.json(updatedTask);
        } catch (error) {
            if (error.message === 'Task not found') {
                return res.status(404).json({ error: error.message });
            }

            if (error.message.includes('must be') || error.message.includes('No valid fields')) {
                return res.status(400).json({ error: error.message });
            }

            res.status(500).json({ error: 'Error updating task' });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await TaskService.deleteTask(id);

            res.status(204).send();
        } catch (error) {
            if (error.message === 'Task not found') {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: 'Error deleting task' });
        }
    }
}

export default TaskController;