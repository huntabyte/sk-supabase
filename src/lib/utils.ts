import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export const getFileURL = (path: string): string => {
	return `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/huntabucket/${path}`;
};
