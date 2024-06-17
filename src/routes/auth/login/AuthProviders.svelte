<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from '$lib/stores/ToastStore.js';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import googleLogo from '$lib/assets/google_logo.svg';
	import githubLogo from '$lib/assets/github_logo.svg';

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	export let supabase: SupabaseClient<any, 'public', any>;

	type OAuthProvider = 'github' | 'google';

	const oAuthLogin = async (provider: OAuthProvider) => {
		const options =
			provider === 'google'
				? {
						queryParams: {
							access_type: 'offline',
							prompt: 'consent'
						}
					}
				: {};

		const { error } = await supabase.auth.signInWithOAuth({ provider, options });
		if (error) {
			toast.send({ message: `Error logging in with ${provider}: ${error.message}`, type: 'error' });
		}
	};
</script>

<Button variant="outline" on:click={() => oAuthLogin('google')}
	><img
		class="mr-3 size-6"
		width="24"
		height="24"
		src={googleLogo}
		alt="Google logo"
	/>Google</Button
>
<Button variant="outline" on:click={() => oAuthLogin('github')}
	><img
		class="mr-3 size-6"
		width="24"
		height="24"
		src={githubLogo}
		alt="Github logo"
	/>GitHub</Button
>
