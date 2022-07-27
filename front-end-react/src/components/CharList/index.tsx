import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { ICharRetrieve } from "../../pages/interfaces";
import { useChars } from "../../providers/Characters";
import Button from "../Button";
import CharCard from "../CharCard";
import { IDeleteChar } from "../CharCard/interfaces";
import SearchInput from "../SearchInput";
import Spinner from "../Spinner";

const CharList = ({ toDelete, chars }: IDeleteChar) => {
  const [page, setPage] = useState<number>(1);

  const [filterPage, setFilterPage] = useState<number>(1);

  const { maxPages, retrieveCharsHome, filteredChars, loading } = useChars();

  console.log(filteredChars);
  console.log(filterPage);
  console.log(maxPages);

  const location = useLocation();

  useEffect(() => {
    if (!filteredChars.length) return retrieveCharsHome(page);
  }, [page, filterPage]);

  const advance = useCallback(() => {
    if (filteredChars.length && filterPage < maxPages)
      return setFilterPage((filterPage) => filterPage + 1);

    if (page < maxPages) setPage((page) => page + 1);
  }, [chars, filterPage, filteredChars]);

  const goBack = useCallback(() => {
    if (filteredChars.length && filterPage > 1)
      return setFilterPage((filterPage) => filterPage - 1);
    if (page > 1) setPage((page) => page - 1);
  }, [chars, filterPage, filteredChars]);

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      {location.pathname !== "/" ? null : (
        <SearchInput filterPage={filterPage} setFilterPage={setFilterPage} />
      )}
      {loading ? (
        <Spinner />
      ) : (
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
      )}

      <div className="w-full flex justify-around">
        <Button size={"lg"} onClick={goBack}>
          Retroceder
        </Button>
        <Button size={"lg"} onClick={advance}>
          Avançar
        </Button>
      </div>
    </motion.section>
  );
};
export default CharList;
