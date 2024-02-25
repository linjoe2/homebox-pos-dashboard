    <script>
        import AutoComplete from 'simple-svelte-autocomplete';
        import {Button} from "@svelteuidev/core"
        export let data



        export let active 
        import { getContext, onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
        let users = [
  "Abe",
  "Annerieke",
  "Aruna",
  "Ben",
  "Biko",
  "Boyd",
  "Camilo",
  "Chevano",
  "Christiaan",
  "Christian",
  "Daniel",
  "Dirk",
  "Edwin",
  "Elvira",
  "Emma",
  "Esther",
  "Herman",
  "Irfan",
  "Jens",
  "Jep",
  "Jette",
  "Joost",
  "Juran",
  "Justus",
  "Kay",
  "Kees",
  "Kiet",
  "Lindsey",
  "Linlin",
  "Marinus",
  "Marleen",
  "Marlise",
  "Marvin",
  "Menno",
  "Moos",
  "Nick",
  "Nickie",
  "Peke",
  "Ralph",
  "Roy",
  "Silke",
  "Sophie",
  "Silvio",
  "Sunil",
  "Tabe",
  "Timon",
  "Tessa",
  "Uma",
  "Vincent",
  "Wout",
  "Zora",
  "Yvo",
  "Anouk",
  "Udo",
  "Pouline",
  "Patricia",
  "Marloes",
  "Maaike",
  "Madeline",
  "Layla",
  "Kasper",
  "saskia",
  "Iris",
  "victor",
  "ilse", 
]
        let user =''

    // // Retrieve user store from context
    //     let users = getContext('users') || [];
        let selection = getContext('selection');
        $: $selection.User = user


        $: if(user.length > 0)window.open(`/itemSelect?User=${user}`, '_self');


    //     let vakdocent = $selection.vakdocent
    //     console.log("vakka", vakdocent)
    //     $: if(!!vakdocent) selection.set({vakdocent, lessen: ''});
        onMount(async ()=>{
            // const response = await fetch('/api/nextcloud/users');
            // users = await response.json();
            
            console.log(users)
        })    

</script>


<div class="center">
    <h3>Hoi! welkom! Wie ben jij?</h3>
    <AutoComplete items={users} bind:selectedItem={user} />

    <a href="https://team.mediawegwijs.nl/index.php/apps/registration/"><Button variant="outline">Wordt Beta Tester!</Button></a>
</div>

<style>

    .center {
        margin: 0 auto;
        display: flex;
        width: max-content;
        align-content: center;
        height: 80dvh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    a {
        margin: 20px;
    }

</style>


