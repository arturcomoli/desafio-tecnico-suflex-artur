import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ICharData } from "../../pages/interfaces";
import { api, charApi } from "../../services";
import { CharProviderData, CharProviderProps, ICharFilter } from "./interfaces";

const CharContext = createContext<CharProviderData>({} as CharProviderData);

export const CharactersProvider = ({ children }: CharProviderProps) => {
  const [chars, setChars] = useState<[]>([]);

  const filterChars = ({ page, name, species }: ICharFilter) => {
    charApi
      .get(`/character/?page=${page}/?name=${name}&species=${species}`)
      .then((res) => setChars(res.data.results))
      .catch((_) => toast.error("Ops, algo deu errado com a requisição"));
  };

  const retrieveCharsHome = (page: number) => {
    charApi
      .get(`/character/?page=${page}`)
      .then((res) => setChars(res.data.results))
      .catch((_) =>
        toast.error("Algo deu errado no carregamento dos personagens")
      );
  };

  const addFavoriteChars = (data: ICharData, token: string) => {
    if (!token)
      return toast.error(
        "Ops, para adicionar personagens à sua lista você deve estar logado"
      );

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    api
      .post("/characters", data, options)
      .then((_) => toast.success("Personagem adicionado aos seus favoritos!"))
      .catch((_) =>
        toast.error(
          "Algo deu errado! Verifique se esse eprsonagem já consta em sua lista"
        )
      );
  };

  const retrieveFavoriteChars = (token: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    api
      .get("/characters", options)
      .then((res) => setChars(res.data))
      .catch((_) => toast.error("Algo deu errado, tente refazer o seu login"));
  };

  return (
    <CharContext.Provider
      value={{
        chars,
        filterChars,
        retrieveCharsHome,
        retrieveFavoriteChars,
        addFavoriteChars,
      }}
    >
      {children}
    </CharContext.Provider>
  );
};

export const useChars = () => useContext(CharContext);
