<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createCommentSchema, type CreateCommentSchema } from './schema';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { toast } from '$lib/stores/ToastStore';
	import { LoaderCircle } from 'lucide-svelte';
	import { getAvatarUrl } from '$lib/utils/avatar-utils';

	export let data: SuperValidated<CreateCommentSchema>;
	export let currentUser: string = '';

	const form = superForm(data, {
		validators: zodClient(createCommentSchema),
		onUpdated: (event) => {
			if (event.form.valid) {
				toast.send({
					message: `Comment added!`,
					type: 'success'
				});
			} else {
				toast.send({
					message: 'Please fix the errors in the comment form.',
					type: 'error'
				});
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
	const maxLength = 200;
	$: currentLength = $formData.comment.length || 0;
</script>

<div class="mt-6 flex gap-x-4">
	<img
		src={getAvatarUrl(currentUser)}
		alt=""
		class="relative size-8 flex-none rounded-full bg-background ring-8 ring-background"
	/>
	<form method="POST" class="relative flex-auto" use:enhance>
		<div
			class="absolute -bottom-6 right-2 text-sm top-1"
			class:text-red-400={currentLength > maxLength}
		>
			{currentLength}/{maxLength}
		</div>
		<Form.Field {form} name="comment" class="space-y-0">
			<Form.Control let:attrs>
				<Form.Label class="sr-only">Add your comment</Form.Label>
				<Textarea
					{...attrs}
					bind:value={$formData.comment}
					class="pr-24 sm:pr-32"
					placeholder="Add your comment..."
				/>
			</Form.Control>
			<Form.FieldErrors class="absolute -bottom-6 left-2" />
		</Form.Field>
		<div class="absolute right-0 bottom-0 p-2">
			<Form.Button class="mt-4" disabled={$delayed}
				>Submit {#if $delayed}<LoaderCircle class="animate-spin" />{/if}</Form.Button
			>
		</div>
	</form>
</div>
