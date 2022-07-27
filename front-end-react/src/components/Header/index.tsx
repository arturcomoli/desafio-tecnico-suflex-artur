import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import boss from "../../assets/boss.jpg";
import { useAuth } from "../../providers/Authentication";
import { handleNavigate } from "../../utils";
import Button from "../Button";
import { IHeaderProps } from "./interfaces";

const Header = ({ path, text, disabled }: IHeaderProps) => {
  const navigate = useNavigate();

  const { authToken, logoutUser } = useAuth();

  const handleAuthHeader = () => {
    if (authToken) return logoutUser();
    handleNavigate(navigate, "/login");
  };

  return (
    <motion.header
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="w-full py-5 px-5 lg:px-40 h-25 bg-bg-aqua 
        flex items-center justify-around lg:justify-between shadow-md"
    >
      <Link to="/" className="">
        <img src={boss} alt="logo" className="w-28 sm:w-32 md:w-36 lg:w-44" />
      </Link>
      <div className="flex flex-col group">
        <Button
          disabled={disabled}
          onClick={() => handleNavigate(navigate, path)}
        >
          {text}
        </Button>
        {!authToken && (
          <p
            className="hidden group-hover:block text-blue-txt 
            transition-all duration-300 text-center"
          >
            Disponível após o login!
          </p>
        )}
      </div>
      <Button onClick={handleAuthHeader}>
        {authToken ? "Logout" : "Login"}
      </Button>
    </motion.header>
  );
};
export default Header;
