import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Email is invalid'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must contain at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required')
    .max(128, 'First name must not exceed 128 characters'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required')
    .max(128, 'Last name must not exceed 128 characters.'),
  address: z.string().max(256).optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
