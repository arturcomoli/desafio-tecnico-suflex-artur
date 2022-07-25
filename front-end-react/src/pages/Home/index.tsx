import Header from "../../components/Header";
import CharList from "../../components/CharList";
import { useAuth } from "../../providers/Authentication";
import SearchInput from "./SearchInput";

const Home = () => {
  return (
    <>
      <Header path="/favoritos" text="Ver favoritos" />
      <main className="w-full my-5">
        <div>
          <SearchInput />
        </div>
        <CharList />
      </main>
    </>
  );
};
export default Home;
