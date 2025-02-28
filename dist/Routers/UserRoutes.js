import express from "express";
import { userLogin, userLogout, userRegister, } from "../controllers/userController.js";
import { Auth } from "../Features/Auth.js";
const UserRoute = express.Router();
UserRoute.post("/register", userRegister);
UserRoute.post("/login", userLogin);
UserRoute.get("/logout", Auth, userLogout);
export default UserRoute;
