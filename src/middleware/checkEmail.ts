import { NextFunction, Response, Request } from "express";
import * as fs from "fs";
import * as path from "path";
const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  let data = fs.readFileSync(path.join("public/user.json"), "utf-8");
  const newUser = req.body;
  const users = JSON.parse(data);
  const findUser = users.find((user: any) => user.email === newUser.email);
  if (findUser) {
    res.json({ msg: "user already exist" });
  } else {
    next();
  }
};

export default checkEmail;
