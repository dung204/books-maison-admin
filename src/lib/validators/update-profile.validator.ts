import { z } from 'zod';

import { registerSchema } from './register.validator';

export const updateProfileSchema = registerSchema.omit({
  password: true,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
