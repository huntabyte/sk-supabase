import type { PageServerLoad } from '../$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const getUsersItems = async (userId: string) => {
		const items = await prisma.item.findMany({
			where: {
				userId: userId
			}
		});
		return items;
	};

	return {
		items: getUsersItems(locals.session?.user.id as string)
	};
};
