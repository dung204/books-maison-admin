export interface PaginationSearchParams {
  page?: string;
  pageSize?: string;
}

export interface SortingSearchParams {
  orderBy?: string;
  order?: string;
}

export interface CommonSearchParams
  extends PaginationSearchParams,
    SortingSearchParams {}
