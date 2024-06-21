<script>
	import { Button } from '$lib/components/ui/button';
	import { Brain, LogIn } from 'lucide-svelte';

	export let data;
</script>

<div class="content-grid mt-10">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
		The Wit Pit 🧠
	</h1>
	{#if data.session}
		<Button href="/wit" class="w-fit mx-auto my-10">Browse wits <Brain class="ml-2" /></Button
		>{:else}
		<Button href="/auth/login" class="w-fit mx-auto my-10"
			>Log in <LogIn class="ml-2"></LogIn></Button
		>{/if}
</div>
