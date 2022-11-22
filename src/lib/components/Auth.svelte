<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Label, Spinner, Input } from 'flowbite-svelte';
	import Button from 'flowbite-svelte/buttons/Button.svelte';
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

<form
	method="POST"
	action="?/login"
	class="w-full max-w-lg mx-auto mt-12"
	use:enhance={submitLogin}
>
	<h1 class="text-3xl font-medium text-center dark:text-white">Login</h1>
	<p class="text-center dark:text-white">We will send you a magic link to login!</p>
	<div class="grid gap-6 mb-6 ">
		<div>
			<Label for="email" class="mb-2">Email</Label>
			<Input type="text" id="email" name="email" required disabled={loading} />
		</div>
		<Button type="submit" disabled={loading} gradient color="purpleToBlue" class="w-full">
			{#if loading}
				<Spinner class="mr-3" size="4" color="white" />Loading ...
			{:else}
				Submit
			{/if}
		</Button>
	</div>
</form>
