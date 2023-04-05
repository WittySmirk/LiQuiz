<script lang="ts">
  import Flashcard from "./Flashcard.svelte";
  import MultipleChoice from "./MultipleChoice.svelte";
  import type { card } from "./testset";
  import Write from "./Write.svelte";

  export let type: "Text" | "Mc" | "Flashcard";
  export let cards: card[];
</script>

{#if type === "Text"}
  <Write {cards} type={"Learn"} />
{:else if type === "Mc"}
  <MultipleChoice {cards} />
{:else if type === "Flashcard"}
  <Flashcard {cards} type={"Learn"} />
{/if}