<script>
    import { Accordion, Center, Card, Group , Button, Grid, Text,Badge, ActionIcon, Flex} from '@svelteuidev/core';
    import {getContext} from "svelte"
    import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { ChevronDown, ChevronUp } from 'radix-icons-svelte';
	import Output from './items.svelte';
    import Confirm from './confirm.svelte'
    let selection = getContext('selection');
    let output = getContext('output')
    console.log($selection)
    let itemIn = true
    let itemOut = false
    let itemReturn = false
    $:  if($output.filter(item => !!item.user).length > 0) itemIn= true

</script>
<div class="bar">
<div class="card">
    <div class="cardHeader">

        <Flex justify="space-between">
            <ActionIcon>
                <img src="./inbox.png" width="16px">
            </ActionIcon>
            <Text weight={500}>Mijn Tas</Text>
            <Badge color='blue' variant='light'>
                {$output.filter(item => !!item.user).length}
            </Badge>
            
        </Flex>
    </div>
    
    <div transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'y' }}>
        
            <Output user={$selection.User} type="bag" />
        </div>

</div>

<div class="card">
    <div class="cardHeader">

        <Flex justify="space-between">
            <ActionIcon>
                <img src="./outbox.png" width="16px">
            </ActionIcon>
            <Text>Inleveren</Text>
            <Badge color='blue' variant='light'>
                {$output.filter(item => !!!item.user && item.type == "return").length}
            </Badge>

        </Flex>
    </div>
        <div transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'y' }}>

            <Output user={$selection.User} type="return" />
        </div>
</div>
    
</div>

<style>

    .fullHeight {
        height: 100vw;
        display: block;
    }

  
    .card {
        padding: 5px;
        outline: 0px;
        margin: 5px 0px;
        display: block;
        max-width: 90vw;
        text-decoration: none;
        color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        border-radius: var(--svelteui-radii-sm);
        -webkit-tap-highlight-color: transparent;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px;
    }

    .bar {
        overflow: auto;
        max-height: 82dvh;
        margin: 10px 0;
    }

    
</style>