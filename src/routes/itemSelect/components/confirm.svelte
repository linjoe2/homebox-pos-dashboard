<script>
    import { Modal, Group, Button, Center , RadioGroup, Loader} from '@svelteuidev/core';
    import {Check} from "radix-icons-svelte";

    import {getContext} from "svelte"
    import Items from "./items.svelte"
    let output = getContext('output')
    let selection = getContext('selection')
    let loader = false;
    
	let opened = false;
    let value
    let succes = false

    let closeModal = () => {
        opened = false;
        if(succes){
            window.location.href = "/User"
        }
    }

    let onClick = async () => {


        const response = await fetch('/api/homebox/items', {
					method: 'POST',
					body: JSON.stringify($output),
					headers: {
						'Content-Type': 'application/json'
					}
				});

        const res = await response.json();
        console.log(res)


        loader = true
        setTimeout(()=>{
            loader = false;
            succes = true;
        }, 3000)
    }

    


</script>



    <Modal {opened} on:close={closeModal} title="Bevestigen">


        {#if !loader}
            {#if !succes}
            <Items user={$selection.User} type="confirm" />
            <span on:click={onClick} ><Button>Goedkeuren</Button></span>
            {:else}
                <Center><Check /> Alles is opgeslagen, veel succes met je lesdag!:) </Center>
            {/if}
        {:else}
            <Center><Loader variant='bars' /></Center>
        {/if}



    </Modal>
    
    {#if $output.length > 0}
    <Group position="center">
        <Button on:click={() => (opened = true)}>Bevestigen</Button>
    </Group>
    {/if}



<style>
    
    
</style>

