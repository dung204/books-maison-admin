import type { CommonSearchParams } from '@/common/types';

export interface AuthorSearchParams extends CommonSearchParams {
  name?: string;
  yearOfBirthFrom?: string;
  yearOfBirthTo?: string;
  yearOfDeathFrom?: string;
  yearOfDeathTo?: string;
  nationality?: string;
}
