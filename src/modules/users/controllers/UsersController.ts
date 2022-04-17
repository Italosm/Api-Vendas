import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowProfileService from '../services/ShowProfileService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const showUser = new ShowProfileService();
    const user = await showUser.execute({ user_id });
    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, avatar, password } = request.body;
    const { id } = request.params;
    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({
      id,
      name,
      email,
      avatar,
      password,
    });
    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });
    return response.json([]);
  }
}
