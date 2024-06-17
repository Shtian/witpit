<script>
	import { Button } from '$lib/components/ui/button';
	import { LogIn } from 'lucide-svelte';
</script>

<div class="content-grid mt-10">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
		The Wit Pit 🧠
	</h1>
	<Button href="/auth/login" class="w-fit mx-auto my-10">Log in <LogIn class="ml-2"></LogIn></Button
	>
</div>
