export interface ICharacterCreation {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ICharJSON;
  location: ICharJSON;
  image: string;
  episode: string[];
  url: string;
  created: string;
  userId: string;
}

export interface ICharJSON {
  name: string;
  url: string;
}

export interface ICharId {
  char_id: number;
}
