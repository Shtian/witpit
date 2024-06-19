<script>
	import WitDataTable from './(wit-data-table/wit-data-table.svelte';

	export let data;
</script>

<div class="content-grid mt-10">
	<h1 class="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
		The Wit Pit 🧠
	</h1>
	<WitDataTable wits={data.wits} />
</div>
