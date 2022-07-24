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
userRouter.get("/", UserControllers.show);
userRouter.get("/all", UserControllers.index);
userRouter.patch("/", UserControllers.update);
userRouter.delete("/", UserControllers.delete);

export default userRouter;
