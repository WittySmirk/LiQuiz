<script lang="ts">
  import { getContext, onMount, prevent_default } from "svelte/internal";
  import type { Writable } from "svelte/store";
  import Container from "./Container.svelte";
  import type { card } from "./utils/testset";

  export let cards: card[];
  export let type: "Page" | "Learn";

  let intermission: boolean = false;
  let answer: string = "";
  let answered: boolean = false;
  let current: number = 0;
  let correct: boolean = false;
  let right: number = 0;

  const index: Writable<number> = getContext("index");
  const learnNext: () => void = getContext("learnNext");
  const learnAddCorrect: (index: number) => void =
    getContext("learnAddCorrect");
  const learnWrong: (index: number) => void = getContext("learnWrong");

  let wrongs: card[] = cards;

  $: {
    if ($index) {
      current = $index;
    }
  }

  function correctCheck() {
    if (answer.toLowerCase() === cards[current].term.toLowerCase()) {
      if (type === "Learn") {
        if ($index) {
          learnAddCorrect($index);
        }
      }
      correct = true;
      right++;
      wrongs.splice(current, 1);
    } else {
      if (type === "Learn") {
        if ($index) {
          learnWrong($index);
        }
      }
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

    if (type === "Learn") {
      learnNext();
    }
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.code === "Enter" && answered) {
      next();
    }
  }
</script>

<Container center={false} {onkeydown}>
  {#if !intermission}
    {#if type != "Learn"}
      <div class="pt-5 pb-5">
        <h2 class="text-highlight-color-dark">
          {current + 1} / {cards.length}
        </h2>
        <p>
          Score {right} / {cards.length}
        </p>
      </div>
    {/if}

    <p class="ml-1 mr-1 text-2xl" class:mt-14={type === "Learn"}>
      {cards[current].definition}
    </p>

    <div class="bg-bg-color-dark w-full rounded-2xl">
      <form
        on:submit={(e) => {
          e.preventDefault();
          answered = true;
          correctCheck();
        }}
        class="flex flex-col outline outline-1 outline-undertone-color-dark rounded-2xl"
      >
        {#if answered}
          <div class="ml-1 mb-1">
            {#if correct}
              <h4 class="text-highlight-color-dark">Correct</h4>
            {:else}
              <h4 class="text-highlight-color-dark">Incorrect</h4>
              <p>{cards[current].term}</p>
            {/if}
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
              autocomplete="new-password"
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
