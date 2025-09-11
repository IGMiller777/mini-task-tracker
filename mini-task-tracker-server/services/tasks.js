import { v4 as uuid } from "uuid";
import TaskRepository from "../repositories/tasks.js";

class TaskService {
    static async getAllTasks() {
        return await TaskRepository.findAll();
    }

    static async createTask(taskData) {
        const { title, completed = false } = taskData;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string');
        }

        const newTask = {
            id: uuid(),
            title: title.trim(),
            completed: Boolean(completed),
            createdAt: new Date().toISOString()
        };

        return await TaskRepository.save(newTask);
    }

    static async updateTask(id, updates) {
        const existingTask = await TaskRepository.findById(id);
        if (!existingTask) {
            throw new Error('Task not found');
        }

        const allowedFields = ['title', 'completed'];
        const filteredUpdates = {};

        for (const [key, value] of Object.entries(updates)) {
            if (allowedFields.includes(key)) {
                if (key === 'title' && (typeof value !== 'string' || value.trim() === '')) {
                    throw new Error('Title must be a non-empty string');
                }
                if (key === 'completed' && typeof value !== 'boolean') {
                    throw new Error('Completed must be a boolean');
                }
                filteredUpdates[key] = key === 'title' ? value.trim() : value;
            }
        }

        if (Object.keys(filteredUpdates).length === 0) {
            throw new Error('No valid fields to update');
        }

        filteredUpdates.updatedAt = new Date().toISOString();

        return await TaskRepository.updateById(id, filteredUpdates);
    }

    static async deleteTask(id) {
        const deleted = await TaskRepository.deleteById(id);
        if (!deleted) {
            throw new Error('Task not found');
        }
        return true;
    }
}

export default TaskService;