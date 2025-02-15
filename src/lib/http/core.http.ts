import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  HttpStatusCode,
} from 'axios';

import { envVariables } from '@/common/utils';

class HttpClient {
  protected axiosInstance: AxiosInstance;

  constructor(
    baseURL: string = envVariables.API_ENDPOINT,
    { headers, ...otherConfigs }: Omit<CreateAxiosDefaults, 'baseURL'> = {},
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...otherConfigs,
    });

    this.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseFailed,
    );
  }

  public setupRequestInterceptors(
    ...args: Parameters<typeof this.axiosInstance.interceptors.request.use>
  ) {
    this.axiosInstance.interceptors.request.use(...args);
  }

  protected onResponseSuccess(response: AxiosResponse) {
    return response.data;
  }

  protected async onResponseFailed(error: AxiosError) {
    if (
      (!error.status || error.status === HttpStatusCode.InternalServerError) &&
      typeof window !== 'undefined'
    ) {
      const { toast } = await import('sonner');
      toast.error('Unexpected error happened!');
      console.error(error);
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T, T>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T, T>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axiosInstance.patch<T, T>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T, T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<T, T>(url, config);
  }
}

const httpClient = new HttpClient();
export { httpClient, HttpClient };
