import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { loginSchema } from './schema';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the games page
	if (session) {
		redirect(303, '/wit');
	}

	return {
		title: 'Login',
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Invalid form' });
		}

		const { email, password } = form.data;
		const {
			locals: { supabase }
		} = event;
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return message(form, { type: 'error', text: error.message }, { status: 400 });
		}
		return message(form, { type: 'success', text: 'Successfully logged in!' });
	}
};
