import { Router } from "express";
import CharacterControllers from "../controllers/CharacterControllers.controller";

const characterRouter = Router();

characterRouter.post("/", CharacterControllers.store);
characterRouter.get("/", CharacterControllers.index);

export default characterRouter;
