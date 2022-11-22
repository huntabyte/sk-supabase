<script lang="ts">
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { Profile } from '@prisma/client';

	export let session: AuthSession;
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

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-widget" action="?/updateProfile" method="POST" use:enhance={submitUpdateProfile}>
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={session.user.email} disabled />
	</div>
	<div>
		<label for="username">Username</label>
		<input id="username" type="text" value={profile?.username} />
	</div>
	<div>
		<label for="firstName">First Name</label>
		<input id="firstName" type="text" value={profile?.firstName} />
	</div>
	<div>
		<label for="lastName">Last Name</label>
		<input id="lastName" type="text" value={profile?.lastName} />
	</div>
	<div>
		<label for="website">Website</label>
		<input id="website" type="website" value={profile?.website} />
	</div>

	<div>
		<input
			type="submit"
			class="button block primary"
			value={loading ? 'Loading...' : 'Update'}
			disabled={loading}
		/>
	</div>
</form>
<form action="/logout" method="POST" class="form-widget">
	<div>
		<button type="submit" class="button block " disabled={loading}>Sign Out</button>
	</div>
</form>
