import express from "express";
import tasksRouter from "./routes/tasks.js";
import cors from 'cors';
import { DEFAULT_PORT } from "./shared/constants.js";
import ROUTES from "./shared/routes.js";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || DEFAULT_PORT;
const DEFAULT_ROUTE_START = '/api'

function startApp() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    registerRoutes(app);
    startServer(app);
}


function startServer(app) {
    app.listen(PORT, () => {
        console.log(`Server listening: http://localhost:${PORT}`);
    });
}

function registerRoutes(app) {
    const apiRouter = express.Router();

    apiRouter.use(ROUTES.TASKS, tasksRouter);
    app.use(DEFAULT_ROUTE_START, apiRouter);
}

export { startApp };
