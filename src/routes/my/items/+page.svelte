<script lang="ts">
	import { A } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ items } = data);
</script>

<div class="w-full mx-auto text-white text-center">
	<h1 class="font-bold text-2xl">My Items:</h1>

	<ul>
		{#each items as item}
			<li>
				<A href="/items/{item.id}">
					{item.name}
				</A>
			</li>
		{/each}
	</ul>
</div>
