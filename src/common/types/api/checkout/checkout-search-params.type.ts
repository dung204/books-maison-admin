import type { CommonSearchParams } from '@/common/types';

import { CheckoutStatus } from './checkout-status.type';

export interface CheckoutSearchParams extends CommonSearchParams {
  bookId?: string;
  status?: CheckoutStatus;
  fromCreatedTimestamp?: string;
  toCreatedTimestamp?: string;
  fromDueTimestamp?: string;
  toDueTimestamp?: string;
  fromReturnedTimestamp?: string;
  toReturnedTimestamp?: string;
}
