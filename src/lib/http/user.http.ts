import type { SuccessResponse } from '@/common/types';
import type { Avatar, ImagePosition } from '@/common/types/api/media';
import type { User } from '@/common/types/api/user';
import type {
  ChangePasswordSchema,
  UpdateProfileSchema,
} from '@/lib/validators';

import { HttpClient } from './core.http';
import { mediaHttpClient } from './media.http';

class UserHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getUserProfile(accessToken: string) {
    return this.get<SuccessResponse<User>>('/me/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public updateProfile(accessToken: string, data: UpdateProfileSchema) {
    return this.patch<SuccessResponse<User>>('/me/profile', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public changePassword(
    accessToken: string,
    data: Omit<ChangePasswordSchema, 'confirmPassword'>,
  ) {
    return this.patch('/me/password', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async setAvatar(
    accessToken: string,
    file: File,
    position: ImagePosition,
    scale: number,
    baseDimension: number,
  ) {
    const {
      data: { name: id },
    } = await mediaHttpClient.upload(accessToken, file, 'avatars');
    const { offsetX, offsetY } = position;

    return this.patch<SuccessResponse<Avatar>>(
      '/me/avatar',
      {
        id: id.replaceAll('avatars/', ''),
        offsetX,
        offsetY,
        zoom: scale,
        baseDimension,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}

const userHttpClient = new UserHttpClient();
export { UserHttpClient, userHttpClient };
