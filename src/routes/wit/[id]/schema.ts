import { z } from 'zod';

export const createCommentSchema = z.object({
	comment: z.string().max(200)
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
