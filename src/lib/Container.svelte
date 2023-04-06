<script lang="ts">
  export let center: boolean;
  export let onclick: () => void = () => {};
  export let onkeydown: (event: KeyboardEvent) => void = () => {};
</script>

<section
  class:justify-center={center}
  class:justify-between={!center}
  class="bg-undertone-color-dark rounded-2xl text-center mt-1 flex flex-col outline outline-1 outline-undertone-color-dark"
  style="flex: 1 2 25rem; width: clamp(370px, 50%, 50rem);"
  on:click={onclick}
  on:keydown={() => {}}
>
  <slot />
</section>

<svelte:window on:keydown={onkeydown}></svelte:window>
