import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";

import * as uuid from "uuid";
import CreateUserService from "../../services/users/CreateUser.service";
jest.mock("uuid");

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
    const uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue("some-uuid");

    const mockUser = { nome: "usuario", senha: "teste" };
    const createUser = new CreateUserService();

    const user = await createUser.execute(mockUser);

    expect(user).toBeTruthy();

    expect(uuidSpy).toHaveBeenCalled();

    expect(user.id).toEqual("some-uuid");
    expect(user.nome).toEqual(mockUser.nome);

    expect(user).toHaveProperty("senha");
  });
});
