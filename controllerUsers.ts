import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { IContext, IUser } from './interfaces.ts';
import { findUser } from './helpers/findUser.ts';

let users: IUser[] = [
  {
    id: '1',
    name: 'test1',
  },
  {
    id: '2',
    name: 'user2',
  },
];

export const controllerUsers = {
  getUsers: ({ response }: IContext) => {
    response.status = 200;
    response.body = {
      success: true,
      users,
    };
  },

  getUser: ({ response, params }: IContext) => {
    const user: IUser | undefined = findUser(params.id, users);
    if (user) {
      response.status = 200;
      response.body = { user };
    } else {
      response.status = 404;
      response.body = { message: 'User not found' };
    }
  },

  createUser: async ({ response, request }: IContext) => {
    const body = await request.body();
    console.log(body);
    if (!request.hasBody) {
      response.status = 400;
      response.body = { message: 'Invalid user data' };
    } else {
      const user: IUser = body.value;
      user.id = v4.generate();
      users.push(user);
      response.status = 201;
      response.body = { user };
    }
  },

  updateUser: async ({ params, response, request }: IContext) => {
    const user: IUser | undefined = findUser(params.id, users);
    if (user) {
      const body = await request.body();
      users = users.map((u) => (u.id === user.id ? { ...u, ...body.value } : u));

      response.status = 200;
      response.body = { users };
    } else {
      response.status = 404;
      response.body = { message: 'User not found' };
    }
  },

  deleteUser: async ({ params, response }: IContext) => {
    const user: IUser | undefined = findUser(params.id, users);
    if (user) {
      users = users.filter((u) => u.id !== user.id);
      response.status = 200;
      response.body = { users, message: 'User successfully deleted ' };
    } else {
      response.status = 404;
      response.body = { message: 'User not found' };
    }
  },
};
