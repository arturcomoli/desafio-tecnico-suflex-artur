import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers.controller";
import {
  userLoginSchema,
  validateUserLogin,
} from "../validations/userLogin.validation";

const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  validateUserLogin(userLoginSchema),
  SessionsControllers.store
);

export default sessionsRouter;
