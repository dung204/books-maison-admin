'use client';

import axios, { type InternalAxiosRequestConfig } from 'axios';
import * as jose from 'jose';
import { type PropsWithChildren, useEffect, useState } from 'react';

import {
  AuthContext,
  type AuthContextValue,
} from '@/common/contexts/auth.context';
import type { LoginSuccessResponse } from '@/common/types';
import type { User } from '@/common/types/api/user';
import { TokenUtils, envVariables } from '@/common/utils';
import {
  authHttpClient,
  checkoutHttpClient,
  favouriteBookHttpClient,
  fineHttpClient,
  mediaHttpClient,
  transactionHttpClient,
  userHttpClient,
} from '@/lib/http';

interface AuthProviderProps extends PropsWithChildren {
  initialTokens: Pick<AuthContextValue, 'accessToken' | 'refreshToken'>;
}

export function AuthProvider({ children, initialTokens }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState(initialTokens.accessToken);
  const [refreshToken, setRefreshToken] = useState(initialTokens.refreshToken);

  useEffect(() => {
    const handleRefreshToken = async (
      config: InternalAxiosRequestConfig<unknown>,
    ) => {
      if (config.headers.hasAuthorization(/Bearer(.*)/g)) {
        const accessToken = config.headers
          .getAuthorization(/Bearer(.*)/g)?.[0]
          .replaceAll('Bearer ', '');
        const jwtAccessSecret = TokenUtils.getJwtAccessSecret();

        try {
          await jose.jwtVerify(accessToken!, jwtAccessSecret);
        } catch (_accessTokenError) {
          try {
            const res = await axios.post<LoginSuccessResponse>(
              `${envVariables.API_ENDPOINT}/auth/refresh`,
              { refreshToken },
            );
            const newAccessToken = res.data.data.accessToken;
            const newRefreshToken = res.data.data.refreshToken;

            await axios.post('/api/auth/set-cookie', res);

            config.headers.setAuthorization(`Bearer ${newAccessToken}`, true);
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
          } catch (_refreshTokenError) {
            setAccessToken(undefined);
            setRefreshToken(undefined);
            setUser(null);
            await axios.delete('/api/auth/delete-cookie');
          }
        }
      }
      return config;
    };

    authHttpClient.setupRequestInterceptors(handleRefreshToken);
    checkoutHttpClient.setupRequestInterceptors(handleRefreshToken);
    favouriteBookHttpClient.setupRequestInterceptors(handleRefreshToken);
    fineHttpClient.setupRequestInterceptors(handleRefreshToken);
    transactionHttpClient.setupRequestInterceptors(handleRefreshToken);
    userHttpClient.setupRequestInterceptors(handleRefreshToken);
    mediaHttpClient.setupRequestInterceptors(handleRefreshToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accessToken && user) {
      setUser(null);
      return;
    }

    if (!user) {
      if (!accessToken) return;

      userHttpClient
        .getUserProfile(accessToken)
        .then(({ data }) => setUser(data));
    }
  }, [accessToken, user]);

  const value: AuthContextValue = {
    accessToken,
    refreshToken,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
