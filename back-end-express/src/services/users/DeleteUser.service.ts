import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { IUserId } from "../../interfaces/users.interfaces";
import User from "../../models/User";

export default class DeleteUserService {
  async execute({ id }: IUserId): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new ApiError("user not found", 404);

    await userRepository.delete(user.id);

    return true;
  }
}
