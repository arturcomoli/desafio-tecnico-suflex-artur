import Header from "../../components/Header";
import CharList from "../../components/CharList";

const Home = () => {
  return (
    <>
      <Header path="/favoritos" text="Ver favoritos" />
      <main className="w-full my-5">
        <CharList />
      </main>
    </>
  );
};
export default Home;
