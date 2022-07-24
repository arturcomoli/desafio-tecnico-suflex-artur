import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { ICharId } from "../../interfaces/characters.interfaces";
import Character from "../../models/Character";

export default class RetrieveCharacterService {
  async execute({ char_id }: ICharId): Promise<Character> {
    const charRepository = AppDataSource.getRepository(Character);

    const char = await charRepository.findOne({
      where: {
        id: char_id,
      },
    });

    if (!char) throw new ApiError("character not found.", 404);

    return char;
  }
}
