import type { Pagination } from '@/common/types';

import { Role } from './role.type';

export type SuccessResponse<T> = T extends unknown[]
  ? {
      data: T;
      pagination: Pagination;
    }
  : { data: T };

export type LoginSuccessResponse = SuccessResponse<{
  id: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}>;

export type RefreshSuccessResponse = LoginSuccessResponse;
