import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .superRefine((data, ctx) => {
        if (data?.toLocaleLowerCase().includes('password')) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must not contain the word "password" 🤬',
          });
        }
      }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
};
