<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';

	let loading = false;

	const submitLogin: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('A magic link has been sent to your email!');
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			await update();
			loading = false;
		};
	};
</script>

<form action="?/login" method="POST" class="row flex-center flex" use:enhance={submitLogin}>
	<div class="col-6 form-widget">
		<h1 class="header">Supabase + SvelteKit</h1>
		<p class="description">Sign in via magic link with your email below</p>
		<div>
			<input class="inputField" type="email" name="email" id="email" placeholder="Your email" />
			<div>
				<input
					type="submit"
					class="button block"
					value={loading ? 'Loading' : 'Send magic link'}
					disabled={loading}
				/>
			</div>
		</div>
	</div>
</form>
