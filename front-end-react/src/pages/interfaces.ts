export interface ICharData {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: JSONChar;
  location: JSONChar;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharRetrieve extends ICharData {
  id: number;
}

interface JSONChar {
  name: string;
  url: string;
}
