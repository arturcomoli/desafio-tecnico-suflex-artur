import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import { mockChar, mockUser } from "../../utils";
import User from "../../../models/User";
import Character from "../../../models/Character";
import DeleteCharacterService from "../../../services/characters/DeleteCharacter.service";

describe("Char creation unit test", () => {
  let connection: DataSource;
  let id: string;
  let char_id: number;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(mockUser);
    await userRepository.save(user);

    id = user.id;

    const charRepository = AppDataSource.getRepository(Character);
    const char = charRepository.create({ ...mockChar, userId: id });

    await charRepository.save(char);

    char_id = char.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to delete a favorite character", async () => {
    const deleteChar = new DeleteCharacterService();

    const char = await deleteChar.execute({ id, char_id });

    expect(char).toBeTruthy();
  });
});
