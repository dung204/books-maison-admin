import type { SuccessResponse } from '@/common/types';
import type { Media } from '@/common/types/api/media';
import { HttpClient } from '@/lib/http/core.http';

class MediaHttpClient extends HttpClient {
  constructor() {
    super();
  }

  public upload(accessToken: string, file: File, folder?: string) {
    const formData = new FormData();
    formData.set('file', file);

    return this.post<SuccessResponse<Media>>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        folder,
      },
    });
  }
}

const mediaHttpClient = new MediaHttpClient();
export { mediaHttpClient, MediaHttpClient };
