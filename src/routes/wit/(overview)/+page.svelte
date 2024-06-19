<script>
	import { Brain } from 'lucide-svelte';
	import WitDataTable from './(wit-data-table/wit-data-table.svelte';

	export let data;
</script>

<div class="content-grid mt-10">
	<h1
		class="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center flex items-center justify-center gap-2"
	>
		<Brain class="inline size-10 mr-2" /><span class="">The Wit Pit</span>
	</h1>
	<WitDataTable wits={data.wits} />
</div>
