<script lang="ts">
	import '../app.postcss';
	import { supabase } from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Toaster />
<div>
	<slot />
</div>
