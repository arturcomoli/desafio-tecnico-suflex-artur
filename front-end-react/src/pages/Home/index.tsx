import Header from "../../components/Header";
import CharList from "../../components/CharList";
import { useAuth } from "../../providers/Authentication";
import SearchInput from "./SearchInput";
import { useChars } from "../../providers/Characters";

const Home = () => {
  const { chars } = useChars();

  return (
    <>
      <Header path="/favoritos" text="Ver favoritos" />
      <main className="w-full my-5">
        <SearchInput />
        <CharList chars={chars} />
      </main>
    </>
  );
};
export default Home;
