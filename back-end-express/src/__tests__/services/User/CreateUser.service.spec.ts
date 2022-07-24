import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import { mockUserService } from "../../utils";
import CreateUserService from "../../../services/users/CreateUser.service";

describe("User creation unit test", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const createUser = new CreateUserService();

    const user = await createUser.execute(mockUserService);

    expect(user).toBeTruthy();

    expect(user.name).toEqual(mockUserService.name);

    expect(user).toHaveProperty("password");
  });
});
