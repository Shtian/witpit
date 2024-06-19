import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { createWitSchema } from './schema';
import { createWit } from '$lib/supabase/wit';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		redirect(401, '/auth/login');
	}

	return {
		title: 'Add Wit',
		form: await superValidate(zod(createWitSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createWitSchema));
		console.log(form);
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Invalid form' });
		}
		const { name, content, category, tags, reference } = form.data;
		const {
			locals: { supabase }
		} = event;
		const { data, error } = await supabase.auth.getUser();

		if (error || !data?.user?.id) {
			return message(
				form,
				{ type: 'error', text: 'You must be logged in to create a Wit' },
				{ status: 401 }
			);
		}

		const createRes = await createWit({ name, content, category, tags, reference }, data.user.id);
		console.log(createRes);
		if (createRes.type === 'error') {
			return message(
				form,
				{ type: 'error', text: 'An error occured during creation' },
				{ status: 500 }
			);
		}

		return message(form, {
			type: 'success',
			text: `🧠 ${category.charAt(0).toUpperCase() + category.slice(1)} created!`
		});
	}
};
