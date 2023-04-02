<script lang="ts">
  export let center: boolean;
</script>

<section
  class="{center
    ? 'justify-center'
    : 'justify-between'} bg-undertone-color-dark rounded-2xl text-center mt-1 flex flex-col outline outline-1 outline-undertone-color-dark"
  style="flex: 1 2 25rem; width: clamp(370px, 50%, 50rem);"
>
  <slot />
</section>
