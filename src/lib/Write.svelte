<script lang="ts">
  import { getContext, onMount, prevent_default } from "svelte/internal";
  import type { Writable } from "svelte/store";
  import Container from "./Container.svelte";
  import type { card } from "./testset";

  export let cards: card[];
  export let type: "Page" | "Learn";

  let intermission: boolean = false;
  let answer: string = "";
  let answered: boolean = false;
  let current: number = 0;
  let correct: boolean = false;
  let right: number = 0;
  let index: Writable<number> | undefined = undefined;
  let learnNext: (() => void) | undefined = undefined;
  let learnAddCorrect: ((index: number) => void) | undefined = undefined;
  let learnWrong: ((index: number) => void) | undefined = undefined;

  let wrongs: card[] = cards;

  function correctCheck() {
    if (answer.toLowerCase() === cards[current].term.toLowerCase()) {
      if (type === "Learn") {
        if ($index) {
          learnAddCorrect!($index);
          learnNext!();
        }
      }
      correct = true;
      right++;
      wrongs.splice(current, 1);
    } else {
      
      correct = false;
    }
  }

  function next() {
    if (current + 1 < cards.length) {
      current++;
    } else {
      intermission = true;
    }
    answer = "";
    answered = false;
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.code === "Enter" && answered) {
      next();
    }
  }

  onMount(() => {
    if(type === "Learn") {
      index = getContext("index");
      current = $index!;
      learnNext = getContext("next");
      learnAddCorrect = getContext("learnAddCorrect");
      learnWrong = getContext("learnWrong");
    }
  });
</script>

<Container center={false} {onkeydown}>
  {#if !intermission}
    {#if type === "Learn"}
      <div class="pt-5 pb-5">
        <h2 class="text-highlight-color-dark">
          {current + 1} / {cards.length}
        </h2>
        <p>
          Score {right} / {cards.length}
        </p>
      </div>
    {/if}

    <p class="ml-1 mr-1 text-2xl">
      {cards[current].definition}
    </p>

    <div class="bg-bg-color-dark w-full rounded-2xl">
      <form
        on:submit={(e) => {
          e.preventDefault();
          answered = true;
          correctCheck();
        }}
        class="flex flex-col outline outline-1 outline-undertone-color-dark rounded-2xl "
      >
        {#if answered}
          <div class="ml-1 mb-1">
            <h4 class="text-highlight-color-dark">
              {correct ? "Correct!" : "Incorrect!"}
            </h4>
            <p>{cards[current].term}</p>
            <button
              on:click={next}
              class="rounded text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark"
            >
              Next
            </button>
          </div>
        {:else}
          <div class="flex">
            <label
              for="answer"
              class="rounded text-highlight-color-dark text-2xl border-none bg-bg-color-dark ml-2"
            >
              Answer
            </label>
            <p class="text-highlight-color-dark text-2xl ml-1 mr-1">|</p>
            <input
              type="text"
              name="answer"
              id="answer"
              class="rounded ml-1 w-screen text-2xl border-none outline-none bg-bg-color-dark"
              bind:value={answer}
            />
            <button
              type="submit"
              class="ml-1 mr-2 text-2xl text-highlight-color-dark"
            >
              Submit
            </button>
          </div>
        {/if}
      </form>
    </div>
  {:else}
    <div>
      <h1>{Math.round((right / cards.length) * 100)}% Done</h1>
      <button
        on:click={() => {
          intermission = false;

          cards = wrongs;
          current = 0;

          answer = "";
          answered = false;
        }}
        class="rounded text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark"
      >
        Keep Going
      </button>
    </div>
  {/if}
</Container>
