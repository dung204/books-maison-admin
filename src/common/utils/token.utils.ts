import { envVariables } from '@/common/utils/env.util';

export class TokenUtils {
  private static readonly textEncoder = new TextEncoder();

  public static getJwtAccessSecret() {
    return this.textEncoder.encode(envVariables.JWT_ACCESS_SECRET);
  }

  public static getJwtRefreshSecret() {
    return this.textEncoder.encode(envVariables.JWT_REFRESH_SECRET);
  }
}
