<script>
    import { navigating } from '$app/stores'
    import { Loader } from '@svelteuidev/core';
	import { Modal } from '@svelteuidev/core';
    let submit = 0
</script>

{#if $navigating}
<div class="loader">
    <Loader />
</div>
{/if}

{#if submit}
  {#await submit}
    <p>Sending...</p>
  {:then resp}
    <p>🎉 Done!</p>
    <pre>RESPONSE: {JSON.stringify(resp, null, 2)}</pre>
  {/await}
{/if}


<style>
    .loader {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0,0,0,0.4);
        width:100vw;
        height: 100vh;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>

