import type { CreateWitSchema } from '../../routes/wit/create/schema';
import { supabaseServerClient, type SupabaseResponse } from './supabaseServerClient';
import type { Wit, WitComment } from './wit.types';

export async function createWit(
	wit: CreateWitSchema,
	userId: string
): Promise<SupabaseResponse<number>> {
	const { data, error } = await supabaseServerClient
		.from('wits')
		.insert({
			name: wit.name,
			content: wit.content,
			category: wit.category,
			tags: wit.tags?.split(','),
			reference: wit.reference,
			user_id: userId
		})
		.select()
		.single();

	if (error !== null) {
		const r: SupabaseResponse<number> = { type: 'error', data: null, error };
		return r;
	}

	const successResponse: SupabaseResponse<number> = {
		type: 'success',
		data: data.id,
		error: null
	};
	return successResponse;
}

export async function getWit(id: string): Promise<SupabaseResponse<Wit>> {
	const { data, error } = await supabaseServerClient
		.from('wits')
		.select('id, created_at, name, content, category, tags, reference, profiles ( id, username )')
		.eq('id', id)
		.single();

	if (error !== null) {
		const r: SupabaseResponse<Wit> = { type: 'error', data: null, error };
		return r;
	}

	const { data: commentData, error: commentError } = await supabaseServerClient
		.from('wit_comments')
		.select('id, created_at, comment, profiles ( id, username )')
		.eq('wit_id', id);

	if (commentError !== null) {
		const r: SupabaseResponse<Wit> = { type: 'error', data: null, error: commentError };
		return r;
	}

	const successResponse: SupabaseResponse<Wit> = {
		type: 'success',
		data: mapToWit(data, commentData),
		error: null
	};
	return successResponse;
}

export async function getWits(): Promise<SupabaseResponse<Wit[]>> {
	const { data, error } = await supabaseServerClient
		.from('wits')
		.select('id, created_at, name, content, category, tags, reference, profiles ( id, username )')
		.order('created_at', { ascending: false });

	if (error !== null) {
		const r: SupabaseResponse<Wit[]> = { type: 'error', data: null, error };
		return r;
	}

	const successResponse: SupabaseResponse<Wit[]> = {
		type: 'success',
		data: data.map((wit) => mapToWit(wit, null)),
		error: null
	};

	return successResponse;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToWit = (data: any, commentData: any): Wit => {
	return {
		id: data.id,
		created: data.created_at,
		name: data.name,
		content: data.content,
		category: data.category,
		tags: data.tags || [],
		reference: data.reference,
		author: { username: data.profiles.username, id: data.profiles.id },
		comments: mapToWitComment(commentData)
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToWitComment = (data: any): WitComment[] => {
	if (!data) return [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return data.map((commentData: any) => ({
		id: commentData.id,
		created: commentData.created_at,
		comment: commentData.comment,
		author: { username: commentData.profiles.username, id: commentData.profiles.id }
	}));
};
