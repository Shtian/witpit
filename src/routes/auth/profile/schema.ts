import { z } from 'zod';

export const profileForm = z.object({
	username: z.string().min(3)
});

export type ProfileForm = typeof profileForm;
