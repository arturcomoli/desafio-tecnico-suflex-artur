import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const charApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
