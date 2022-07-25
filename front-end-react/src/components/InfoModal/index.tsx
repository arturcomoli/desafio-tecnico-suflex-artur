import { AiFillCloseCircle } from "react-icons/ai";

import { IModalProps } from "./interfaces";
import rick_morty from "../../assets/rick_morty.jpeg";

const InfoModal = ({ open }: IModalProps) => {
  return (
    <div
      className={`z-auto ${open ? "block" : "hidden"} fixed top-0
    left-0 h-screen w-screen bg-gray-800 bg-opacity-10`}
    >
      <div
        className="fixed w-11/12 md:w-2/3 max-w-xl h-auto
        top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-2xl flex flex-col items-center justify-center bg-background-card
        px-9 py-5 mr-5 gap-y-5 shadow-lg"
      >
        <div className="w-full">
          <AiFillCloseCircle
            className="float-right text-2xl cursor-pointer transition-all duration-500
             text-red-400 hover:text-red-300"
          />
        </div>
        <h3
          className="font-semibold text-3xl text-btn-orange break-words
        truncate w-full"
        >
          Nomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        </h3>

        <img src={rick_morty} className="w-1/2" />
        <div className="w-full grid grid-cols-2 text-center gap-y-1">
          <p className=" sm:text-xl font-bold text-green-txt">
            Status: <span className="font-normal ">Alive</span>
          </p>
          <p className=" sm:text-xl font-bold text-green-txt">
            Espécie: <span className="font-normal ">Human</span>
          </p>
          <p className=" sm:text-xl font-bold text-green-txt">
            Episódios: <span className="font-normal ">3</span>
          </p>
          <p className=" sm:text-xl font-bold text-green-txt">
            Origem: <span className="font-normal ">Terra</span>
          </p>
          <p className=" sm:text-xl font-bold text-green-txt">
            Casa: <span className="font-normal ">Terra</span>
          </p>
          <p className=" sm:text-xl font-bold text-green-txt">
            Criado em: <span className="font-normal ">28/08/1996</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
