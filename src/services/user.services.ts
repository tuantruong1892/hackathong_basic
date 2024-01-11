import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";
class userService {
  readonly usersFilePath: string;

  constructor() {
    this.usersFilePath = path.join(__dirname, "..", "public", "users.json");
  }
  async getAllUsers(req: Request, res: Response) {
    let userdata = fs.readFileSync(path.join("public/users.json"), "utf-8");
    res.status(200).send(JSON.parse(userdata));
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    let userdata = fs.readFileSync(path.join("public/users.json"), "utf-8");
    const users = JSON.parse(userdata);
    const findUser = users.find((user: any) => user.id === userId);
    if (findUser) {
      res.status(200).json(findUser);
    } else {
      res.status(404).json({ error: "User ko cos " });
    }
  }
  async searchUser(req: Request, res: Response) {
    const userName = req.query.name;
    if (!userName) {
      return res.status(400).json({ error: "không có user" });
    }
    let db = fs.readFileSync(path.join("public/users.json"), "utf-8");
    const users = JSON.parse(db);
    const searchName = users.filter((item: any) => {
      return item.name.includes(userName);
    });

    res.status(200).json(searchName);
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const filePath = this.usersFilePath;

    try {
      const userData = await fs.promises.readFile(filePath, "utf-8");
      const users = JSON.parse(userData);
      const updatedUsers = users.filter((user: any) => user.id !== userId);
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(updatedUsers, null, 2),
        "utf-8"
      );
      res.status(200).json({ message: "Xoá user thàh công" });
    } catch (error) {
      res.status(500).json({ error: " Server Error" });
    }
  }
  validateUser(user: any): string | undefined {
    if (
      !user.name ||
      !user.email ||
      user.name.length < 3 ||
      user.name.length > 20
    ) {
      return "Không đuược để trống";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return "Email không hợp lệ";
    }
  }
}
export default userService;
