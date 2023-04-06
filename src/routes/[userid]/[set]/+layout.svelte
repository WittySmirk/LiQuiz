<script lang="ts">
  import { page } from "$app/stores";

  export let data;
  let title: string = "";
  
  $: {
    if ($page.route.id?.includes("learn")) {
      title = data.title + " - Learn";
    } else if ($page.route.id?.includes("flashcards")) {
      title = data.title + " - Flashcards";
    } else if ($page.route.id?.includes("write")) {
      title = data.title + " - Write";
    } else if ($page.route.id?.includes("match")) {
      title = data.title + " - Match";
    } else {
      title = data.title;
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<slot />
