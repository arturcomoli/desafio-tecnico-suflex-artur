import React from "react";
import { Link, useNavigate } from "react-router-dom";

import boss from "../../assets/boss.jpg";
import { handleNavigate } from "../../utils";
import Button from "../Button";
import { IHeaderProps } from "./interfaces";

const Header = ({ path, text }: IHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className="w-full py-5 px-5 lg:px-40 h-25 bg-bg-aqua 
        flex items-center justify-around lg:justify-between"
    >
      <Link to="/" className="">
        <img src={boss} alt="logo" className="w-28 sm:w-32 md:w-36 lg:w-44" />
      </Link>
      <Button onClick={() => handleNavigate(navigate, path)}>{text}</Button>
    </header>
  );
};
export default Header;
