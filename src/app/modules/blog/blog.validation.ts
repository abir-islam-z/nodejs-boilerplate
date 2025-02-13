import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(5, {
      message: 'Title must be at least 5 characters',
    }),
    content: z.string().min(10, {
      message: 'Content must be at least 10 characters',
    }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: createBlogValidationSchema.shape.body
    .strip()
    .partial()
    .superRefine((data, ctx) => {
      if (!data.title && !data.content) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Title or content is required',
        });
      }
    }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
