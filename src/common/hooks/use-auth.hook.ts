import { useContext } from 'react';

import { AuthContext } from '@/common/contexts';

export function useAuth() {
  const value = useContext(AuthContext);

  if (value === null)
    throw new Error('useAuthContext must be used inside of AuthContext.');

  return value;
}
