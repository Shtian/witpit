<script lang="ts">
	import { type WitComment } from '$lib/supabase/wit.types';
	import { getAvatarUrl } from '$lib/utils/avatar-utils';
	import { fly } from 'svelte/transition';

	export let comments: WitComment[] = [];

	function toDate(date: string) {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<ul role="list" class="space-y-6">
	{#each comments as comment (comment.id)}
		<li in:fly={{ y: 100, duration: 300 }} class="relative flex gap-x-4">
			<div class="absolute -bottom-6 left-0 top-0 flex w-8 justify-center">
				<div class="w-px bg-foreground/40"></div>
			</div>
			<img
				src={getAvatarUrl(comment.author.id)}
				alt=""
				class="relative size-8 flex-none rounded-full bg-background ring-8 ring-background"
			/>
			<div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-border">
				<div class="flex justify-between gap-x-4">
					<div class="py-0.5 text-xs leading-5 text-foreground">
						<span class="font-bold text-foreground">{comment.author.username}</span> commented
					</div>
					<time
						datetime={comment.created}
						class="flex-none py-0.5 text-xs leading-5 text-foreground"
						>{toDate(comment.created)}</time
					>
				</div>
				<p class="text-sm leading-6 text-foreground">
					{comment.comment}
				</p>
			</div>
		</li>
	{/each}
</ul>
