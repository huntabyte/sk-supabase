import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.session) {
		throw error(401, 'Unauthorized');
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
	}
};
