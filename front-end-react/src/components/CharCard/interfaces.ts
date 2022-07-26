import { ICharData, ICharRetrieve } from "../../pages/interfaces";

export interface ICharCard extends IDeleteChar {
  data: ICharRetrieve;
}

export interface IDeleteChar {
  toDelete?: boolean;
  chars?: ICharRetrieve[];
}
