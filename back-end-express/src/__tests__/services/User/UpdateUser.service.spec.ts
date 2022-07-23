import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import User from "../../../models/User";
import UpdateUserService from "../../../services/users/UpdateUser.service";
import { mockUser, newData } from "../../utils";

describe("User update unit test", () => {
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

  test("Should be able to update an existing user", async () => {
    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute({ ...newData, userId });

    expect(updatedUser).toBeTruthy();

    expect(updatedUser).toHaveProperty("id");
    expect(updatedUser).toHaveProperty("name");
    expect(updatedUser).toHaveProperty("password");
    expect(updatedUser).toHaveProperty("updated_at");

    expect(updatedUser.name).toEqual(newData.name);
  });
});
