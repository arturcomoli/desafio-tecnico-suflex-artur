import { Router } from "express";
import characterRouter from "./characters.routes";
import sessionsRouter from "./sessions.routes";
import userRouter from "./users.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/login", sessionsRouter);
routes.use("/characters", characterRouter);

export default routes;
