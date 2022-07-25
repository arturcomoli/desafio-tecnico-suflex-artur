import {
  IUserCreation,
  IUserUpdate,
} from "../../src/interfaces/users.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      validUser: IUserCreation;
      validUpdate: IUserUpdate;
    }
  }
}

//
