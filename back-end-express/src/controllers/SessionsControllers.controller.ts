import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import UserLoginService from "../services/sessions/UserLogin.service";
export default class SessionsControllers {
  static async store(req: Request, res: Response) {
    const userLogin = new UserLoginService();

    const { name, password } = req.validUser;

    const login = await userLogin.execute({ name, password });

    return res.status(200).json(instanceToPlain(login));
  }
  static async index(req: Request, res: Response) {}
  static async show(req: Request, res: Response) {}
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
