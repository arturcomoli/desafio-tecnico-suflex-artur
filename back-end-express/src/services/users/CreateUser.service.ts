import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { IUserCreation } from "../../interfaces/users.interfaces";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";

export default class CreateUserService {
  async execute({ name, password }: IUserCreation): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { name } });

    if (user)
      throw new ApiError(
        "Invalid name, please try again with a different name."
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      password: hashedPassword,
      favorite_characters: [],
    });

    await userRepository.save(newUser);

    return newUser;
  }
}
