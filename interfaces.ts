export interface IUser {
  id: string;
  name: string;
}
export interface IContext {
  response: any;
  params: { id: string };
  request?: any;
}
