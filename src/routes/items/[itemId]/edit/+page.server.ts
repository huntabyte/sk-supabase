import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.session) {
		throw error(401, 'Unauthorized');
	}

	const getItem = async (itemId: string) => {
		const item = await prisma.item.findUniqueOrThrow({
			where: {
				id: itemId
			}
		});

		if (item.userId !== locals.session?.user.id) {
			throw error(403, 'Forbidden');
		}
		return item;
	};

	return {
		item: getItem(params.itemId)
	};
};

export const actions: Actions = {
	updateItem: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const img = formData.get('image') as Blob;

		if (img.size !== 0) {
			const { data, error: err } = await locals.sb.storage
				.from('huntabucket')
				.upload(`${locals.session?.user.id}/items/${params.itemId}.webp`, img);
			if (err) {
				throw error(500, 'Something went wrong uploading your image');
			}
		}

		const formObj = Object.fromEntries(formData);
		const { image, ...rest } = formObj;

		const updateUser = await prisma.item.update({
			where: {
				id: params.itemId
			},
			data: {
				...rest
			}
		});

		return {
			success: true
		};
	}
};
