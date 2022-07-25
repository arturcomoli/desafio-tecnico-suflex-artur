import { ReactNode } from "react";

export interface CharProviderProps {
  children: ReactNode;
}

export interface CharProviderData {}

export interface ICharFilter {
  page: number;
  name: string;
  species: string;
}
