import express, { urlencoded } from "express";
import * as fs from "fs";
import * as path from "path";
import Router from "./controller/index";
const app = express();
const PORT = 8000;
app.use(express.static(path.join("public")));
app.use(urlencoded());

Router(app);
app.listen(PORT, () => {
  console.log("server ddang chay");
});
