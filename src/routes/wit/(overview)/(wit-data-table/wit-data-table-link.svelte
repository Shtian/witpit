<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Eye } from 'lucide-svelte';

	export let id;
	const link = `/wit/${id}`;
</script>

<Button href={link} variant="ghost"><Eye /><span class="sr-only">View Wit</span></Button>
