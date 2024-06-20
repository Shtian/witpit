<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { registerSchema } from './schema';
	import InlineMessage from '$lib/components/inline-message/InlineMessage.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	export let data: SuperValidated<Infer<typeof registerSchema>>;

	const form = superForm(data, { validators: zodClient(registerSchema) });
	const { form: formData, enhance, message, delayed } = form;
</script>

{#if $message}
	<InlineMessage msgType={$message.type === 'success' ? 'success' : 'error'}
		>{$message.text}</InlineMessage
	>
{/if}
<form method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} type="email" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type="password" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4" disabled={$delayed}
		>Submit {#if $delayed}<LoaderCircle class="animate-spin" />{/if}</Form.Button
	>
</form>
