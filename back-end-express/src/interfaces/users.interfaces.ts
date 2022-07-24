export interface IUserCreation {
  name: string;
  password: string;
}

export interface IUserUpdate {
  id?: string;
  name?: string;
  password?: string;
}

export interface IUserId {
  id: string | undefined;
}
