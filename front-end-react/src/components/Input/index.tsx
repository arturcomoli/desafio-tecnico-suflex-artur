import { InputProps } from "./interfaces";

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-lg text-purple-300">{label}</label>

      <input
        className="outline-none p-2 rounded-md bg-gray-300 
        transition-all duration-500 opacity-100 hover:opacity-50 
        border-2 focus:border-pink-500 placeholder-purple-400 text-purple-900"
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
export default Input;
