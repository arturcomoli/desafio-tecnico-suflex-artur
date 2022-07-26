import { ChangeEvent, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../../../components/Button";

const SearchInput = ({}) => {
  const [species, setSpecies] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [checkedHuman, setCheckedHuman] = useState<boolean>(false);
  const [checkedAlien, setCheckedAlien] = useState<boolean>(false);

  const changeEventHuman = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (checkedHuman) return setCheckedHuman(false);
      setCheckedHuman(true);
      setSpecies(event.target.value);
      setCheckedAlien(false);
    },
    [species]
  );

  const changeEventAlien = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (checkedAlien) return setCheckedAlien(false);
      setCheckedAlien(true);
      setSpecies(event.target.value);
      setCheckedHuman(false);
    },
    [species]
  );

  const changeEventName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name]
  );

  return (
    <aside className="w-full flex flex-col md:flex-row gap-5 items-center justify-center">
      <div
        className="flex items-center bg-bg-aqua p-2 rounded-md border-2 border-transparent
     focus-within:border-btn-orange transition-colors duration-500"
      >
        <input
          className="bg-transparent flex-1 outline-none text-blue-txt text-lg"
          onChange={changeEventName}
        />
        <FaSearch
          className="cursor-pointer text-xl text-btn-orange hover:brightness-125 
      transition-all duration-500"
        />
      </div>
      <div className="flex w-full sm:w-1/4 justify-around ">
        <div className="group flex flex-col">
          <input
            type="checkbox"
            id="human"
            name="species"
            value="human"
            checked={checkedHuman}
            onChange={changeEventHuman}
          />
          <label htmlFor="human">Humanos</label>
        </div>
        <div className="group flex flex-col">
          <input
            type="checkbox"
            id="alien"
            name="species"
            value="alien"
            checked={checkedAlien}
            onChange={changeEventAlien}
          />
          <label htmlFor="alien">Aliens</label>
        </div>
      </div>
    </aside>
  );
};
export default SearchInput;
