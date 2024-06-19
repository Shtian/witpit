import type { WitCategorySchema } from '../../routes/wit/create/schema';

type ISO8601 = string;

export type WitComment = {
	id: number;
	created: ISO8601;
	comment: string;
	author: Author;
};

type Author = { username: string | null; id: string };

export type Wit = {
	id: number;
	created: ISO8601;
	name: string;
	content: string;
	category: WitCategorySchema;
	tags: string[];
	reference: string;
	author: Author;
	comments: WitComment[];
};
