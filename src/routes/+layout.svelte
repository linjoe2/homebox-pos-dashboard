<script>
    import Menu from "./menu.svelte"
    import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
    import { page } from '$app/stores'
    import Loader from "./loader.svelte"
    import { SvelteUIProvider } from '@svelteuidev/core';
    import './global.css'

	/** @type {import('./$types').LayoutData} */
	export let data;
    console.log("data", $page.url.searchParams.get('lessen'))


	// Create a store and update it when necessary...
	const lessen = writable();
	$: lessen.set(data.body.lessen);
    const selection = writable();
    selection.set({User: $page.url.searchParams.get('User'), input: [], output: []})
    $: console.log(selection)
	const Users = writable();
	$: Users.set(data.body.Users);
	// ...and add it to the context for child components to access
	setContext('lessen', lessen);
    setContext('Users', Users);
    setContext('selection', selection);
    $: console.log("selection", $selection)
    let KeyDown = (e) => {
        console.log(/^\d+$/.test(e.key))
    }


	// Create a store and update it when necessary...
    const input = writable();
    input.set([]);
    setContext('input', input);

    const output = writable();
    output.set([]);
    setContext('output', output);
    
</script>
<div on:keydown={KeyDown}>
    <SvelteUIProvider>
    <Menu/>
    <Loader/>
    <slot>

    </slot>
    </SvelteUIProvider>

<!-- FreeScout BEGIN -->
<script>var FreeScoutW={s:{"color":"#0068bd","position":"br","locale":"nl","show_categories":"1","id":2207310239}};(function(d,e,s){if(d.getElementById("freescout-w"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="freescout-w";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","https://sales.toekomst.school/modules/knowledgebase/js/widget.js?v=7497");</script>
<!-- FreeScout END -->
</div>