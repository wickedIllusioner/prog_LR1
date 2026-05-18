export interface IUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ILoginData {
  email: string;
  password: string;
}