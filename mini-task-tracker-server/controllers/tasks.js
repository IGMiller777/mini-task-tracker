import { promises as fs } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

class TaskController {
    static async readTasks() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            const parsedData = JSON.parse(data);

            return parsedData.tasks;
        } catch (error) {
            console.log(error)
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }


    static async writeTasks(tasks) {
        try {
            console.log(tasks);
            await fs.mkdir(DATA_DIR, {recursive: true});

            await fs.writeFile(DATA_FILE, JSON.stringify({tasks}, null, 2), "utf8");
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskController.readTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({error: 'Ошибка получения задач'});
        }
    }

    static async createTask(req, res) {
        try {
            const {title = '', completed = false} = req.body;

            if (!title || typeof title !== 'string') {
                return res.status(400).json({error: 'Title обязателен и должен быть строкой'});
            }

            const newTask = {
                id: uuid(),
                title,
                tasks: '',
                completed,
                createdAt: new Date().toISOString()
            };


            const tasks = await TaskController.readTasks();
            console.log(tasks)

            tasks.push(newTask);

            await TaskController.writeTasks(tasks);

            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({error: 'Ошибка создания задачи'});
        }
    }

    static async updateTask(req, res) {
        try {
            const {id} = req.params;
            const updates = req.body;

            const tasks = await TaskController.readTasks();
            const taskIndex = tasks.findIndex(task => task.id === id);

            if (taskIndex === -1) {
                return res.status(404).json({error: 'Задача не найдена'});
            }

            tasks[taskIndex] = {...tasks[taskIndex], ...updates};
            await TaskController.writeTasks(tasks);

            res.json(tasks[taskIndex]);
        } catch (error) {
            res.status(500).json({error: 'Ошибка обновления задачи'});
        }
    }

    static async deleteTask(req, res) {
        try {
            const {id} = req.params;

            const tasks = await TaskController.readTasks();
            const filteredTasks = tasks.filter(task => task.id !== id);

            if (filteredTasks.length === tasks.length) {
                return res.status(404).json({error: 'Задача не найдена'});
            }

            await TaskController.writeTasks(filteredTasks);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: 'Ошибка удаления задачи'});
        }
    }
}

export default TaskController;