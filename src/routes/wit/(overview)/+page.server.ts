import { getWits } from '$lib/supabase/wit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		redirect(401, '/auth/login');
	}

	const witRes = await getWits();

	if (witRes.type === 'error') {
		error(404, 'No Wits found');
	}

	return {
		title: 'Overview',
		wits: witRes.data
	};
};
