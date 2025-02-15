import type { Avatar } from '@/common/types/api/media';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: Avatar | null;
  createdTimestamp: string;
}
