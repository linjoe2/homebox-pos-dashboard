<script>
    import { Center, Card, Group, Text, ActionIcon } from '@svelteuidev/core';
    import {Plus, Minus} from "radix-icons-svelte";
    // import { quintOut } from 'svelte/easing';
	// import { crossfade } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
    
    export let item
    export let type
    import {getContext} from "svelte"
	import Claim from './claim.svelte';
    let selection = getContext('selection');
    let output = getContext('output');
    console.log("type",type)

    function concatArraysAndRemoveDuplicates(arr1, arr2, key) {
        const uniqueIds = new Set();

        // Add existing ids from arr1 to the Set
        arr1.forEach(obj => uniqueIds.add(obj[key]));

        // Filter out objects from arr2 that have duplicate ids
        const uniqueObjectsArr2 = arr2.filter(obj => !uniqueIds.has(obj[key]));

        // Concatenate arr1 and the filtered arr2
        const resultArray = arr1.concat(uniqueObjectsArr2);

        return resultArray;
    }

    function removeItemFromArray(list,id){
        var index = list.map(x => {
            return x.Id;
        }).indexOf(id);

        list.splice(index, 1);
        return list
    }

	function addUser(Item) {
            console.log(output)
            console.log(Item)
            Item.user = $selection.User
            // $output = removeItemFromArray($output,Item.id)
            $output = concatArraysAndRemoveDuplicates([Item], $output, 'id')

            console.log($output)
        }

    function removeUser(Item) {
            console.log(output)
            console.log(Item)
            Item.user = undefined
            // $output = removeItemFromArray($output,Item.id)
            $output = concatArraysAndRemoveDuplicates([Item], $output, 'id')

            console.log($output)
        }

</script>

<Card shadow='sm' padding='lg' >
    <Group position='apart'>
        <Text weight={500}>{@html item.name}</Text>
        {#if item.type == "bank"}
            <p><img src="./inbox.png" width="16px"></p>
        {:else if item.type == "return"}
            <p><img src="./outbox.png" width="16px"></p>
        {/if}
    </Group>
    {#if type !== "confirm" }
    <p>
        {@html item.description}
    </p>
    <span class="CardBottom">
        <span class="qant">Vooraad: {item.quantity}</span>
        {#if type !== "bag"}
        <div on:click="{()=>{addUser(item)}}">
            <ActionIcon color="green" size="md" variant="outline">
                <Plus />
            </ActionIcon>
        </div>
        {:else}
        <div on:click="{()=>{removeUser(item)}}">
            <ActionIcon color="red" size="md" variant="outline">
                <Minus />
            </ActionIcon>
        </div>
        {/if}
    </span>
    {:else}
        
    <Claim  bind:item={item} />
    {/if}
</Card> 


<style>
    .CardBottom{
        display: flex;
        justify-content: space-between;
    }

</style>