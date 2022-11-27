<script lang="ts">
	import type { PageData } from './$types';
	import { getFileURL } from '$lib/utils';
	import { Button } from 'flowbite-svelte';

	export let data: PageData;

	$: ({ item } = data);
</script>

{#if item}
	<div class="flex w-full justify-between items-center">
		<h1 class="text-white text-3xl">{item.name}</h1>
		<Button href="/items/{item.id}/edit">Edit Project</Button>
	</div>
	{#if item?.image}
		<img src={getFileURL(item.image)} alt="item preview" />
	{/if}
{/if}
