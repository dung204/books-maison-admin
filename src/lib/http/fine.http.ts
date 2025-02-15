import type { CommonSearchParams } from '@/common/types';
import type { SuccessResponse } from '@/common/types';
import type { Fine } from '@/common/types/api/fine';
import {
  type Transaction,
  TransactionMethod,
} from '@/common/types/api/transaction';

import { HttpClient } from './core.http';

class FineHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllFinesOfCurrentUser(
    accessToken: string,
    params?: CommonSearchParams,
  ) {
    return this.get<SuccessResponse<Fine[]>>('/me/fines', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public payFine(
    accessToken: string,
    id: string,
    method: TransactionMethod,
    redirectUrl: string,
  ) {
    return this.post<SuccessResponse<Transaction>>(
      `/fines/pay/${id}`,
      {
        method,
        redirectUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  public getFineById(accessToken: string, id: string) {
    return this.get<SuccessResponse<Fine>>(`/fines/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

const fineHttpClient = new FineHttpClient();
export { fineHttpClient, FineHttpClient };
