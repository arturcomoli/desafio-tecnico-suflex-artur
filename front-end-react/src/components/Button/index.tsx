const Button = ({ ...props }) => {
  return (
    <button
      className="bg-purple-500 rounded-md py-2 
    text-white font-medium transition-all duration-500
      hover:bg-purple-900 active:bg-purple-300"
      {...props}
    />
  );
};
export default Button;
