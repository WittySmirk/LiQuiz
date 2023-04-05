<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import Container from "./Container.svelte";
  import type { card } from "./testset";

  export let cards: card[];

  let othersWithAnswer: card[] = [];
  let indexOfAnswer: number = 0;
  let answered: boolean = false;
  let correct: boolean = false;
  let index: Writable<number> = getContext("index");
  let next: () => void = getContext("next");
  let learnAddCorrect: (index: number) => void = getContext(
    "learnAddCorrect"
  );
  let learnWrong: (index: number) => void = getContext("learnWrong");

  function makeSureNoRepeats(arr: card[], prev: number[]): number {
    const a = Math.floor(Math.random() * arr.length);
    if (prev.length == 0 || !prev.includes(a)) {
      return a;
    } else {
      return makeSureNoRepeats(arr, prev);
    }
  }

  function createRandomOthersWithAnswer(cards: card[], index: number): card[] {
    let o: card[] = [];
    let p: number[] = [index];
    indexOfAnswer = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      if (i == indexOfAnswer) {
        o.push(cards[index]);
      } else {
        const indexOfOther = makeSureNoRepeats(cards, p);
        p.push(indexOfOther);
        o.push(cards[indexOfOther]);
      }
    }
    return o;
  }

  onMount(() => {
    othersWithAnswer = createRandomOthersWithAnswer(cards, 0); // TODO: make conextxt for learn index
  });
</script>

<Container center={answered ? true : false}>
  {#if !answered}
    <p class="ml-1 mr-1 text-3xl mt-14">
      {cards[$index].definition}
    </p>
    <div class="mt-10 grid grid-rows-2 grid-cols-2 mr-5 ml-5 mb-5">
      {#each othersWithAnswer as card, i}
        <button
          class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-xl pl-16 pr-16 pt-1 pb-1 rounded-md m-1"
          on:click={() => {
            answered = true;
            if(i === indexOfAnswer) {
                learnAddCorrect($index);
                correct = true;
            } else {
                learnWrong($index);
                correct = false;
            }
          }}
        >
          {card.term}
        </button>
      {/each}
    </div>
  {:else}
    <p class="text-highlight-color-dark text-3xl">
      {correct ? "Correct" : "Incorrect"}
    </p>
    <p class="mt-8">
           Correct Answer: {cards[$index].term}
    </p>
    <button
      class="text-highlight-color-dark border-none outline outline-1 pt-2 pb-2 outline-highlight-color-dark bg-bg-color-dark text-xl rounded-md mr-40 ml-40 mt-8"
      on:click={() => {
        answered = false;
        correct = false;
        next();
      }}
    >
      Next
    </button>
  {/if}
</Container>
