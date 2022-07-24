import { instanceToPlain } from "class-transformer";
import { Request, response, Response } from "express";
import CreateUserService from "../services/users/CreateUser.service";
import ListUserService from "../services/users/ListUsers.service";
import RetrieveUserService from "../services/users/RetrieveUser.service";
import UpdateUserService from "../services/users/UpdateUser.service";

export default class UserControllers {
  static async store(req: Request, res: Response) {
    const createUser = new CreateUserService();

    const { name, password } = req.validUser;

    const user = await createUser.execute({ name, password });

    return res.status(201).json(instanceToPlain(user));
  }
  static async index(req: Request, res: Response) {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return res.status(200).json(instanceToPlain(users));
  }
  static async show(req: Request, res: Response) {
    const retrieveUser = new RetrieveUserService();

    const { id } = req.user;

    const user = await retrieveUser.execute({ id });

    return res.status(200).json(instanceToPlain(user));
  }
  static async update(req: Request, res: Response) {
    const updateUpser = new UpdateUserService();

    const { name, password } = req.validUpdate;
    const { id } = req.user;

    const user = await updateUpser.execute({ id, name, password });

    return res.status(200).json(instanceToPlain(user));
  }
  static async delete(req: Request, res: Response) {}
}
