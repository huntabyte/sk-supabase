<script lang="ts">
	import type { PageData } from './$types';
	import { getFileURL } from '$lib/utils';

	export let data: PageData;

	$: ({ item } = data);
</script>

<h1 class="text-white text-3xl">{item?.name}</h1>
{#if item?.image}
	<img src={getFileURL(item.image)} alt="item preview" />
{/if}
