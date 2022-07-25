import { AiFillStar } from "react-icons/ai";
import Button from "../Button";

import rick_morty from "../../assets/rick_morty.jpeg";

const CharCard = () => {
  return (
    <li
      className="flex flex-col items-center bg-background-card
      min-w-[265px] w-[90vw] max-w-80 px-9 py-5 mr-5 gap-y-5 lg:w-[20vw]
      shadow-lg rounded-md"
    >
      <h3
        className="font-semibold text-3xl text-btn-orange break-words
        w-full truncate "
      >
        Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      </h3>
      <img src={rick_morty} className="w-3/4" />
      <p className="text-lg text-green-txt">Status: Alive</p>
      <div className="w-full flex items-center justify-around">
        <Button>Infos</Button>
        <AiFillStar className="cursor-pointer  text-3xl text-yellow-500 transition-all duration-500 hover:text-4xl" />
      </div>
    </li>
  );
};
export default CharCard;
