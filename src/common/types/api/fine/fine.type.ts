import type { Checkout } from '@/common/types/api/checkout';

import { FineStatus } from './fine-status.type';

export interface Fine {
  id: string;
  checkout: Checkout;
  status: FineStatus;
  createdTimestamp: string;
  amount: number;
}
