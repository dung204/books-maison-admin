import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production']),
    NEXT_PUBLIC_API_ENDPOINT: z.string().nonempty(),
    NEXT_PUBLIC_JWT_ACCESS_SECRET: z.string().nonempty(),
    NEXT_PUBLIC_JWT_REFRESH_SECRET: z.string().nonempty(),
  })
  .transform(
    ({
      NEXT_PUBLIC_API_ENDPOINT,
      NEXT_PUBLIC_JWT_ACCESS_SECRET,
      NEXT_PUBLIC_JWT_REFRESH_SECRET,
      ...env
    }) => ({
      ...env,
      API_ENDPOINT: NEXT_PUBLIC_API_ENDPOINT,
      JWT_ACCESS_SECRET: NEXT_PUBLIC_JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: NEXT_PUBLIC_JWT_REFRESH_SECRET,
    }),
  );

export const envVariables = envSchema.parse(process.env);
