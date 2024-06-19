<script lang="ts">
	import ProfileForm from './ProfileForm.svelte';

	export let data;
</script>

<div class="my-10 content-grid">
	<h1 class="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Profile</h1>
	<ProfileForm data={data.form} currentUsername={data.profile?.username} />
</div>
