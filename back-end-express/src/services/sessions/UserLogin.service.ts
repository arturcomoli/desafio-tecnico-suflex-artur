import { AppDataSource } from "../../data-source";
import User from "../../models/User";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import {
  IReturnUserLogin,
  IUserLogin,
} from "../../interfaces/sessions.interfaces";

export default class UserLoginService {
  async execute({ name, password }: IUserLogin): Promise<IReturnUserLogin> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        name,
      },
    });

    if (!user)
      throw new ApiError(
        "Invalid name or password, please, check your credentials."
      );
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      throw new ApiError(
        "Invalid name or password, please, check your credentials."
      );

    const token = jwt.sign({}, process.env.SECRET_KEY || "default", {
      subject: user.id,
      expiresIn: "3h",
    });

    return {
      token,
      user,
    };
  }
}
