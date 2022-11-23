<script lang="ts">
	import type { PageData } from './$types';
	import Button from 'flowbite-svelte/buttons/Button.svelte';
	import { A } from 'flowbite-svelte';
	export let data: PageData;

	$: ({ items } = data);
</script>

<div class="w-full mx-auto mt-6 flex flex-col items-center">
	<h1 class="text-white text-center">Items</h1>
	<div class="max-w-lg mt-6">
		<Button href="/items/new" gradient color="purpleToBlue" class="w-full">New Item</Button>
	</div>
	<div class="mt-12 dark:text-white">
		<ul>
			{#if items}
				{#each items as item}
					<li>
						<A href="/items/{item.id}">
							{item.name}
						</A>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
