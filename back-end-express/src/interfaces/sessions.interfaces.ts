import User from "../models/User";

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IReturnUserLogin {
  user: User;
  token: string;
}
