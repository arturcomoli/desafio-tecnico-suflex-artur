import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ICharData } from "../../pages/interfaces";
import { api, charApi } from "../../services";
import { CharProviderData, CharProviderProps, ICharFilter } from "./interfaces";

const CharContext = createContext<CharProviderData>({} as CharProviderData);

export const CharactersProvider = ({ children }: CharProviderProps) => {
  const [chars, setChars] = useState<[]>([]);
  const [favChars, setFavChars] = useState<[]>([]);
  const [filteredChars, setFilteredChars] = useState<[]>([]);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [owner, setOwner] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const filterChars = ({ filterPage, name, species }: ICharFilter) => {
    charApi
      .get(`/character/?page=${filterPage}&name=${name}&species=${species}`)
      .then((res) => {
        setFilteredChars(res.data.results);
        return setMaxPages(res.data.info.pages);
      })
      .catch((_) => {
        setFilteredChars([]);
        toast.error(
          "Ops, não existem personagens com os filtros selecionados!"
        );
      });
  };

  const cleanFilters = () => {
    setFilteredChars([]);
  };

  const retrieveCharsHome = (page: number) => {
    charApi
      .get(`/character/?page=${page}`)
      .then((res) => {
        setChars(res.data.results);
        return setMaxPages(res.data.info.pages);
      })
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
          "Algo deu errado! Verifique se esse personagem já consta em sua lista"
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
      .get("/users", options)
      .then((res) => {
        setOwner(res.data.name);
        setFavChars(res.data.favorite_characters);
        const max = Math.ceil(res.data.favorite_characters.length / 20);
        return setMaxPages(max);
      })
      .catch((_) =>
        toast.error("Algo deu errado, tente refazer o seu login", {
          id: "error",
        })
      );
  };

  const deleteFavoriteChar = (token: string, id: number) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    api
      .delete(`/characters/${id}`, options)
      .then((_) => {
        handleUpdate();
        toast.success("Personagem deletado!");
      })
      .catch((_) =>
        toast.error("Ops, algo deu errado! Relogue e tente novamente")
      );
  };

  return (
    <CharContext.Provider
      value={{
        chars,
        maxPages,
        filterChars,
        filteredChars,
        cleanFilters,
        retrieveCharsHome,
        retrieveFavoriteChars,
        addFavoriteChars,
        deleteFavoriteChar,
        owner,
        favChars,
        update,
        handleUpdate,
      }}
    >
      {children}
    </CharContext.Provider>
  );
};

export const useChars = () => useContext(CharContext);
