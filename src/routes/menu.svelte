<script>
	import { Flex, Divider, ActionIcon } from '@svelteuidev/core';
    import { Person, Calendar, ThickArrowUp, ThickArrowDown, Reload,QuestionMark } from 'radix-icons-svelte';
    import {getContext} from "svelte"
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    let selection = getContext('selection');
    let iconSize = 32

    const reload = () => {
        selection.set({User: "", lessen: []})
        goto('/User')
    }

</script>
<div class="menu">
    <img src="./mww-logo.png" width="100px">
    {$selection.User}
    <Flex justify="center" gap="xl">
        <a href="./User" class:active={$page.url.pathname === '/User'}>
            <ActionIcon>
                <Person size={iconSize} />
            </ActionIcon>
        </a><a href="./itemSelect?User={$selection.User}" class:active={$page.url.pathname === '/itemSelect'}>
            <ActionIcon>
                <Calendar size={iconSize} />
            </ActionIcon>
        </a><a href={`./ophalen?User=${$selection.User}&lessen=${$selection.lessen}`} class:active={$page.url.pathname === '/ophalen'}>
        </a>
    </Flex>

</div>

<Divider/>

<style>
    .menu {
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        position: sticky;
        top: 6px;
        background: #3a8efa45;
        border-radius: 10px;
        z-index: 1;
    }

    :global(.active button) {
        border: 2px solid grey !important;
        padding: 2px;
    }
</style>


