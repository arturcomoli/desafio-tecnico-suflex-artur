import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { ISignUpData } from "./interfaces";
import { useAuth } from "../../providers/Authentication";

const SignUp = () => {
  const { registerUser } = useAuth();

  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Mínimo de 3 (três) letras")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo obrigatório"),
    confirm_password: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "As senhas não são idênticas"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({ resolver: yupResolver(signUpSchema) });

  const handleSignUp = (data: ISignUpData) => {
    delete data.confirm_password;
    registerUser(data);
  };

  return (
    <main className="w-full h-screen">
      <div
        className="w-full h-screen flex ;
    justify-center items-center flex-col"
      >
        <form
          className="flex flex-col gap-y-3 
      p-5 w-11/12 max-w-md rounded-2xl bg-bg-aqua"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <h2 className="text-center text-2xl text-blue-txt">
            Seja bem vindo(a)!
          </h2>
          <Input
            label="Nome"
            placeholder="Digite o seu nome"
            error={errors.name?.message}
            name="name"
            register={register}
          />
          <Input
            label="Senha"
            placeholder="Digite a sua senha"
            error={errors.password?.message}
            type="password"
            name="password"
            register={register}
          />
          <Input
            label="Confirme sua senha"
            placeholder="Digite a sua senha novamente"
            type="password"
            error={errors.confirm_password?.message}
            name="confirm_password"
            register={register}
          />
          <Button type="submit" mt={5}>
            Cadastrar!
          </Button>
          <p className="text-center text-sm text-blue-txt">
            Já possui uma conta?{" "}
            <Link to="/" className="font-bold hover:underline">
              Efetue o login!
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
export default SignUp;
