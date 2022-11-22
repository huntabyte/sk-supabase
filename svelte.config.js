import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			lib: 'src/lib'
		}
	},

	preprocess: [
		preprocess({
			postcss: true,
			typescript: true
		})
	]
};

export default config;
