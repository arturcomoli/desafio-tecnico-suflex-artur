import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import * as uuid from "uuid";
import { mockChar, mockUser } from "../../utils";
import User from "../../../models/User";
import Character from "../../../models/Character";
import DeleteCharacterService from "../../../services/characters/DeleteCharacter.service";
jest.mock("uuid");

describe("User creation unit test", () => {
  let connection: DataSource;
  let userId: string;
  let charId: string;

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

    const charRepository = AppDataSource.getRepository(Character);
    const char = charRepository.create({ ...mockChar, userId });

    charId = char.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a favorite character", async () => {
    const deleteChar = new DeleteCharacterService();

    const char = await deleteChar.execute({ charId, userId });

    expect(char).toBeFalsy();
  });
});
