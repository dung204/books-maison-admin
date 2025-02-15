import type { User } from '@/common/types/api/user';

import { TransactionMethod } from './transaction-method.type';

export interface Transaction {
  id: string;
  user: User;
  amount: number;
  method: TransactionMethod;
  createdTimestamp: string;
  purchaseUrl: string;
}
