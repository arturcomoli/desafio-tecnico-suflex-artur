import { AppDataSource } from "../../data-source";
import Character from "../../models/Character";

export default class ListCharactersService {
  async execute(): Promise<Character[]> {
    const charRepository = AppDataSource.getRepository(Character);
    const characters = await charRepository.find();
    return characters;
  }
}
