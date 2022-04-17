import { Request, Response } from 'express';
import DeleteUserAvatarService from '../services/DeleteUserAvatarService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    });
    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserAvatar = new DeleteUserAvatarService();
    await deleteUserAvatar.execute({ id });
    return response.json([]);
  }
}
