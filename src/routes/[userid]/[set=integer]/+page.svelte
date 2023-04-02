<script lang="ts">
  import Flashcard from "$lib/Flashcard.svelte";
  import type { LayoutServerData } from "./$types";

  export let data: LayoutServerData;
</script>

<h1>{data.title}</h1>

<section class="pb-6">
  <a href="/">Flashcards 📇</a>
  <a href="/">Write ✏️</a>
  <a href="/">Learn 🧠</a>
  <a href="/">Match 🔍</a>
</section>

<Flashcard />
