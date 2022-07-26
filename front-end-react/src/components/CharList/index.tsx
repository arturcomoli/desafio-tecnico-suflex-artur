import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICharRetrieve } from "../../pages/interfaces";
import { useChars } from "../../providers/Characters";
import Button from "../Button";
import CharCard from "../CharCard";
import { IDeleteChar } from "../CharCard/interfaces";
import SearchInput from "../SearchInput";

const CharList = ({ toDelete, chars }: IDeleteChar) => {
  const [page, setPage] = useState<number>(1);

  const [filterPage, setFilterPage] = useState<number>(1);

  const { maxPages, retrieveCharsHome, filteredChars } = useChars();

  const location = useLocation();

  useEffect(() => {
    if (!filteredChars.length) return retrieveCharsHome(page);
  }, [page]);

  const advance = useCallback(() => {
    if (filteredChars.length && filterPage < maxPages)
      return setFilterPage((filterPage) => filterPage + 1);

    if (page < maxPages) setPage((page) => page + 1);
  }, [chars]);

  const goBack = useCallback(() => {
    if (filteredChars.length && filterPage > 1)
      return setFilterPage((filterPage) => filterPage - 1);
    if (page > 1) setPage((page) => page - 1);
  }, [chars]);

  return (
    <section>
      {location.pathname !== "/" ? null : (
        <SearchInput filterPage={filterPage} setFilterPage={setFilterPage} />
      )}

      <ul
        className="w-11/12 relative overflow-x-auto flex my-7 mx-auto
      lg:flex-wrap gap-5 lg:justify-center"
      >
        {filteredChars.length
          ? filteredChars.map((data: ICharRetrieve) => (
              <CharCard key={data.id} data={data} toDelete={toDelete} />
            ))
          : chars?.map((data: ICharRetrieve) => (
              <CharCard key={data.id} data={data} toDelete={toDelete} />
            ))}
      </ul>
      <div className="w-full flex justify-around">
        <Button size={"lg"} onClick={goBack}>
          Retroceder
        </Button>
        <Button size={"lg"} onClick={advance}>
          Avançar
        </Button>
      </div>
    </section>
  );
};
export default CharList;
