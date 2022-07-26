import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { useAuth } from "../providers/Authentication";
import PrivateRoute from "./PrivateRoute";
import RestrictedToLoggedUser from "./RestrictedToLoggedUser";

const AppRoutes = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("@desafio/token");
    setAuthenticated(true);
    if (!authToken) return setAuthenticated(false);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <RestrictedToLoggedUser>
            <Login />
          </RestrictedToLoggedUser>
        }
      />
      <Route
        path="/cadastro"
        element={
          <RestrictedToLoggedUser>
            <SignUp />
          </RestrictedToLoggedUser>
        }
      />
      <Route
        path="/favoritos"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
