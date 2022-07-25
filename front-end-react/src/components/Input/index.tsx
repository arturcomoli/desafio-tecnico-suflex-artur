import { InputProps } from "./interfaces";

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-lg text-blue-txt">{label}</label>

      <input
        className="outline-none p-2 rounded-md bg-gray-300 
        transition-all duration-500 opacity-100 hover:opacity-50 
        border-2 focus:border-btn-orange placeholder-pholder-blue text-purple-txt"
        {...props}
      />
      {error && <span className="text-xs text-err-warning">{error}</span>}
    </div>
  );
};
export default Input;
