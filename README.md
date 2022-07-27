<h1 align="center">
    <a href="https://desafio-tecnico-suflex-artur.vercel.app/">Desafio Técnico Suflex</a>
</h1>

<h3 align="center">O desafio proposto consiste em uma projeto Fullstack, em que deve ser possível um usuário se cadastrar, realizar o login e salvar seus personagens favoritos existentes na <a href="https://rickandmortyapi.com/">Rick and Morty API</a>. Esses personagens salvos ficam salvos em um banco de dados Postgres, podendo ser acessados em futuros logins. Caso o usuário não deseje se cadastrar, ainda é possível visualizar os personagens e filtrar por nome e espécies (humano ou alien). Os filtros funcionam de forma combinada.</h3>

<br/>

### ✅ Features da aplicação - Backend

- [x] Registrar um novo usuário;
- [x] Logar o usuário (retorna um token JWT quando o login é bem sucedido, além das informações do usuário, com exceção da senha);
- [x] Buscar os dados do usuário logado, por meio do token;
- [x] Listar todos os usuários;
- [x] Atualizar os dados do usuário;
- [x] Deletar o usuário;
- [x] Criar um personagem favorito;
- [x] Listar todos os personagens cadastrados no banco;
- [x] Buscar um personagem específico pelo ID;
- [x] Deletar o personagem.

<br/>

### ✅ Features da aplicação - Frontend

- [x] O usuário pode visualizar os personagens na homepage;
- [x] Cada card de personagem possui um botão para visualizar mais informações sobre ele, como origem, espécie, moradia, número de episódios em que aparece, status e data de criação;
- [x] É possível realizar filtros por nome e espécie (humano ou alien), ou pelo nome/humano ou nome/alien;
- [x] É possível alternar entre as páginas de personagens, inclusive nos filtros;
- [x] O usuário pode se registrar na aplicação com seu nome e uma senha (mínimo de 6 dígitos).
- [x] Ao logar, é possível inserir esses personagens à sua própria lista! Basta você clicar na estrela amarela que existe tanto no card quanto no modal.
- [x] A aplicação é responsiva, portanto nas resoluções menores, basta arrastar os cards para o lado!

<br/>

### ✅ Link para a demo da aplicação

- [x] Backend -> <a href="https://app-desafio-suflex.herokuapp.com">Desafio Suflex - Backend</a>
- [x] Frontend -> <a href="https://desafio-tecnico-suflex-artur.vercel.app/">Desafio Suflex - Frontend</a>

<br/>

#### 🏠 Homepage da aplicação - Mobile

