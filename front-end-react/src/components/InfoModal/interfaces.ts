import { ICharRetrieve } from "../../pages/interfaces";
import { ICharCard } from "../CharCard/interfaces";

export interface IModalProps {
  open: boolean;
  data: ICharRetrieve;
  handleModal: () => void;
  addFavorite: () => void;
  toDelete?: boolean;
  deleteFavorite: () => void;
}
