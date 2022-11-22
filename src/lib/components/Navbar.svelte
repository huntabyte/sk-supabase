<script lang="ts">
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';

	let navigation = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Items',
			href: '/items'
		},
		{
			title: 'Account',
			href: '/account'
		}
	];
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://flowbite.com/docs/images/logo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Flowbite
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if $page.data?.session}
			<form action="/logout" method="POST">
				<Button type="submit" size="sm">Sign Out</Button>
			</form>
		{:else}
			<Button href="/login" size="sm">Login</Button>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="order-1">
		{#each navigation as navLink}
			<NavLi href={navLink.href} active={$page.url.pathname === navLink.href}>{navLink.title}</NavLi
			>
		{/each}
	</NavUl>
</Navbar>
