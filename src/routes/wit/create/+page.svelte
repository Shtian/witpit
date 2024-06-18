<script lang="ts">
	import CreateWitForm from './CreateWitForm.svelte';
	export let data;
</script>

<div class="content-grid my-10">
	<CreateWitForm data={data.form} />
</div>
