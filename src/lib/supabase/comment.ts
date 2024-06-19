import { supabaseServerClient, type SupabaseResponse } from './supabaseServerClient';

export async function createComment(
	comment: string,
	userId: string,
	witId: string
): Promise<SupabaseResponse<number>> {
	const { data, error } = await supabaseServerClient
		.from('wit_comments')
		.insert({
			comment,
			user_id: userId,
			wit_id: witId
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
