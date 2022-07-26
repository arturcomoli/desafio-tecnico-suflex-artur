import { AuthProvider } from "./Authentication";
import { CharactersProvider } from "./Characters";
import { ProviderProps } from "./interfaces";

const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <CharactersProvider>{children}</CharactersProvider>
    </AuthProvider>
  );
};

export default Providers;
