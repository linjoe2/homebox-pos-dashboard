  <script>
	import { Modal, Group, Button } from '@svelteuidev/core';

	let opened = false;

    let close = () => {opened = false}
</script>

<Modal {opened} size="calc(100vw - 87px)" on:close="{close}">

    <iframe src="https://lessen.mediawegwijs.nl/?sfwd-courses=les-1-nep-heks-echt-gek"></iframe>

</Modal>

  <div class="center">
    <Button variant="light" radius="xs" size="xs" on:click={() => (opened = true)}>
          Meer info
    </Button>
  </div>

<style>

iframe {
    border: 0px;
    width: 100%;
    height: 75dvh;
}

</style>