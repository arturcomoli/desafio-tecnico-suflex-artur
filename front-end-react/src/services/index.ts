import axios from "axios";

export const api = axios.create({
  baseURL: "https://app-desafio-suflex.herokuapp.com",
});

export const charApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
