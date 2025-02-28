import express from "express";
import { Auth } from "../Features/Auth.js";
import { addtask, getalltask } from "../controllers/taskController.js";

const taskRoute = express.Router();

taskRoute.post("/addtask", Auth, addtask);
taskRoute.get("/gettasks", Auth, getalltask);
export default taskRoute;
