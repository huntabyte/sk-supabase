import { prisma } from '$lib/server/prisma';
import { error, invalid } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw error(401, 'Unauthorized');
	}
};

export const actions: Actions = {
	createItem: async ({ request, locals }) => {
		const formData = await request.formData();

		const body = Object.fromEntries(formData);
		const { image, name } = body;

		const itemData = {
			name: name as string,
			userId: locals.session?.user.id as string
		};

		const item = await prisma.item.create({
			data: itemData
		});

		const { data, error } = await locals.sb.storage
			.from('huntabucket')
			.upload(`${locals.session?.user.id}/items/${item.id}.png`, image);

		if (data) {
			const updatedItem = await prisma.item.update({
				where: {
					id: item.id
				},
				data: {
					image: data.path
				}
			});
		}

		if (error) {
			throw invalid(400, itemData);
		}
		return {
			success: true
		};
	}
};
