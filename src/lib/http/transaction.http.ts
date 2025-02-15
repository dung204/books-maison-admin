import type { CommonSearchParams, SuccessResponse } from '@/common/types';
import type { Transaction } from '@/common/types/api/transaction';

import { HttpClient } from './core.http';

class TransactionHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getTransactionsOfCurrentUser(
    accessToken: string,
    params?: CommonSearchParams,
  ) {
    return this.get<SuccessResponse<Transaction[]>>('/me/transactions', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public getTransactionById(accessToken: string, id: string) {
    return this.get<SuccessResponse<Transaction>>(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

const transactionHttpClient = new TransactionHttpClient();
export { transactionHttpClient, TransactionHttpClient };
