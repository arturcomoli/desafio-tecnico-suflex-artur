import { useCallback, useEffect, useState } from "react";
import { ICharRetrieve } from "../../pages/interfaces";
import { useChars } from "../../providers/Characters";
import Button from "../Button";
import CharCard from "../CharCard";
import { IDeleteChar } from "../CharCard/interfaces";

const CharList = ({ toDelete, handleUpdate, chars }: IDeleteChar) => {
  const [page, setPage] = useState<number>(1);
  const { maxPages, retrieveCharsHome } = useChars();

  useEffect(() => {
    retrieveCharsHome(page);
  }, [page]);

  const advance = useCallback(() => {
    if (page < maxPages) setPage((page) => page + 1);
  }, [chars]);

  const goBack = useCallback(() => {
    if (page > 1) setPage((page) => page + 1);
  }, [chars]);

  return (
    <section>
      <ul
        className="w-11/12 relative overflow-x-auto flex my-7 mx-auto
      lg:flex-wrap gap-y-5 lg:justify-center"
      >
        {chars?.map((data: ICharRetrieve) => (
          <CharCard
            key={data.id}
            data={data}
            toDelete={toDelete}
            handleUpdate={handleUpdate}
          />
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
