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

export interface IVerify2FA {
  email: string;
  code: string;
}

export interface ILoginResponse {
  require2FA: boolean;
  email: string;
  message: string;
}