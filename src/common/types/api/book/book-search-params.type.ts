import type { CommonSearchParams } from '@/common/types';
import type { BookAdvancedFilterData } from '@/common/types/api/book';

export type BookSearchParams = CommonSearchParams &
  Partial<Omit<BookAdvancedFilterData, 'categoryIds'>> & {
    title?: string;
    categoryId?: string | string[];
  };
