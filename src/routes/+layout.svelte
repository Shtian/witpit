<script lang="ts">
	import SiteHeader from '$lib/components/site-header/SiteHeader.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import { invalidate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Toast from '$lib/components/toast/Toast.svelte';
	import { page } from '$app/stores';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: title = $page.data.title;

	const baseUrl = 'https://witpit.vercel.app';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>{title ? `${title} - ` : ''}WitPit</title>
	<meta
		name="description"
		content={$page.data.description || 'Collect and share your knowledge in the WitPit!'}
	/>
	<link rel="canonical" href={baseUrl + $page.url.pathname} />
	<meta property="og:site_name" content="WitPit" />
	<meta property="og:locale" content="en" />
	<meta property="og:url" content={baseUrl + $page.url.pathname} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{title ? `${title} - ` : ''}WitPit" />
	<meta
		property="og:description"
		content={$page.data.description || 'Collect and share your knowledge in the WitPit!'}
	/>
</svelte:head>

<ModeWatcher />
<SiteHeader {session} />
<Toast />

<div class="relative flex min-h-screen flex-col bg-background">
	<slot />
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
