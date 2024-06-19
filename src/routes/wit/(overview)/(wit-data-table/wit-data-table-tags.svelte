<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let tags: string[];
</script>

<div class="flex gap-2 max-w-32 overflow-x-auto items-center">
	{#each tags as tag}<Badge class="whitespace-nowrap">{tag}</Badge>{/each}
</div>
