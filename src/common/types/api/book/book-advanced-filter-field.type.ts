import type { BookAdvancedFilterData } from '@/common/types/api/book';

export type BookAdvancedFilterField =
  | Exclude<
      keyof BookAdvancedFilterData,
      'publishedYearFrom' | 'publishedYearTo' | 'minPages' | 'maxPages'
    >
  | 'publishedYear'
  | 'pages';
