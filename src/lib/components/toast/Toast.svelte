<script lang="ts">
	import Portal from '../portal/Portal.svelte';
	import { toast } from '$lib/stores/ToastStore';
	import VisuallyHidden from '../visually-hidden/VisuallyHidden.svelte';
	import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import ToastMessage from '$lib/components/toast/ToastMessage.svelte';
	import ToastProgress from '$lib/components/toast/ToastProgress.svelte';
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			toast.remove();
		}
	}}
/>

<Portal>
	<div class="fixed left-1/2 top-5 z-toast -translate-x-1/2">
		{#each $toast as toastContent (toastContent.id)}
			<div
				class="relative mb-2 flex w-80 items-start justify-between gap-x-4 rounded-sm border border-border px-2 py-4 backdrop-blur-3xl"
				in:fly={{ opacity: 0, y: -100 }}
				out:fade={{ duration: 300 }}
				animate:flip={{ duration: 300 }}
			>
				{#if toastContent.type === 'success'}
					<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-green-600" />
				{:else if toastContent.type === 'error'}
					<AlertTriangle class="h-6 w-6 flex-shrink-0 text-red-400" />
				{:else if toastContent.type === 'info'}
					<Info class="h-6 w-6 flex-shrink-0" />
				{:else}
					<Info class="h-6 w-6 flex-shrink-0 text-green-600" />
				{/if}
				<ToastMessage
					class="text-pretty text-sm"
					message={toastContent.message}
					duration={toastContent.duration}
				/>
				<button class="p-1" on:click={() => toast.remove(toastContent.id)}
					><X class="h-4 w-4 text-foreground/60 transition-colors hover:text-foreground"
					></X><VisuallyHidden>Close message</VisuallyHidden></button
				>
				<ToastProgress duration={toastContent.duration} />
			</div>
		{/each}
	</div>
</Portal>
