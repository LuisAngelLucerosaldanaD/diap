export interface IUsers {
  id: number;
  name: string;
  email: string;
  role: string;
  status: any,
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export interface ICreatUser {
  name: string;
  email: string;
  id_role: number;
  password: string;
}

export interface IUpdateUser {
  id: number;
  name: string;
  email: string;
  id_role: number;
}
