import type { SuccessResponse } from '@/common/types';
import type {
  Category,
  CategorySearchParams,
} from '@/common/types/api/category';

import { HttpClient } from './core.http';

class CategoryHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public getAllCategories(params?: CategorySearchParams) {
    return this.get<SuccessResponse<Category[]>>('/categories', {
      params,
    });
  }

  public getCategoryById(id: string) {
    return this.get<SuccessResponse<Category>>(`/categories/${id}`);
  }
}

const categoryHttpClient = new CategoryHttpClient();
export { CategoryHttpClient, categoryHttpClient };
