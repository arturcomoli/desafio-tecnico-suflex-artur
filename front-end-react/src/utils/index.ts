import { NavigateFunction, useNavigate } from "react-router-dom";

export const handleNavigate = (navigate: NavigateFunction, path: string) => {
  return navigate(path);
};
