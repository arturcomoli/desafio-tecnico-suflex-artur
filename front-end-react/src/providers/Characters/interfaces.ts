import { ReactNode } from "react";
import { ICharData, ICharRetrieve } from "../../pages/interfaces";

export interface CharProviderProps {
  children: ReactNode;
}

export interface CharProviderData {
  chars: ICharRetrieve[];
  favChars: ICharRetrieve[];
  filteredChars: ICharRetrieve[];
  owner: string;
  maxPages: number;
  update: boolean;
  filterChars: ({ filterPage, name, species }: ICharFilter) => void;
  cleanFilters: () => void;
  handleUpdate: () => void;
  retrieveCharsHome: (page: number) => void;
  addFavoriteChars: (data: ICharData, token: string) => void;
  retrieveFavoriteChars: (token: string) => void;
  deleteFavoriteChar: (token: string, id: number) => void;
}

export interface ICharFilter {
  filterPage: number;
  name: string;
  species: string;
}
