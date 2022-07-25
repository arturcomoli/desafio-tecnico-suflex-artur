import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  return (
    <main className="w-full h-screen">
      <div
        className="w-full h-screen flex ;
        justify-center items-center flex-col"
      >
        <form
          className="flex flex-col gap-y-3 
          p-5 w-11/12 max-w-md rounded-2xl bg-bg-aqua"
        >
          <h2 className="text-center text-2xl text-blue-txt">
            Seja bem vindo(a)!
          </h2>
          <Input label="Nome" placeholder="Digite o seu nome" />
          <Input label="Senha" placeholder="Digite a sua senha" />
          <Button mt={5}>Logar!</Button>
          <p className="text-center text-sm text-blue-txt">
            Ainda não possui uma conta?{" "}
            <Link to="/cadastro" className="font-bold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
export default Login;
