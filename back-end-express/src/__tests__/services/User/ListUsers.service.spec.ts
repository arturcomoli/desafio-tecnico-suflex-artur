import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import User from "../../../models/User";
import ListUserService from "../../../services/users/ListUsers.service";
import RetrieveUserService from "../../../services/users/RetrieveUser.service";
import { mockUser } from "../../utils";

describe("User retrieve unit test", () => {
  let connection: DataSource;
  let usersArr: User[] = [];

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
    const userRepository = AppDataSource.getRepository(User);

    for (let i = 0; i < 15; i++) {
      const mockUser = {
        name: `mock ${i}`,
        password: "password",
      };
      const user = userRepository.create(mockUser);
      await userRepository.save(user);
      usersArr.push(user);
    }
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to retrieve a list of users", async () => {
    const retrieveUserService = new ListUserService();

    const users = await retrieveUserService.execute();

    expect(users).toHaveProperty("map");
    expect(users.length).toEqual(usersArr.length);
  });
});
