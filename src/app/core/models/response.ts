export interface IResponse<T = any> {
  error: boolean;
  data: T;
  msg: string;
  type: string;
}
