import { FaSearch } from "react-icons/fa";

const SearchInput = ({}) => {
  return (
    <div
      className="flex items-center bg-bg-aqua p-2 rounded-md border-2 border-transparent
     focus-within:border-btn-orange transition-colors duration-500"
    >
      <input className="bg-transparent flex-1 outline-none text-blue-txt text-lg" />
      <FaSearch
        className="cursor-pointer text-xl text-btn-orange hover:brightness-110 
      transition-all duration-500"
      />
    </div>
  );
};
export default SearchInput;
