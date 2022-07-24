import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import User from "../../../models/User";
import RetrieveUserService from "../../../services/users/RetrieveUser.service";
import { mockUser } from "../../utils";

describe("User retrieve unit test", () => {
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
    const retrieveUserService = new RetrieveUserService();

    const user = await retrieveUserService.execute({ id: userId });

    expect(user).toBeTruthy();

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
    expect(user).toHaveProperty("password");
  });
});
