import { useEffect, useState } from "react";
import CharList from "../../components/CharList";
import Header from "../../components/Header";
import { useAuth } from "../../providers/Authentication";
import { useChars } from "../../providers/Characters";

const Favorites = () => {
  const { favChars, retrieveFavoriteChars, owner, update, setFilteredChars } =
    useChars();

  const { authToken } = useAuth();

  console.log(favChars);

  useEffect(() => {
    setFilteredChars([]);
    retrieveFavoriteChars(authToken);
  }, [update]);

  return (
    <>
      <Header path="/" text="Voltar à home" />
      <main className="w-full my-5">
        <h2 className="flex flex-1 justify-center text-lg sm:text-2xl w-11/12 mx-auto text-blue-txt">
          Lista de personagens favoritos de: {owner}
        </h2>
        {!favChars.length ? (
          <p className="my-28 text-center text-2xl text-err-warning">
            Ops... Você não possui nenhum personagem favorito! Volte à página
            inicial e faça a sua coleção!!!
          </p>
        ) : (
          <CharList toDelete chars={favChars} />
        )}
      </main>
    </>
  );
};
export default Favorites;
