<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import Container from "./Container.svelte";
  import type { card } from "./utils/testset";

  export let cards: card[];

  let randomOthers: number[] = [];
  let indexOfAnswer: number = 0;
  let answered: boolean = false;
  let correct: boolean = false;
  let index: Writable<number> = getContext("index");

  const learnNext: () => void = getContext("learnNext");
  const learnAddCorrect: (index: number) => void =
    getContext("learnAddCorrect");
  const learnWrong: (index: number) => void = getContext("learnWrong");

  function createRandomIndexes(i: number): number[] {
    let indexes: number[] = [];
    indexOfAnswer = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      if (i === indexOfAnswer) {
        indexes.push(i);
        continue;
      }
      let r = Math.floor(Math.random() * cards.length);
      if (indexes.includes(r)) {
        i--;
        continue;
      }
      indexes.push(r);
    }
    return indexes;
  }

  function chooseAnswer(i: number) {
    answered = true;
    if (i === indexOfAnswer) {
      learnAddCorrect($index);
      correct = true;
    } else {
      learnWrong($index);
      correct = false;
    }
  }

  function onkeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "1":
        if (!answered) {
          chooseAnswer(0);
        }
        break;
      case "2":
        if (!answered) {
          chooseAnswer(1);
        }
        break;
      case "3":
        if (!answered) {
          chooseAnswer(2);
        }
        break;
      case "4":
        if (!answered) {
          chooseAnswer(3);
        }
        break;
      case "Enter":
        if (answered) {
          answered = false;
          correct = false;
          learnNext();
        }
        break;
    }
  }

  $: {
    randomOthers = createRandomIndexes($index);
  }
</script>

<Container center={answered ? true : false} {onkeydown}>
  {#if !answered}
    <p class="ml-1 mr-1 text-3xl mt-14">
      {cards[$index].definition}
    </p>
    <div class="mt-10 grid grid-rows-2 grid-cols-2 mr-5 ml-5 mb-5">
      {#each randomOthers as card, i}
        <button
          class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-xl pl-16 pr-16 pt-1 pb-1 rounded-md m-1"
          id="answerButton"
          on:click={() => chooseAnswer(i)}
        >
          <p class="relative text-text-color-dark text-sm">{i + 1}</p>
          {cards[card].term}
        </button>
      {/each}
    </div>
  {:else}
    {#if correct}
      <p class="text-highlight-color-dark text-3xl">Correct</p>
    {:else}
      <p class="text-highlight-color-dark text-3xl">Incorrect</p>
      <p class="mt-8">
        Correct Answer: {cards[$index].term}
      </p>
    {/if}
    <button
      class="text-highlight-color-dark border-none outline outline-1 pt-2 pb-2 outline-highlight-color-dark bg-bg-color-dark text-xl rounded-md mr-40 ml-40 mt-8"
      on:click={() => {
        answered = false;
        correct = false;
        learnNext();
      }}
    >
      Next
    </button>
  {/if}
</Container>
