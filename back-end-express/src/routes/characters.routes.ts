import { Router } from "express";
import CharacterControllers from "../controllers/CharacterControllers.controller";
import ensureJWTMiddleware from "../middlewares/EnsureJWT.middleware";

const characterRouter = Router();

characterRouter.get("/all", CharacterControllers.index);
characterRouter.get("/:char_id", CharacterControllers.show);

characterRouter.use(ensureJWTMiddleware);
characterRouter.post("/", CharacterControllers.store);
characterRouter.delete("/:char_id", CharacterControllers.delete);

export default characterRouter;
