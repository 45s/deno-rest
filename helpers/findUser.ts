import { IUser } from '../interfaces.ts';

export const findUser = (id: string, users: IUser[]): IUser | undefined => users.find((u) => u.id === id);
