import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import roadMapRoutes from "./routes/roadmapRoutes.js";

dotenv.config();

const port = process.env.PORT
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use('/api/roadmaps', roadMapRoutes);

app.listen(port, () => {
    console.log(`Server is Up At http://localhost:${port}/`)
})