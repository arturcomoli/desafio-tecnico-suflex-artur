import { AppDataSource } from "../../data-source";
import Character from "../../models/Character";

export default class DeleteCharacterService {
  async execute({}): Promise<Character> {
    const charRepository = AppDataSource.getRepository(Character);
    return null;
  }
}
