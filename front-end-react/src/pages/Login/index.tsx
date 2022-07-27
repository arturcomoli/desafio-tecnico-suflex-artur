import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { ILoginData } from "./interfaces";
import { useAuth } from "../../providers/Authentication";

const Login = () => {
  const { loginUser } = useAuth();

  const loginSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Mínimo de 3 (três) letras")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: yupResolver(loginSchema) });

  const handleLogin = (data: ILoginData) => {
    loginUser(data);
  };

  return (
    <main className="w-full h-screen">
      <div
        className="w-full h-screen flex ;
        justify-center items-center flex-col"
      >
        <motion.form
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="flex flex-col gap-y-3 
          p-5 w-11/12 max-w-md rounded-2xl bg-bg-aqua"
          onSubmit={handleSubmit(handleLogin)}
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
            type="password"
            error={errors.password?.message}
            name="password"
            register={register}
          />
          <Button type="submit" mt={5}>
            Logar!
          </Button>
          <p className="text-center text-sm text-blue-txt">
            Ainda não possui uma conta?{" "}
            <Link to="/cadastro" className="font-bold hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p className="text-center text-sm text-blue-txt">
            Visite a aplicação!{" "}
            <Link to="/" className="font-bold hover:underline">
              Ir para a homepage
            </Link>
          </p>
        </motion.form>
      </div>
    </main>
  );
};
export default Login;
