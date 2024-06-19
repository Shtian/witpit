<script lang="ts">
	import { toWitCategory } from '$lib/utils/string-utils.js';
	import { MessagesSquare } from 'lucide-svelte';
	import CommentForm from './comment-form.svelte';
	import Comments from './comments.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let data;
	$: comments = data.wit.comments;
	const { wit } = data;
	const tags = data.wit.tags || [];
	const created = new Date(wit.created);
	const readableDate = created.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const currentUser = data.session?.user.id;
</script>

<div class="content-grid my-10">
	<div>
		<h1 class=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{wit.name}
		</h1>
	</div>
	<div class="mt-6">
		<dl class="grid grid-cols-1 sm:grid-cols-2">
			<div class="py-6 sm:col-span-1">
				<dt class="text-sm font-medium leading-6 text-foreground">Author</dt>
				<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2">{wit.author.username}</dd>
			</div>
			<div class="py-6 sm:col-span-1">
				<dt class="text-sm font-medium leading-6 text-foreground">Date</dt>
				<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2">
					<time datetime={wit.created}>{readableDate}</time>
				</dd>
			</div>
			<div class="border-t border-border py-6 sm:col-span-1">
				<dt class="text-sm font-medium leading-6 text-foreground">Category</dt>
				<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2">
					{toWitCategory(wit.category)}
				</dd>
			</div>
			<div class="border-t border-border py-6 sm:col-span-1">
				<dt class="text-sm font-medium leading-6 text-foreground">Tags</dt>
				<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2 flex flex-wrap gap-2">
					{#each tags as tag}<Badge>{tag}</Badge>{/each}
				</dd>
			</div>
			<div class="border-t border-border py-6 sm:col-span-2">
				<dt class="text-sm font-medium leading-6 text-foreground">Content</dt>
				<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2">{wit.content}</dd>
			</div>
			{#if wit.reference}
				<div class="border-t border-border py-6 sm:col-span-2">
					<dt class="text-sm font-medium leading-6 text-foreground">Reference</dt>
					<dd class="mt-1 text-sm leading-6 text-foreground/80 sm:mt-2">{wit.reference}</dd>
				</div>
			{/if}
		</dl>
	</div>

	<h2
		class="my-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		<MessagesSquare class="inline size-8 mr-2" /> Comments
	</h2>
	<Comments {comments} />
	<CommentForm data={data.form} {currentUser} />
</div>
