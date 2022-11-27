import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	await locals.sb.auth.signOut();
	locals.session = null;
	locals.sb = null;

	throw redirect(303, '/');
};
