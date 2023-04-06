<script lang="ts">
  import Flashcard from "$lib/Flashcard.svelte";
  import { page } from '$app/stores';
  import { shuffle } from "$lib/utils/shuffle.js";

  export let data;
</script>

<h1>Flashcards</h1>
<a href="/{$page.params.userid}/{$page.params.set}">Back to Set 🏠</a>
<Flashcard type="Page" cards={shuffle(data.cards)} />