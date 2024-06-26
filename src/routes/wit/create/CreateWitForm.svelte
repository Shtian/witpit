<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Input } from '$lib/components/ui/input';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { createWitSchema } from './schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { LoaderCircle, Sparkles } from 'lucide-svelte';
	import { toast } from '$lib/stores/ToastStore';
	import { capitalize, toWitCategory } from '$lib/utils/string-utils';
	import EnhanceFieldDialog from './EnhanceFieldDialog.svelte';

	export let data: SuperValidated<Infer<typeof createWitSchema>>;

	const form = superForm(data, {
		validators: zodClient(createWitSchema),
		onUpdated: (event) => {
			if (event.form.valid) {
				toast.send({
					message: `${capitalize(event.form.data.category)} created!`,
					type: 'success'
				});
			} else {
				toast.send({
					message: 'Please fix the errors in the form.',
					type: 'error'
				});
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" class="md:w-2/3 space-y-6" use:enhance>
	<Form.Fieldset {form} name="category" class="space-y-3">
		<Form.Legend>Category</Form.Legend>
		<Form.Control>
			<RadioGroup.Root bind:value={$formData.category} class="flex flex-col space-y-1">
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="wit" {...attrs} />
						<Form.Label class="font-normal"
							>{toWitCategory('wit')}
							<span class="text-sm text-muted-foreground">(newfound knowledge)</span></Form.Label
						>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="win" {...attrs} />
						<Form.Label class="font-normal"
							>{toWitCategory('win')}
							<span class="text-sm text-muted-foreground">(achievement, small or large)</span
							></Form.Label
						>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="wipeout" {...attrs} />
						<Form.Label class="font-normal"
							>{toWitCategory('wipeout')}
							<span class="text-sm text-muted-foreground">(mistakes you've learned from)</span
							></Form.Label
						>
					</Form.Control>
				</div>
				<RadioGroup.Input name="category" />
			</RadioGroup.Root>
		</Form.Control>
	</Form.Fieldset>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FormDescription>Short descriptive name for the entry</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="content">
		<Form.Control let:attrs>
			<Form.Label>Content</Form.Label>
			<div class="relative">
				<Textarea
					{...attrs}
					class="pr-16"
					bind:value={$formData.content}
					placeholder="Today I totally messed up X, but I learned Y!"
				/>
				<EnhanceFieldDialog
					triggerClass="absolute right-1 top-1"
					field={$formData.content}
					on:suggestion={(e) => {
						$formData.content = e.detail;
					}}
				/>
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="reference">
		<Form.Control let:attrs>
			<Form.Label>Reference (optional)</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.reference}
				placeholder="https://example.com/interesting"
			/>
		</Form.Control>
		<Form.FormDescription>Link to additional information</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label>Tags (optional)</Form.Label>
			<Input {...attrs} bind:value={$formData.tags} placeholder="programming, web" />
		</Form.Control>
		<Form.FormDescription>Comma separated list of tags</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button disabled={$delayed}
		>Add {#if $delayed}<LoaderCircle class="animate-spin ml-2" />{/if}</Form.Button
	>
</form>
