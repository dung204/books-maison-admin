import type { Author } from '@/common/types/api/author';
import type { Category } from '@/common/types/api/category';

export interface Book {
  id: string;
  isbn: string | null;
  title: string;
  categories: Category[];
  authors: Author[];
  publishedYear: number | null;
  publisher: string | null;
  language: string | null;
  numberOfPages: number | null;
  imageUrl: string | null;
  description: string | null;
  quantity: number;
  createdTimestamp: string;
  userData?: {
    isFavouring: boolean;
    isBorrowing: boolean;
  };
}
