<script>
    import {  RadioGroup, Textarea} from '@svelteuidev/core';

    export let item
    const items = [
        { label: 'In orde', value: 'in orde' },
		{ label: 'Bijvullen', value: 'bijvullen' },
		{ label: 'Kapot', value: 'kapot' },
		{ label: 'Anders', value: 'anders' },
	];
    console.log("claim",item)
    let status = ""
    let description = ""

    $: item.statusDescription = description
    $: item.status = status
</script>


           
<RadioGroup {items} bind:value={status} />
<Textarea bind:value={description} />
<!-- <input type="file" accept=".jpg, .jpeg, .png" > -->