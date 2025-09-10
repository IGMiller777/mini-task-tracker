import express from "express";
import tasksRouter from "./routes/tasks.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`);
});
