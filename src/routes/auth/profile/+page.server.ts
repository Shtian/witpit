import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { profileForm } from './schema';
import { supabaseServerClient } from '$lib/supabase/supabaseServerClient';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		redirect(303, '/');
	}

	const { data: profile } = await supabaseServerClient
		.from('profiles')
		.select(`username`)
		.eq('id', session.user.id)
		.single();

	return { session, profile, form: await superValidate(zod(profileForm)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(profileForm));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Invalid form' });
		}

		const {
			locals: { getSession }
		} = event;
		const session = await getSession();
		const { username } = form.data;
		const { error } = await supabaseServerClient.from('profiles').upsert({
			id: session?.user.id,
			username,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, {
				username
			});
		}

		return {
			username,
			form
		};
	}
};
