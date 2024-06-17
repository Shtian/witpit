<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import RegisterForm from './RegisterForm.svelte';

	export let data;
</script>

<div class="my-10 content-grid">
	<div class="sm:max-w-sm mx-auto">
		<h2
			class="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Register an account
		</h2>
		<RegisterForm data={data.form} />
		<p class="mt-10 text-center text-sm text-gray-400">
			Already a member?
			<Button href="/auth/login" variant="link" class="px-0">Log in</Button>
		</p>
	</div>
</div>
