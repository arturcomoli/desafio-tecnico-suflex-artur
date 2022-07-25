import { Router } from "express";
import UserControllers from "../controllers/UserControllers.controller";
import ensureJWTMiddleware from "../middlewares/EnsureJWT.middleware";
import {
  createAccountSchema,
  validateUserCreation,
} from "../validations/userCreation.validation";
import {
  validateUserUpdate,
  updateAccountSchema,
} from "../validations/userUpdate.validation";

const userRouter = Router();

userRouter.post(
  "/",
  validateUserCreation(createAccountSchema),
  UserControllers.store
);

userRouter.use(ensureJWTMiddleware);

userRouter.get("/", UserControllers.show);
userRouter.get("/all", UserControllers.index);
userRouter.patch(
  "/",
  validateUserUpdate(updateAccountSchema),
  UserControllers.update
);
userRouter.delete("/", UserControllers.delete);

export default userRouter;
