import "reflect-metadata";
import express from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";

import ErrorHandlingMiddleware from "./middlewares/ErrorHandling.middleware";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Desafio Full-stack Suflex!!");
});
app.use(routes);
app.use(ErrorHandlingMiddleware);

export default app;
