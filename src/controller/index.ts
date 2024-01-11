import { Express } from "express";
import userController from "./user.controller";
const Router = (app: Express) => {
  app.use("/api/v1/users", userController);
};
export default Router;
