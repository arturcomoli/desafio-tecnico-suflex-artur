import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class ListUserService {
  async execute(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return users;
  }
}
