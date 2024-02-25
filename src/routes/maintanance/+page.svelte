<script>
	import { Modal, Group, Button } from '@svelteuidev/core';
    import { CodesandboxLogo } from 'radix-icons-svelte';
    import Items from '../itemSelect/components/items.svelte';

	let opened = false;

    let closeModal = () => {

    }
</script>


<div>

    <Modal {opened} on:close={closeModal} title="Introduce yourself!">
        <Items />
    </Modal>
        
        <Group position="center">
            <Button on:click={() => (opened = true)}><CodesandboxLogo/></Button>
        </Group>
</div>
