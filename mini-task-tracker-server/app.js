import express from "express";
import tasksRouter from "./routes/tasks.js";
import cors from 'cors';
import * as dotenv from "dotenv";
import { DEFAULT_PORT } from "./shared/constants.js";
import ROUTES from "./shared/routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(ROUTES.TASKS, tasksRouter);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`);
});
