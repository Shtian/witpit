<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Sparkles } from 'lucide-svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let triggerClass = '';
	export let field = '';

	let running = false;
	let completed = false;
	let error = false;
	let suggestion = '';

	async function createSuggestion() {
		running = true;
		error = false;

		const res = await fetch('/api/ai/enhance-text', {
			method: 'POST',
			body: JSON.stringify({
				content: field
			}),
			headers: { 'content-type': 'application/json' }
		});

		if (!res.ok) {
			error = true;
			running = false;
			return;
		}

		const data = await res.json();
		suggestion = data.content;
		completed = true;
		running = false;
	}

	const dispatch = createEventDispatcher();
	let dialogOpen = false;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger
		disabled={!field}
		class={`${buttonVariants({ variant: 'ghost' })} transition ${triggerClass}`}
		><Sparkles class="size-4" /></Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				Generate a preview of the field, rewritten by OpenAI for conciceness and readability. Accept
				if you are sure you want to use it.
			</Dialog.Description>
		</Dialog.Header>
		<input type="hidden" name="field" value={field} />
		{#if !completed}<Button variant="outline" on:click={createSuggestion} disabled={running}>
				Create suggestion<Sparkles class="ml-2"></Sparkles></Button
			>
		{/if}
		{#if running}
			<div in:fade class="space-y-2 bg-background/60 border border-border p-4">
				<Skeleton class="h-4 w-[250px]" />
				<Skeleton class="h-4 w-[200px]" />
				<Skeleton class="h-4 w-[225px]" />
			</div>
		{:else if completed && suggestion}
			<div in:fade class="font-mono bg-background/60 border border-border p-4">{suggestion}</div>
		{:else if completed && !suggestion}
			<div in:fade>Could not rewrite the text</div>
		{/if}
		<Dialog.Footer
			><Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close><Button
				disabled={!suggestion}
				on:click={() => {
					dispatch('suggestion', suggestion);
					dialogOpen = false;
				}}>Use Suggestion</Button
			></Dialog.Footer
		>
	</Dialog.Content>
</Dialog.Root>
