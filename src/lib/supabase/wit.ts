import type { CreateWitSchema } from '../../routes/wit/create/schema';
import { supabaseServerClient, type SupabaseResponse } from './supabaseClient';
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
