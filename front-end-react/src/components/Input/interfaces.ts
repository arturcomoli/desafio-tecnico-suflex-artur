import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { ILoginData } from "../../pages/Login/interfaces";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  name: string;
  register: any;
}
