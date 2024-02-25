<script>
    import { NativeSelect } from '@svelteuidev/core';
    import { ChevronDown } from 'radix-icons-svelte';
    import {getContext} from "svelte"

    let selection = getContext('selection');
    console.log(selection)
    

    let user = "";
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
  "Kasper"
]

$: $selection.set = {User: user, ... $selection}

</script>

<NativeSelect
	data={users}
	placeholder="Vakdocent"
    bind:user
    width="100%"
>
  <svelte:component slot="rightSection" this={ChevronDown} />
</NativeSelect>