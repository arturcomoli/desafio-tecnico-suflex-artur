import { instanceToPlain } from "class-transformer";
import { Request, response, Response } from "express";
import CreateUserService from "../services/users/CreateUser.service";

export default class UserControllers {
  static async store(req: Request, res: Response) {
    const { name, password } = req.validUser;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, password });

    return res.status(201).json(instanceToPlain(user));
  }
  static async index(req: Request, res: Response) {}
  static async show(req: Request, res: Response) {}
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
