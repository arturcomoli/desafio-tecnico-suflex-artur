import { ButtonProps } from "./interfaces";

const Button = ({ mt, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-btn-orange rounded-md py-2 
      text-blue-txt font-medium transition-all duration-500
        hover:brightness-125 active:bg-purple-300 mt-${mt}`}
      {...props}
    />
  );
};
export default Button;
