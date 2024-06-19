import { getWit } from '$lib/supabase/wit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { truncate } from '$lib/utils/string-utils';
import { createCommentSchema } from './schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createComment } from '$lib/supabase/comment';

export const load: PageServerLoad = async ({ params, locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		redirect(401, '/auth/login');
	}

	const witRes = await getWit(params.id);

	if (witRes.type === 'error') {
		error(404, 'Wit not found');
	}

	return {
		title: truncate(witRes?.data?.name, 20) || 'Wit',
		wit: witRes.data,
		form: await superValidate(zod(createCommentSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createCommentSchema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Invalid form' });
		}

		const { comment } = form.data;

		const {
			locals: { supabase }
		} = event;
		const { data, error } = await supabase.auth.getUser();

		if (error || !data?.user?.id) {
			return message(
				form,
				{ type: 'error', text: 'You must be logged in to comment' },
				{ status: 401 }
			);
		}

		const createRes = await createComment(comment, data.user.id, event.params.id);

		if (createRes.type === 'error') {
			return message(
				form,
				{ type: 'error', text: 'An error occured during creation' },
				{ status: 500 }
			);
		}

		return message(form, {
			type: 'success',
			text: `Comment added!`
		});
	}
};
