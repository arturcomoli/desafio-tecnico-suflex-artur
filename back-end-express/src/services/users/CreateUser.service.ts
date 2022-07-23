import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class CreateUserService {
  async execute({}): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    return null;
  }
}
