'use client';

import { type Dispatch, type SetStateAction, createContext } from 'react';

import type { User } from '@/common/types/api/user';

export interface AuthContextValue {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
