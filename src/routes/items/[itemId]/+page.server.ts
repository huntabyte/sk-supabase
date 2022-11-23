import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const getItem = async (itemId: string) => {
		const item = await prisma.item.findUnique({
			where: {
				id: itemId
			}
		});
		return item;
	};
	return {
		item: getItem(params.itemId)
	};
};
