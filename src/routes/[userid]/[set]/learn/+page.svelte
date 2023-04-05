<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, setContext } from "svelte";
  import LearnInput from "$lib/LearnInput.svelte";
  import { writable, type Writable } from "svelte/store";

  export let data;

  let current: Writable<number> = writable(0);
  let type: "Text" | "Mc" | "Flashcard" = randomLearnInputType();
  let currentLevel: number = 0;
  let round: number = 0;
  let finished: boolean = false;
  let levels: {index: number; level: number; correctInARow: number}[] = [];
  
  function randomLearnInputType() {
    const g = Math.floor(Math.random() * 3);
    if (g === 0) {
      return "Text";
    } else if (g === 1) {
      return "Mc";
    } else {
      return "Flashcard";
    }
  }

  function learnAddCorrect(index: number) {
    if (levels[index].correctInARow + 1 == 3) {
      levels[index].level++;
      levels[index].correctInARow = 0;
    } else {
      levels[index].correctInARow++;
    }
  }

  function learnWrong(index: number) {
    levels[index].correctInARow = 0;
  }

  function updateCurrent(index: number): boolean {
    if (index + 1 >= levels.length) {
      round++;
      return updateCurrent(0);
    }
    
    if (levels[index + 1].level == currentLevel) {
      current.set($current + 1);
      type = randomLearnInputType();
      return true;
    } else {
      if (index + 1 < levels.length) {
        return updateCurrent(index + 1);
      } else {
        return false;
      }
    }
  }

  function next() {
    if (!updateCurrent($current)) {
      if (currentLevel < 2) {
        currentLevel++;
        next();
      } else {
        finished = true;
      }
    }
  }  

  onMount(() => {
    for (let i = 0; i < data.cards.length; i++) {
      levels.push({
        index: i,
        level: 0,
        correctInARow: 0,
      });
    }
  });

  setContext("learnAddCorrect", learnAddCorrect);
  setContext("learnWrong", learnWrong);
  setContext("next", next);
  setContext("index", current);
</script>

<h1>Learn</h1>
<a href="/{$page.params.userid}/{$page.params.set}">Back to Set 🏠</a>

{#if !finished}
  <div>{round}</div>
  <div>{current}</div>
  <LearnInput
    {type}
    cards={data.cards}
  />
{:else}
  <h2>Finished</h2>
{/if}