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
}
