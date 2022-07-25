import { createContext, useContext, useState } from "react";

import { AuthProviderData, AuthProviderProps } from "./interfaces";
import { handleNavigate } from "../../utils";
import { ILoginData } from "../../pages/Login/interfaces";
import { api } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ISignUpData } from "../../pages/SignUp/interfaces";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string>(
    () => localStorage.getItem("@desafio/token") || ""
  );

  const navigate = useNavigate();

  const registerUser = (userData: ISignUpData) => {
    api
      .post("/users", userData)
      .then((_) => {
        toast.success("Cadastro realizado com sucesso");
        handleNavigate(navigate, "/login");
      })
      .catch((_) =>
        toast.error("Algo deu errado, por favor, teste com outro nome")
      );
  };

  const loginUser = (userData: ILoginData) => {
    api
      .post("/login", userData)
      .then((res) => {
        localStorage.setItem("@desafio/token", res.data.token);
        setAuthToken(res.data.token);
        toast.success("Logado com sucesso!");
        handleNavigate(navigate, "/");
      })
      .catch((_) => toast.error("Algo deu errado, cheque suas credenciais"));
  };

  const logoutUser = () => {
    localStorage.clear();
    setAuthToken("");

    handleNavigate(navigate, "/login");
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, authToken, logoutUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
