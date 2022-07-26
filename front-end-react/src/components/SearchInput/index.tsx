import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../Button";
import { useChars } from "../../providers/Characters";
import { ISearchInput } from "./interfaces";

const SearchInput = ({ filterPage, setFilterPage }: ISearchInput) => {
  const [species, setSpecies] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [checkedHuman, setCheckedHuman] = useState<boolean>(false);
  const [checkedAlien, setCheckedAlien] = useState<boolean>(false);

  const { filterChars, cleanFilters } = useChars();

  const changeEventHuman = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (checkedHuman) {
        setCheckedHuman(false);
        return setSpecies("");
      }
      setCheckedHuman(true);
      setSpecies(event.target.value);
      setCheckedAlien(false);
      setFilterPage(1);
    },
    [species]
  );

  const changeEventAlien = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (checkedAlien) {
        setCheckedAlien(false);
        return setSpecies("");
      }
      setCheckedAlien(true);
      setSpecies(event.target.value);
      setCheckedHuman(false);
      setFilterPage(1);
    },
    [species]
  );

  const changeEventName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      setFilterPage(1);
    },
    [name]
  );

  const searchChars = () => {
    filterChars({ filterPage, name, species });
  };

  const allChars = () => {
    setCheckedAlien(false);
    setCheckedHuman(false);
    setSpecies("");
    setName("");
    cleanFilters();
  };

  /**
   * verificar com o cliente qual tipo de atualização
   * seria mais interessante (atualizar ao clicar no checkbox
   * ou selecionar o checkbox e clicar no search button ou
   * atualizar conforme o nome é alterado)
   */

  useEffect(() => {
    if (name || species) return filterChars({ filterPage, name, species });
  }, [filterPage, species]);

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
          onClick={searchChars}
        />
      </div>
      <div className="flex w-4/5 sm:w-1/2 justify-around ">
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
        <Button onClick={allChars}>Mostrar todos</Button>
      </div>
    </aside>
  );
};
export default SearchInput;
