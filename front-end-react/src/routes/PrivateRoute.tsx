import { Navigate, useLocation } from "react-router-dom";
import { IRouteAuth } from "./interfaces";

const PrivateRoute = ({ children }: IRouteAuth) => {
  const location = useLocation();

  if (localStorage.getItem("@desafio/token")) return children;

  return <Navigate to="/" state={{ from: location }} />;
};
export default PrivateRoute;
