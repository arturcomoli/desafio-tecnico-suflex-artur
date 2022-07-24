import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { IUserId, IUserUpdate } from "../../interfaces/users.interfaces";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";

export default class UpdateUserService {
  async execute({ id, name, password }: IUserUpdate): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    const checkName = await userRepository.findOne({
      where: {
        name,
      },
    });

    if (!user) throw new ApiError("user not found.", 404);

    if (name) {
      if (checkName)
        throw new ApiError("invalid name, please try a different one.");
      name ? (user.name = name) : user.name;
    }

    if (password) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword)
        throw new ApiError(
          "Please, provide a different password than your current one."
        );

      user.password = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);

    return user;
  }
}
