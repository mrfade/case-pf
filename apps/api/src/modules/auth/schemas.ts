import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100)
});
