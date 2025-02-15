import type { SuccessResponse } from '@/common/types';
import type { Book, BookSearchParams } from '@/common/types/api/book';

import { HttpClient } from './core.http';

class FavouriteBookHttpClient extends HttpClient {
  constructor() {
    super();
  }

  getAllFavouriteBooksOfCurrentUser(
    accessToken: string,
    params: BookSearchParams,
  ) {
    return this.get<SuccessResponse<Book[]>>('/me/books/favourite', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public addBookToFavourite(accessToken: string, bookId: string) {
    return this.post<void>(`/me/books/favourite/${bookId}`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public removeBookFromFavourite(accessToken: string, bookId: string) {
    return this.delete<void>(`/me/books/favourite/${bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public checkHasFavoured(accessToken: string, bookId: string) {
    return this.get<SuccessResponse<boolean>>(
      `/favourite-books/check/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}

const favouriteBookHttpClient = new FavouriteBookHttpClient();
export { favouriteBookHttpClient, FavouriteBookHttpClient };
