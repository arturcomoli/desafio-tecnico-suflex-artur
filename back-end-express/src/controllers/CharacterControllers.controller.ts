import { Request, Response } from "express";
import CreateCharacterService from "../services/characters/CreateCharacter.service";
import DeleteCharacterService from "../services/characters/DeleteCharacter.service";
import ListCharactersService from "../services/characters/ListCharacters.service";
import RetrieveCharacterService from "../services/characters/RetrieveCharacter.service";
export default class CharacterControllers {
  static async store(req: Request, res: Response) {
    const createChar = new CreateCharacterService();

    const { id } = req.user;

    const {
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
    } = req.body;

    const newChar = await createChar.execute({
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
      userId: id,
    });

    return res.status(201).json(newChar);
  }
  static async index(req: Request, res: Response) {
    const listCharacters = new ListCharactersService();

    const characters = await listCharacters.execute();

    return res.status(200).json(characters);
  }
  static async show(req: Request, res: Response) {
    const retrieveChar = new RetrieveCharacterService();

    const { char_id } = req.params;

    const convertedId = Number(char_id);

    const char = await retrieveChar.execute({ char_id: convertedId });

    return res.status(200).json(char);
  }
  static async delete(req: Request, res: Response) {
    const deleteChar = new DeleteCharacterService();

    const { id } = req.user;
    const { char_id } = req.params;

    const convertedId = Number(char_id);

    await deleteChar.execute({ id, char_id: convertedId });

    return res.status(204).json();
  }
}
