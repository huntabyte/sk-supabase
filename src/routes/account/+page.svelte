<script lang="ts">
	import { Account } from '$lib/components';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ profile } = data);
</script>

<Account {profile} />
