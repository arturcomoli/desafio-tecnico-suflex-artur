import { ReactNode } from "react";
import { ILoginData } from "../../pages/Login/interfaces";
import { ISignUpData } from "../../pages/SignUp/interfaces";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthProviderData {
  authToken: string;
  registerUser: (data: ISignUpData) => void;
  loginUser: (data: ILoginData) => void;
  logoutUser: () => void;
}
