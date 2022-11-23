import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const getAllItems = async () => {
		return await prisma.item.findMany();
	};

	return {
		items: getAllItems()
	};
};
