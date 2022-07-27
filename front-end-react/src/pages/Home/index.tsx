import Header from "../../components/Header";
import CharList from "../../components/CharList";
import { useAuth } from "../../providers/Authentication";
import { useChars } from "../../providers/Characters";

const Home = () => {
  const { chars } = useChars();

  const { authToken } = useAuth();

  return (
    <>
      <Header
        path="/favoritos"
        text="Ver favoritos"
        disabled={authToken ? false : true}
      />
      <main className="w-full my-5">
        <CharList chars={chars} />
      </main>
    </>
  );
};
export default Home;
