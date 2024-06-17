<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import AuthProviders from './AuthProviders.svelte';
	import LoginForm from './LoginForm.svelte';

	export let data;

	const supabase = data.supabase;
</script>

<div class="my-10 content-grid">
	<div class="sm:max-w-sm mx-auto">
		<h2
			class="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Log in
		</h2>
		<LoginForm data={data.form} />
		<hr class="my-4" />
		<div class="flex flex-col gap-4">
			<AuthProviders {supabase} />
		</div>
		<p class="mt-10 text-center text-sm text-gray-400">
			Not a member?
			<Button href="/auth/register" variant="link" class="px-0">Register</Button>
		</p>
	</div>
</div>
