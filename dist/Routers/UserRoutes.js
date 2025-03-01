import express from "express";
import { getUserDetails, userLogin, userLogout, userRegister, } from "../controllers/userController.js";
import { Auth } from "../Features/Auth.js";
const UserRoute = express.Router();
UserRoute.post("/register", userRegister);
UserRoute.post("/login", userLogin);
UserRoute.get("/details", Auth, getUserDetails);
UserRoute.get("/logout", Auth, userLogout);
export default UserRoute;
