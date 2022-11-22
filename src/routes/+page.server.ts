import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.session) {
		return {
			session: null,
			profile: null
		};
	}

	const getUserProfile = async () => {
		try {
			const user = await prisma.profile.findUnique({
				where: {
					id: locals.session?.user.id
				}
			});
			return user;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		session: locals.session,
		profile: getUserProfile()
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			await prisma.profile.update({
				where: {
					id: locals.session?.user.id
				},
				data: formData
			});
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
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
