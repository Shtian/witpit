<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './schema';
	import { dev } from '$app/environment';
	import InlineMessage from '$lib/components/inline-message/InlineMessage.svelte';
	export let data: SuperValidated<Infer<LoginSchema>>;

	const form = superForm(data, { validators: zodClient(loginSchema) });
	const { form: formData, message } = form;
</script>

<SuperDebug collapsible collapsed theme="vscode" data={form} display={dev} />

{#if $message}
	<InlineMessage msgType={$message.type === 'success' ? 'success' : 'error'}
		>{$message.text}</InlineMessage
	>
{/if}
<form method="POST">
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
	<Form.Button class="mt-4">Submit</Form.Button>
</form>
