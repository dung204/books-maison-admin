import { type AxiosError, HttpStatusCode } from 'axios';

import type {
  LoginSuccessResponse,
  RefreshSuccessResponse,
  SuccessResponse,
} from '@/common/types';
import type { OAuthAction } from '@/common/types/api/auth';
import type { User } from '@/common/types/api/user';
import type { LoginSchema, RegisterSchema } from '@/lib/validators';

import { HttpClient } from './core.http';

class AuthHttpClient extends HttpClient {
  constructor() {
    super();
    this.axiosInstance.interceptors.response.clear();
    this.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseFailed,
    );
  }

  protected async onResponseFailed(error: AxiosError) {
    await super.onResponseFailed(error);

    if (typeof window !== 'undefined') {
      const { toast } = await import('sonner');

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          if (error.config?.url === '/auth/login') {
            toast.error('Email or password is incorrect!');
            return;
          }

        case HttpStatusCode.Conflict:
          if (error.config?.url === '/auth/login') {
            toast.error('Email already taken!');
            return;
          }
      }

      return Promise.reject(error);
    }
  }

  public login(data: LoginSchema) {
    return this.post<LoginSuccessResponse>('/auth/login', data);
  }

  public register(data: RegisterSchema) {
    return this.post<SuccessResponse<User>>('/auth/register', data);
  }

  public logout(accessToken: string) {
    return this.delete('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public refreshToken(refreshToken: string) {
    return this.post<RefreshSuccessResponse>('/auth/refresh', {
      refreshToken,
    });
  }

  public googleAuth(code: string, action: OAuthAction) {
    return this.post<LoginSuccessResponse>('/auth/google', {
      code,
      action,
    });
  }
}

const authHttpClient = new AuthHttpClient();
export { authHttpClient, AuthHttpClient };
