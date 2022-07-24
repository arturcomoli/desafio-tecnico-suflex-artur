import { IUserCreation } from "../../src/interfaces/users.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      validUser: IUserCreation;
    }
  }
}
