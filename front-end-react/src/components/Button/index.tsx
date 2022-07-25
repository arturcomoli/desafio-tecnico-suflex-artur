import { ButtonProps } from "./interfaces";

const Button = ({ mt, size, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-btn-orange rounded-md p-2 
      text-blue-txt font-medium transition-all duration-500
        hover:brightness-125 active:bg-purple-300 mt-${mt} ${
        size === "lg" ? "w-[115px]" : "w-auto"
      }`}
      {...props}
    />
  );
};
export default Button;
