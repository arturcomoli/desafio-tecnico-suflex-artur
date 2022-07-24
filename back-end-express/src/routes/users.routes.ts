import { Router } from "express";
import UserControllers from "../controllers/UserControllers.controller";
import {
  createAccountSchema,
  validateUserCreation,
} from "../validations/userCreation.validation";

const userRouter = Router();

userRouter.post(
  "/",
  validateUserCreation(createAccountSchema),
  UserControllers.store
);

export default userRouter;
