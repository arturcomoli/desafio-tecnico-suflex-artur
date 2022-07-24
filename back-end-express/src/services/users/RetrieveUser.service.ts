import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { IUserId } from "../../interfaces/users.interfaces";
import User from "../../models/User";

export default class RetrieveUserService {
  async execute({ id }: IUserId): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new ApiError("user nor found", 404);

    return user;
  }
}
