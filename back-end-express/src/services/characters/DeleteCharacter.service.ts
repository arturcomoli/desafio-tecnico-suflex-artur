import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { ICharDeletion } from "../../interfaces/characters.interfaces";
import Character from "../../models/Character";

export default class DeleteCharacterService {
  async execute({ id, char_id }: ICharDeletion): Promise<boolean> {
    const charRepository = AppDataSource.getRepository(Character);

    const char = await charRepository.findOne({
      where: {
        id: char_id,
      },
    });

    if (!char) throw new ApiError("character not found", 404);

    if (char.userId !== id)
      throw new ApiError(
        "You do not have permission to perform this action.",
        403
      );

    await charRepository.delete(char.id);

    return true;
  }
}
