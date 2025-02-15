import type { SuccessResponse } from '@/common/types';
import type { Book, BookSearchParams } from '@/common/types/api/book';

import { HttpClient } from './core.http';

class BookHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllBooks(params?: BookSearchParams, accessToken?: string) {
    return this.get<SuccessResponse<Book[]>>('/books', {
      params,
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });
  }

  public getBookById(id: string, accessToken?: string) {
    return this.get<SuccessResponse<Book>>(`/books/${id}`, {
      headers: {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });
  }
}

const bookHttpClient = new BookHttpClient();
export { BookHttpClient, bookHttpClient };
