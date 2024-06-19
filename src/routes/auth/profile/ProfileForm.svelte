<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient, type Infer } from 'sveltekit-superforms/adapters';
	import { profileForm, type ProfileForm } from './schema';
	import { LoaderCircle } from 'lucide-svelte';
	import { toast } from '$lib/stores/ToastStore';
	export let data: SuperValidated<Infer<ProfileForm>>;
	export let currentUsername: string;

	const form = superForm(data, {
		validators: zodClient(profileForm),
		resetForm: false,
		onUpdated: (event) => {
			if (event.form.valid) {
				toast.send({
					message: `Profile updated!`,
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
	$formData.username = !!currentUsername ? currentUsername : $formData.username;
</script>

<form method="POST" use:enhance class="max-w-sm">
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4" disabled={$delayed}
		>Update {#if $delayed}<LoaderCircle class="animate-spin" />{/if}</Form.Button
	>
</form>
