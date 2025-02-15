import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required'),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must contain at least 6 characters'),
    confirmPassword: z
      .string({ required_error: 'New password is required' })
      .min(1, 'Confirm password is required')
      .max(100, 'Password must not exceed 100 characters'),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'Confirm password must match with new password',
      path: ['confirmPassword'],
    },
  )
  .refine(({ password, newPassword }) => password !== newPassword, {
    message: 'New password must be different from the old password',
    path: ['newPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
