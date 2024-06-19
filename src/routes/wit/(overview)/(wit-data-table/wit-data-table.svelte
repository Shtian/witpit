<script lang="ts">
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { Wit } from '$lib/supabase/wit.types';
	import WitDataTableLink from './wit-data-table-link.svelte';
	import WitDataTableCategory from './wit-data-table-category.svelte';
	import WitDataTableTags from './wit-data-table-tags.svelte';
	export let wits: Wit[];

	const table = createTable(readable(wits));

	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour12: false
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'category',
			header: 'Category',
			cell: ({ value }) => {
				return createRender(WitDataTableCategory, { category: value });
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'tags',
			header: 'Tags',
			cell: ({ value }) => {
				return createRender(WitDataTableTags, { tags: value });
			}
		}),
		table.column({
			accessor: ({ author }) => author.username,
			header: 'User'
		}),
		table.column({
			accessor: ({ created }) => formatter.format(new Date(created)),
			header: 'Date'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(WitDataTableLink, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
