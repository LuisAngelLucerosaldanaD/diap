export interface ICredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface ISession {
  msg: string;
  data: IDataSession;
}

export interface IDataSession {
  name: string;
  email: string;
  id_role: number;
  expirer_in: number;
  token: string;
}

export interface IAuth {
  token: string;
  isAuth: boolean;
  role: number;
  user: string;
}