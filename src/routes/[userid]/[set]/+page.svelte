<script lang="ts">
  import Flashcard from "$lib/Flashcard.svelte";
  import {page} from "$app/stores";

  export let data;
</script>

<h1>{data.title}</h1>

<section class="pb-6">
  <a href="/{$page.params.userid}/{$page.params.set}/flashcards">Flashcards 📇</a>
  <a href="/{$page.params.userid}/{$page.params.set}/write">Write ✏️</a>
  <a href="/{$page.params.userid}/{$page.params.set}/learn">Learn 🧠</a>
  <a href="/{$page.params.userid}/{$page.params.set}/match">Match 🔍</a>
</section>

<Flashcard type="Preview" cards={data.cards} />
