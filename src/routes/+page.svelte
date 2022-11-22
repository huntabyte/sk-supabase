<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Account from './Account.svelte';
	import Auth from './Auth.svelte';
	export let data: PageData;
	import { Alert } from 'flowbite-svelte';

	$: ({ profile } = data);
</script>

<svelte:head>
	<title>Supabase + SvelteKit</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

<div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
	</Alert>
</div>

{#if !$page.data.session}
	<Auth />
{:else}
	<Account session={$page.data.session} {profile} />
{/if}
