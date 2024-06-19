<script lang="ts">
	import DarkModeToggle from '../dark-mode-toggle/DarkModeToggle.svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import type { Session } from '@supabase/supabase-js';
	import { clickOutside } from '$lib/utils/clickOutside';
	import Logo from '../icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { getAvatarUrl } from '$lib/utils/avatar-utils';

	export let session: Session | null = null;

	const links = [
		{ name: 'Overview', href: '/wit' },
		{ name: 'Add', href: '/wit/create' },
		{ name: 'Profile', href: '/auth/profile' }
	];

	let isMainMenuOpen = false;
	let isUserMenuOpen = false;
	let isLoggedIn = !!session?.user;
	let hasEmail = session?.user?.email;
</script>

<header
	class="sticky top-0 z-50 background-blur border-b border-border/40 supports[backdrop-filter]:bg-background/60 backdrop-blur-lg"
>
	<nav class="">
		<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div class="relative flex h-16 items-center justify-between">
				<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
					<!-- Mobile menu button-->
					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
						aria-controls="mobile-menu"
						aria-expanded="false"
						on:click={(e) => {
							isMainMenuOpen = !isMainMenuOpen;
							e.stopPropagation();
						}}
					>
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Open main menu</span>

						{#if isMainMenuOpen}
							<svg
								class="block h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg
								class="block h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
					<a href="/" class="flex flex-shrink-0 items-center text-foreground">
						<Logo />
					</a>
					<div class="hidden sm:ml-6 sm:block">
						{#if isLoggedIn}
							<div class="flex space-x-4">
								{#each links as link}
									{#if $page.url.pathname === link.href}
										<a href={link.href} class="text-foreground" aria-current="page">{link.name}</a>
									{:else}
										<a href={link.href} class="text-foreground/60 hover:text-foreground"
											>{link.name}</a
										>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<div
					class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
				>
					<div class="ml-3">
						<DarkModeToggle />
					</div>
					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<div>
							<button
								type="button"
								class="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
								id="user-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								on:click={(e) => {
									isUserMenuOpen = !isUserMenuOpen;
									e.stopPropagation();
								}}
							>
								<span class="absolute -inset-1.5"></span>
								<span class="sr-only">Open user menu</span>
								<div class="relative h-8 w-8">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="absolute inset-0 h-8 w-8 text-gray-400"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									{#if hasEmail}
										<img
											in:fade={{ duration: 300, easing: quintOut }}
											class="absolute left-0 top-0 h-8 w-8 rounded-full"
											width="32"
											height="32"
											src={getAvatarUrl(session?.user.id)}
											alt=""
										/>
									{/if}
								</div>
							</button>
						</div>
						{#if isUserMenuOpen}
							<div
								in:scale={{ duration: 200, easing: quintOut, start: 0.95, opacity: 0 }}
								out:scale={{ duration: 150, easing: quintOut, start: 1, opacity: 0 }}
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-stone-900 border border-border/60 p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								use:clickOutside={() => (isUserMenuOpen = false)}
							>
								{#if isLoggedIn}
									<Button
										variant="ghost"
										href="/auth/profile"
										class="block px-4 py-2 text-sm text-foreground"
										role="menuitem"
										on:click={() => (isUserMenuOpen = false)}>Profile</Button
									>
									<Button
										data-sveltekit-reload
										variant="ghost"
										href="/auth/logout"
										class="block px-4 py-2 text-sm text-foreground"
										role="menuitem"
										on:click={() => (isUserMenuOpen = false)}>Sign out</Button
									>
								{:else}
									<Button
										variant="ghost"
										href="/auth/login"
										class="block px-4 py-2 text-sm text-foreground"
										role="menuitem"
										on:click={() => (isUserMenuOpen = false)}>Log in</Button
									>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state. -->
		{#if isMainMenuOpen}
			<div
				transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
				class="sm:hidden"
				id="mobile-menu"
				use:clickOutside={() => {
					isMainMenuOpen = false;
				}}
			>
				<div class="space-y-1 px-2 pb-3 pt-2">
					{#if isLoggedIn}
						<div class="flex space-x-4">
							{#each links as link}
								{#if $page.url.pathname === link.href}
									<a href={link.href} class="text-foreground" aria-current="page">{link.name}</a>
								{:else}
									<a href={link.href} class="text-foreground/60 hover:text-foreground"
										>{link.name}</a
									>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	header {
		view-transition-name: header;
	}
</style>
