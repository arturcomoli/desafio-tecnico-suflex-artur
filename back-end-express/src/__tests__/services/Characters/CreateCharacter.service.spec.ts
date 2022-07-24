import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import User from "../../../models/User";
import CreateCharacterService from "../../../services/characters/CreateCharacter.service";

import { mockChar, mockUser } from "../../utils";

describe("User creation unit test", () => {
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

  test("Should be able to create a favorite character", async () => {
    const createChar = new CreateCharacterService();

    const char = await createChar.execute({ ...mockChar, userId });

    expect(char).toHaveProperty("id");
    expect(char).toHaveProperty("name");
    expect(char).toHaveProperty("status");
    expect(char).toHaveProperty("species");
    expect(char).toHaveProperty("type");
    expect(char).toHaveProperty("gender");
    expect(char).toHaveProperty("origin");
    expect(char).toHaveProperty("location");
    expect(char).toHaveProperty("image");
    expect(char).toHaveProperty("episode");
    expect(char).toHaveProperty("url");
    expect(char).toHaveProperty("created");
    expect(char).toHaveProperty("userId");
  });
});
