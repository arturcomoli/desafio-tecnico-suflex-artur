import CharList from "../../components/CharList";
import Header from "../../components/Header";

const Favorites = () => {
  return (
    <>
      <Header path="/" text="Voltar à home" />
      <main className="w-full my-5">
        <h2 className="text-lg sm:text-2xl w-11/12 mx-auto text-blue-txt">
          Lista de personagens favoritos de: Artur
        </h2>
        <CharList />
      </main>
    </>
  );
};
export default Favorites;
