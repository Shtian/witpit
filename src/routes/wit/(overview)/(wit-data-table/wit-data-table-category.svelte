<script lang="ts">
	import { Skull, Brain, Trophy } from 'lucide-svelte';
	import type { WitCategorySchema } from '../../create/schema';

	export let category: WitCategorySchema;
</script>

{#if category === 'wit'}
	<Brain />
{:else if category === 'win'}
	<Trophy />
{:else if category === 'wipeout'}
	<Skull />
{/if}
