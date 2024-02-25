<script>
    export let id = ""
    export let user = ""
    export let type = 'default'
    let Items = [];
    let load = true;
    let noItems = false;
    import {onMount} from "svelte"
    import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
    
    import ItemComponent from "./item.svelte"
    import {marked} from "marked"
    import { Loader } from '@svelteuidev/core';

    import {getContext} from "svelte"
    let output = getContext('output')


    const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

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


    const addParentId = (array, id) => {
        for (let i = 0; i < array.length; i++) {
            console.log("test")
            console.log(array[i])
            if(type == "bag" || type == "return") array[i].user = user
            array[i].type = type
            array[i].parentId = id;
        }
        return array
    }

    onMount(async ()=>{
        if(type == "confirm" || type == "bag") return load = false
        if($output.filter((i) => i.type == 'return').length > 0 && (type == "return" || type == "bag")) return load = false;
        setTimeout(()=>{
            if($output.length <= 0) noItems = true;
        },3000)
        console.log("tt",type)

        const u = new URLSearchParams({id, user, type}).toString();

        const response = await fetch(`/api/homebox/items?${u}`);
        let res = await response.json()
        addParentId(res, id)
        
        let out = concatArraysAndRemoveDuplicates( $output, res, 'id');
        $output = out
        console.log(res)


        if($output.length == 0) noItems = true
        else noItems = false
        load = false
    })




   

</script>
<div>

    {#if load}
    <div class="loader"><Loader variant='bars'></Loader></div>
    {/if}
    {#if noItems}
    <p style="text-align:center;">Sorry, Geen Items kunnen vinden.</p>
    {/if}

    
    {#if type == "bag"}
    {#each $output.filter(item => (!!item.user)) as item (item.id)}
        <div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
            <ItemComponent item={item} type={type} />
        </div> 
    {/each}
    {:else  if type == "bank"}
    {#each $output.filter(item => !!!item.user && item.parentId == id) as item (item.id)}
    <div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
        <ItemComponent item={item} type={type} />
    </div> 
    {/each}
    {:else  if type == "return"}
    {#each $output.filter(item => (!!!item.user && item.type == "return")) as item (item.id)}
    <div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
        <ItemComponent item={item} type={type} />
    </div> 
    {/each}
    {:else  if type == "confirm"}
    {#each $output.filter(item => (item.user == user || item.type == "return")) as item (item.id)}
    <div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
        <ItemComponent item={item} type={type} />
    </div> 
    {/each}
    {:else  if type == "maintanance"}
    {#each $output.filter(item => (item.user == user || item.type == "return")) as item (item.id)}
    <div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
        <ItemComponent item={item} type={type} />
    </div> 
    {/each}
    {/if}
</div>
    
    
    <style>
 .loader{
    margin: 20px auto;
    width: min-content;
 }
</style>