import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookiparser from "cookie-parser";
import cors from "cors";
import UserRoute from "./Routers/UserRoutes.js";
import { errorHandlerMiddleware } from "./utils/errorHandlerMiddleware.js";
import taskRoute from "./Routers/taskRoutes.js";
//configure env environment
dotenv.config({ path: path.join(path.resolve(), "./src/config/.env") });
const app = express();
//cors
app.use(cors({
    origin: [String(process.env.FRONTEND)], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies & credentials
}));
//middler wares
app.use(express.json());
app.use(cookiparser());
//routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/task", taskRoute);
//error handler
app.use(errorHandlerMiddleware);
export default app;
