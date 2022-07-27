import { AppDataSource } from "../../data-source";
import ApiError from "../../errors/ApiError";
import { ICharacterCreation } from "../../interfaces/characters.interfaces";
import { IUserId } from "../../interfaces/users.interfaces";
import Character from "../../models/Character";

export default class CreateCharacterService {
  async execute({
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    url,
    created,
    userId,
  }: ICharacterCreation): Promise<Character> {
    const charRepository = AppDataSource.getRepository(Character);

    const char = await charRepository.findOne({
      where: {
        name,
        userId,
      },
    });

    if (char)
      throw new ApiError("You already have this character in your list!");

    const newChar = charRepository.create({
      name,
      status,
      species,
      type,
      gender,
      origin,
      location,
      image,
      episode,
      url,
      created,
      userId,
    });

    await charRepository.save(newChar);

    return newChar;
  }
}
