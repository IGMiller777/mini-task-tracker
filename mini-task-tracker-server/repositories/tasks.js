import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

class TaskRepository {
    static async readTasks() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            const parsedData = JSON.parse(data);
            return parsedData.tasks || [];
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async writeTasks(tasks) {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify({ tasks }, null, 2), "utf8");
    }

    static async findAll() {
        return await this.readTasks();
    }

    static async save(task) {
        const tasks = await this.readTasks();
        tasks.push(task);

        await this.writeTasks(tasks);

        return task;
    }

    static async findById(id) {
        const tasks = await this.readTasks();

        return tasks.find(task => task.id === id) || null;
    }

    static async updateById(id, updates) {
        const tasks = await this.readTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return null;
        }

        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };

        await this.writeTasks(tasks);

        return tasks[taskIndex];
    }

    static async deleteById(id) {
        const tasks = await this.readTasks();
        const initialLength = tasks.length;
        const filteredTasks = tasks.filter(task => task.id !== id);

        if (filteredTasks.length === initialLength) {
            return false;
        }

        await this.writeTasks(filteredTasks);

        return true;
    }
}

export default TaskRepository;