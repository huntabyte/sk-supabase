<script lang="ts">
	import { applyAction, deserialize, enhance, type SubmitFunction } from '$app/forms';
	import { Fileupload, Input, Label, Spinner } from 'flowbite-svelte';
	import Button from 'flowbite-svelte/buttons/Button.svelte';
	import type { ActionData, PageData } from './$types';
	import Compressor from 'compressorjs';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	let compressedImg: File;

	const handleImgUpload = (e: Event) => {
		const file = e.target?.files[0];
		new Compressor(file, {
			quality: 0.7,
			mimeType: 'image/webp',

			// The compression process is asynchronous,
			// which means you have to access the `result` in the `success` hook function.
			success(result: File) {
				// The third parameter is required for server
				compressedImg = result;
			},
			error(err) {
				console.log(err.message);
			}
		});
	};

	const submitUpdateItem: SubmitFunction = async ({ data, action, cancel }) => {
		cancel();
		const formData = data;
		formData.delete('image');
		formData.append('image', compressedImg, compressedImg.name);

		const response = await fetch(action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	};

	$: ({ item } = data);
</script>

<form
	method="POST"
	class="w-full max-w-lg mx-auto mt-12"
	enctype="multipart/form-data"
	action="?/updateItem"
	use:enhance={submitUpdateItem}
>
	<h1 class="text-3xl font-medium text-center dark:text-white">Edit an Item</h1>
	<div class="grid gap-6 mb-6 ">
		<div>
			<Label for="name" class="mb-2">Name</Label>
			<Input
				type="text"
				id="name"
				name="name"
				required
				value={item.name ?? form?.data?.name}
				disabled={loading}
			/>
		</div>
		<div>
			<Label class="pb-2">Image</Label>
			<Fileupload
				id="image"
				name="image"
				accept="image/*"
				type="file"
				on:change={(e) => handleImgUpload(e)}
			/>
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
