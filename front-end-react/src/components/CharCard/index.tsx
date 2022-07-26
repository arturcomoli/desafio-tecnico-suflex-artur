import { AiFillStar } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import Button from "../Button";

import InfoModal from "../InfoModal";
import { ICharCard } from "./interfaces";
import { useState } from "react";
import { useAuth } from "../../providers/Authentication";
import { useChars } from "../../providers/Characters";

const CharCard = ({ data, toDelete }: ICharCard) => {
  const [open, setOpen] = useState<boolean>(false);

  const { authToken } = useAuth();

  const { addFavoriteChars, deleteFavoriteChar } = useChars();

  const addFavorite = () => {
    addFavoriteChars(data, authToken);
    setOpen(false);
  };

  const deleteFavorite = () => {
    deleteFavoriteChar(authToken, data.id);
    setOpen(false);
  };

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <li
      className="flex flex-col items-center bg-background-card
      min-w-[265px] w-[90vw] max-w-sm px-9 py-5 gap-y-5 lg:w-[20vw]
      shadow-lg rounded-md"
    >
      <h3
        className="font-semibold text-3xl text-btn-orange break-words
        w-full truncate text-center"
      >
        {data.name}
      </h3>
      <img src={data.image} className="w-3/4" />
      <p className="text-lg text-green-txt">Status: {data.status}</p>
      <div className="w-full flex items-center justify-around">
        <Button onClick={handleModal}>Infos</Button>
        {toDelete ? (
          <BsTrashFill
            className="cursor-pointer  text-3xl text-red-500
          transition-all duration-500 hover:text-4xl"
            onClick={deleteFavorite}
          />
        ) : (
          <AiFillStar
            className="cursor-pointer  text-3xl text-yellow-500
         transition-all duration-500 hover:text-4xl"
            onClick={addFavorite}
            id="add-char"
          />
        )}
      </div>
      <InfoModal
        open={open}
        handleModal={handleModal}
        data={data}
        addFavorite={addFavorite}
        toDelete={toDelete}
        deleteFavorite={deleteFavorite}
      />
    </li>
  );
};
export default CharCard;
