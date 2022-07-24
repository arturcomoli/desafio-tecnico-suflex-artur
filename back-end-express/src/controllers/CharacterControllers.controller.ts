import { Request, Response } from "express";
import CreateCharacterService from "../services/characters/CreateCharacter.service";
import ListCharactersService from "../services/characters/ListCharacters.service";
export default class CharacterControllers {
  static async store(req: Request, res: Response) {
    const createChar = new CreateCharacterService();

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
      id,
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
  static async show(req: Request, res: Response) {}
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