![Home-mobile](https://user-images.githubusercontent.com/91695244/181137461-e2d75d97-b752-4350-ac74-beb86270b903.jpeg)

<br/>

#### 🏠 Homepage da aplicação - Desktop

![Home-desktop](https://user-images.githubusercontent.com/91695244/181137478-e8329645-c7d7-44cb-9150-8ec0bc6b612c.jpeg)

<br/>

#### ✅ Modal de informações aberto

![Modal](https://user-images.githubusercontent.com/91695244/181138090-a832db03-3f5f-455c-afe9-067435a74601.jpeg)

<br/>

#### ✅ Feature de cadastro

![Cadastro](https://user-images.githubusercontent.com/91695244/181137963-5e810f6a-aaf9-42df-9297-9b69eddab452.jpeg)

<br/>

#### ✅ Feature de login

![Login](https://user-images.githubusercontent.com/91695244/181137971-df8f4530-6a00-4398-9630-a65d6ddd2188.jpeg)

<br/>

### ✅ Como rodar a aplicação localmente

Antes de tudo, você precisa das seguintes tecnologias:

- [x] [Git](https://git-scm.com)
- [x] [Node](https://nodejs.org/en/)
- [x] [Docker](https://www.docker.com/)
- [x] [NPM](https://www.npmjs.com/)
- [x] Algum editor de códigos, no meu caso, utilizo o [VSCode](https://code.visualstudio.com/)

<br/>

### 🎲 Preparando o ambiente

```bash
# Faça o clone deste repositório

$ git clone git@github.com:arturcomoli/desafio-tecnico-suflex-artur.git


# Entre na raiz do repositório clonado

$ cd desafio-tecnico-suflex-artur


# Por existir um deploy live, será necessário entrar na branch exclusiva para testar a aplicação localmente

$ git checkout docker


# Gere o container no docker

$ sudo docker compose up --build

# Pronto! A aplicação está rodando nas portas:
# Backend -> 8000
# Banco de dados -> 5435
# Frontend -> 5173 ou 3000, o Vite pode vir a variar as portas. Cheque no terminal, busque pelo container de nome: front-end-vite

# Caso não tenha o docker instalado em sua máquina, siga as instruções abaixo:


$ psql 'seu_usuario_postgres'

ou apenas

$ psql

seu_usuario=> CREATE DATABASE desafio_suflex

$ cs back-end-express

$ touch .env

# Copie o conteúdo do arquivo .env.example e substitua o usuário e a senha postgres para seus dados

$ npm install

# caso se depare com erros do npm:

$ npm install --force

$ npm run dev

# Abra outro terminal e rode as migrações

$ npm run migrate

# Pronto! Agora o backend da aplicação está rodando na porta 3003, basta você acessar http://localhost:3003 no seu navegador que verá uma mensagem!


# Em outro terminal, na raíz do projeto:

$ cd front-end-react

$ npm install

$ npm run dev

# Após isso, o Vite irá te informar em qual porta estará sendo rodada sua aplicação. Basta segurar a tecla CTRL e clicar no link do localhost!!

# Prontinho, agora o ambiente está totalmente configurado!
```

### 🎲 Executando os testes

Após clonar o repositório e entrar em sua raíz (conforme descrito acima), siga os passos abaixo:

```bash
# BACKEND

$ cd back-end-express

$ npm install

# ou

$ npm install --force

# caso se depare com um erro de permissão, verifique se o Docker gerou uma pasta node_modules vazia (utilizada nos volumes). Basta remover essa pasta e realizar o passo anterior novamente


$ npm test

# Caso deseje verificar a cobertura de testes, utilize o comando

$ npm test -- --coverage

# Este comando gera um arquivo HTML no diretório coverage, é possível visualizá-lo com o Live Server, caso tenha a extensão instalada


# FRONTEND

$ cd front-end-react

$ npm install

# ou

$ npm install --force


# caso se depare com um erro de permissão, verifique se o Docker gerou uma pasta node_modules vazia (utilizada nos volumes). Basta remover essa pasta e realizar o passo anterior novamente

$ npx cypress open

# Uma interface do cypress será gerada, clique em E2E tests e escolha o navegador que deseja rodar os testes.

# Procure a aba 'Specs', lá estarão os testes E2E

# Escolha o escopo que deseja testar

# Note que para os testes funcionarem, é necessário que o servidor esteja rodando localmente. Como as dependências já estão instaladas, abra um terminal no diretório front-end-react e execute o comando

$ npm run dev


```

### 🛠 Principais tecnologias utilizadas - Backend

- [Express](https://expressjs.com/pt-br/) - Lógica do backend
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [TypeORM](https://typeorm.io/) - Mapeamento objeto-relacional
- [Jest](https://jestjs.io/pt-BR/) - Teste unitários e de integração
- Outras bibliotecas que auxiliaram no desenvolvimento podem ser encontradas na seção: `"dependencies"` e `"devDependencies"` no arquivo `package.json`, no diretório relacionado ao backend

<br/>

### 🛠 Principais tecnologias utilizadas - Frontend

- [Vite](https://vitejs.dev/) - Criação do React App
- [Tailwind CSS](https://tailwindcss.com/) - Aplicação de estilos na aplicação
- [Axios](https://axios-http.com/ptbr/docs/intro) - Gerenciamento de requisições HTTP
- [React Hot Toast](https://react-hot-toast.com/) - Feedback de erros ao usuário
- [React Router Dom](https://reactrouter.com/) - Roteamento das páginas da aplicação
- [Cypress](https://www.cypress.io/) - Testes E2E
- Outras bibliotecas que auxiliaram no desenvolvimento podem ser encontradas na seção: `"dependencies"` e `"devDependencies"` no arquivo `package.json`, no diretório relacionado ao frontend

<br/>

##### NOTA ENDPOINTS BACKEND: Na raíz desse projeto existe um arquivo `insomnia.json`, lá se encontram todos os endpoints da aplicação. Alguns precisam de autorização (JWT fornecido no login), e em possuem mensagem de erros apropriadas. O token já está configurado para ser resgatado automaticamente após o login, portanto, basta criar seu usuário, logar e voilá!! Nesse ambiente de desenvolvimento também está configurado para os três possíveis (teste local, teste com docker e teste em produção), basta você selecionar o desejado.

<br/>

### ✅ Desenvolvedor responsável - Artur Comoli

<img src="https://avatars.githubusercontent.com/u/91695244?v=4" alt="Artur Comoli" style="border-radius: 50%" width="120px"/>

<br/>

Entre em contato!

<div>
    <a href = "mailto:artur.comoli@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/>
    <a href="https://www.linkedin.com/in/artur-comoli" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>     
</div>
