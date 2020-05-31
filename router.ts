import { Router } from 'https://deno.land/x/oak/mod.ts';
import { controllerUsers } from './controllerUsers.ts';
import { API } from './constants/config.ts';

const router = new Router();

const { getUsers, getUser, createUser, updateUser, deleteUser } = controllerUsers;

router
  .get(API.users, getUsers)
  .get(`${API.users}/:id`, getUser)
  .post(API.users, createUser)
  .put(`${API.users}/:id`, updateUser)
  .delete(`${API.users}/:id`, deleteUser);

export { router };
