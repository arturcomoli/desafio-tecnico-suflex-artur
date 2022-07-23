import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import User from "../../../models/User";
import DeleteUserService from "../../../services/users/DeleteUser.service";
import { mockUser } from "../../utils";

describe("User delete unit test", () => {
  let connection: DataSource;
  let userId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(mockUser);
    await userRepository.save(user);

    userId = user.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to retrieve user data", async () => {
    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute({ userId });

    expect(user).toBeFalsy();
  });
});
