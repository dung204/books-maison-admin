import { z } from 'zod';

import { OAuthAction } from '@/common/types/api/auth/oauth-action.type';

export const googleCallbackStateValidatorSchema = z.object({
  action: z.enum([
    OAuthAction.AUTHENTICATE,
    OAuthAction.LINK,
    OAuthAction.OVERRIDE,
  ]),
  redirectUri: z.string().url().optional(),
});

export const googleCallbackValidatorSchema = z.object({
  code: z.string(),
  state: z.string().base64(),
});

export type GoogleCallback = z.infer<typeof googleCallbackValidatorSchema>;

export type GoogleCallbackState = z.infer<
  typeof googleCallbackStateValidatorSchema
>;
