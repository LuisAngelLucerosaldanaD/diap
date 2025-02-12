export interface IResponse<T = any> {
  error: boolean;
  data: T;
  msg: string;
  type: string;
}


export interface IResAddress<T = any> {
  status: string;
  data: T;
}
