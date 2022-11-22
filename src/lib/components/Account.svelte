<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Label, Input, Button, Spinner } from 'flowbite-svelte';
	import type { Profile } from '@prisma/client';

	export let profile: Profile | null;

	let loading = false;

	const submitUpdateProfile: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Updated Successfully!');
					await invalidateAll();
					break;
				case 'error':
					toast.error('Error updating profile!');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<form
	method="POST"
	action="?/updateProfile"
	class="w-full max-w-lg mx-auto mt-12"
	use:enhance={submitUpdateProfile}
>
	<h1 class="text-3xl font-medium text-center dark:text-white">Account</h1>
	<div class="grid gap-6 mb-6 ">
		<div>
			<Label for="username" class="mb-2">Username</Label>
			<Input
				type="text"
				id="username"
				required
				value={$page.form?.profile?.username ?? profile?.username}
				disabled={loading}
			/>
		</div>
		<div>
			<Label for="firstName" class="mb-2">First name</Label>
			<Input
				type="text"
				id="firstName"
				name="firstName"
				required
				value={$page.form?.profile?.firstName ?? profile?.firstName}
				disabled={loading}
			/>
		</div>
		<div>
			<Label for="lastName" class="mb-2">Last name</Label>
			<Input
				type="text"
				id="lastName"
				required
				value={$page.form?.profile?.lastName ?? profile?.lastName}
				disabled={loading}
			/>
		</div>
		<div>
			<Label for="website" class="mb-2">Website URL</Label>
			<Input
				type="url"
				id="website"
				required
				value={$page.form?.profile?.website ?? profile?.website}
				disabled={loading}
			/>
		</div>
	</div>

	<Button type="submit" disabled={loading} gradient color="purpleToBlue" class="w-full">
		{#if loading}
			<Spinner class="mr-3" size="4" color="white" />Loading ...
		{:else}
			Submit
		{/if}
	</Button>
</form>
