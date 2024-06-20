<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import RegisterForm from './RegisterForm.svelte';

	export let data;
</script>

<div class="my-10 content-grid">
	<div class="w-full max-w-sm mx-auto">
		<h1 class="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Log in</h1>
		<RegisterForm data={data.form} />
		<p class="mt-10 text-center text-sm text-gray-400">
			Already a member?
			<Button href="/auth/login" variant="link" class="px-0">Log in</Button>
		</p>
	</div>
</div>
