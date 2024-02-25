<script>
	import { createEventDispatcher } from 'svelte';
    import { ArrowLeft } from 'radix-icons-svelte';
    import {Center} from '@svelteuidev/core'

	export let value = '';

	const dispatch = createEventDispatcher();

	const select = num => () => {
		value += num;
		dispatch('pin', num);
	}
	const clear  = () => {
		value = '';
		dispatch('clear', value);
	}
    const minus  = () => {
		value = value.substring(0, value.length - 1);
		dispatch('clear', value);
	}
	const submit = () => dispatch('submit');
</script>

<style>
    input {
        width: 100px;
        margin: 15px auto;
        padding: 5px;
        display: block;
        border-radius: 12px;
        text-align: center;
    }
	.keypad {
        margin: 5px auto;
		display: grid;
		grid-template-columns: repeat(3, 5em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em
	}

	button {
		margin: 0
	}

    .search {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
    }
</style>

<div class="search">

    <input type="num" bind:value={value} />
    
    <div class="keypad">
        <button on:click={select(1)}>1</button>
        <button on:click={select(2)}>2</button>
        <button on:click={select(3)}>3</button>
        <button on:click={select(4)}>4</button>
        <button on:click={select(5)}>5</button>
        <button on:click={select(6)}>6</button>
        <button on:click={select(7)}>7</button>
        <button on:click={select(8)}>8</button>
        <button on:click={select(9)}>9</button>
        
        <button disabled={!value} on:click={minus}><ArrowLeft/></button>
        <button on:click={select(0)}>0</button>
        <button disabled={!value} on:click={clear}>C</button>
    </div>

</div>