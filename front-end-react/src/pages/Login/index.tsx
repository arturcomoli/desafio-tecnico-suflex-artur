import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  return (
    <main className="w-full h-screen bg-gray-700">
      <div
        className="w-full h-screen flex ;
        justify-center items-center flex-col"
      >
        <form
          className="flex flex-col gap-y-3 
          border-2 p-5 w-11/12 max-w-md border-purple-500 rounded-2xl"
        >
          <h2 className="text-center text-2xl text-pink-300">
            Seja bem vindo(a)!
          </h2>
          <Input
            label="Nome"
            placeholder="Digite o seu nome"
            error="Esse campo é obrigatório"
          />
          <Input
            label="Senha"
            placeholder="Digite a sua senha"
            error="Esse campo é obrigatório"
          />
          <Button>Logar!</Button>
        </form>
      </div>
    </main>
  );
};
export default Login;
