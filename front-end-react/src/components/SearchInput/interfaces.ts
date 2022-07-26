import { Dispatch, SetStateAction } from "react";

export interface ISearchInput {
  filterPage: number;
  setFilterPage: Dispatch<SetStateAction<number>>;
}
