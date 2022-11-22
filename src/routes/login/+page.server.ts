import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const email = formData.email as string;

		try {
			await locals.sb.auth.signInWithOtp({ email });
		} catch (err) {
			console.log('Error: ', err);

			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	}
};
