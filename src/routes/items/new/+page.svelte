<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Fileupload, Input, Label, Spinner } from 'flowbite-svelte';
	import Button from 'flowbite-svelte/buttons/Button.svelte';

	let fileuploadprops = {
		id: 'image',
		name: 'image'
	};

	let loading = false;
</script>

<form method="POST" action="?/createItem" class="w-full max-w-lg mx-auto mt-12" use:enhance>
	<h1 class="text-3xl font-medium text-center dark:text-white">Create an Item</h1>
	<div class="grid gap-6 mb-6 ">
		<div>
			<Label for="name" class="mb-2">Name</Label>
			<Input
				type="text"
				id="name"
				name="name"
				required
				value={$page.form?.profile?.name ?? ''}
				disabled={loading}
			/>
		</div>
		<div>
			<Label class="pb-2">Image</Label>
			<Fileupload {...fileuploadprops} />
		</div>
	</div>
	<div>
		<Button type="submit" disabled={loading} gradient color="purpleToBlue" class="w-full ">
			{#if loading}
				<Spinner class="mr-3" size="4" color="white" />Loading ...
			{:else}
				Submit
			{/if}
		</Button>
	</div>
</form>
