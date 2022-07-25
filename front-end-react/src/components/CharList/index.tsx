import Button from "../Button";
import CharCard from "../CharCard";

const CharList = () => {
  return (
    <section>
      <ul
        className="w-11/12 relative overflow-x-auto flex my-7 mx-auto
      lg:flex-wrap gap-y-5"
      >
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
        <CharCard />
      </ul>
      <div className="w-full flex justify-around">
        <Button size={"lg"}>Retroceder</Button>
        <Button size={"lg"}>Avançar</Button>
      </div>
    </section>
  );
};
export default CharList;
