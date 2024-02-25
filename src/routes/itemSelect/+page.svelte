<script>
    import { Accordion, Loader} from '@svelteuidev/core';
    import ViewLabel from "./viewLabel.svelte"
    import { getContext, onMount, setContext } from 'svelte';
    import Keypad from './components/keypad.svelte'
    import Basket from './components/basket.svelte'
    import {Backpack, MagnifyingGlass} from "radix-icons-svelte"
    import Confirm from './components/confirm.svelte';
// Retrieve user store from context
    let labels = [];
    let load = true;
    let clientWidth = 0;
    let output = getContext('output');
    // $: if(!!Geselecteerdelabels) selection.set({User: $selection.input, labels: Geselecteerdelabels}); 
    let BasketShow = true;
    let KeypadShow = false;




	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Output from './components/items.svelte';


    onMount(async()=>{
        // setContext('input', []);
        // setContext('output', []);

        const response = await fetch(`/api/homebox/labels`)
        labels = await response.json()
        console.log("labels", labels)
        load = false;
    })


    let Zoek = ''

    export let Geselecteerdelabels = [""]
    export let active


</script>


<h1 style="text-align: center;">Voor welke lessen wil je spullen ophalen?</h1>
<div bind:clientWidth={clientWidth}>

    
            <div class="flexLeft">
                {#if BasketShow}
	                <div transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}>
                        <Basket />
                        <Confirm />

                    </div>
                    {/if}
                    <div class="flexIcon">
                        <div on:click={()=> {BasketShow = !BasketShow}}><Backpack /></div>
                        {$output.filter((i)=> !!i.user).length}
                    </div>
            </div>



            <div class="center">
             <Accordion>
                {#if load}
                <div class="loader"><Loader variant='bars'></Loader></div>
                {/if}
                {#each labels as les}
                    {#if ((!!les.name && (les.name.includes(Zoek))) && !les.name.includes("!") )}
                        <Accordion.Item value="{les.id}">
                        <div slot="control">{@html les.name}</div>
                        {@html les.description}
                        <ViewLabel id="{les.id}"/>
                        <Output id="{les.id}" type="bank"/>
                        </Accordion.Item>
                    {/if}
                {/each}

              </Accordion>
            </div>

            

            <div class="flexRight">
                {#if (KeypadShow || clientWidth > 800)}
                    <div transition:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}>
                        <Keypad bind:value={Zoek}/>
                    </div>
                {/if}
                <div class="flexIcon" on:click={()=> {KeypadShow = !KeypadShow}}>
                    <MagnifyingGlass />
                </div>
            </div>

</div>


