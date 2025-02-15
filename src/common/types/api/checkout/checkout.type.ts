import type { Book } from '@/common/types/api/book';
import type { User } from '@/common/types/api/user';

import { CheckoutStatus } from './checkout-status.type';

export interface Checkout {
  id: string;
  user: User;
  book: Book;
  status: CheckoutStatus;
  createdTimestamp: string;
  dueTimestamp: string;
  returnedTimestamp: string | null;
  note: string | null;
}
