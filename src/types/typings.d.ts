export interface IAuthUser extends IUser {
  __v: number;
  exp: number;
  iat: number;
}

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  username: string;
}
