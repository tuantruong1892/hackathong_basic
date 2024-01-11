import express, { Request, Response } from "express";
import userService from "../services/user.services";
import checkEmail from "../middleware/checkEmail";

const userController = express.Router();
const UserService = new userService();
userController.get("/", UserService.getAllUsers);
userController.get("/:id", UserService.getUserById);
userController.get("/search", checkEmail, UserService.searchUser);
userController.get("/:id", UserService.deleteUser);

export default userController;
