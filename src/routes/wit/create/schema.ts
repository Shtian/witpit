import { z } from 'zod';
export const witCategories = ['wit', 'win', 'wipeout'] as const;
const witCategorySchema = z.enum(witCategories);
export type WitCategorySchema = z.infer<typeof witCategorySchema>;

export const createWitSchema = z.object({
	name: z.string().min(3),
	content: z.string(),
	category: witCategorySchema,
	tags: z.string().nullable(),
	reference: z.string().url().nullable()
});

export type CreateWitSchema = z.infer<typeof createWitSchema>;
