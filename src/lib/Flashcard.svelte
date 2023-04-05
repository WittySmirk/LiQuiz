<script lang="ts">
  import Container from "./Container.svelte";
  import type { card } from "$lib/testset";

  export let cards: card[];
  export let type: "Page" | "Preview" | "Learn";
//   export let index: number | undefined = undefined;
  export let next: (() => void) | undefined = undefined;

  let finished: boolean = false;
  let current: number = 0;
  let back: boolean = false;

//   $: if (index) {
//     current = index;
//   }

  function flip() {
    if (type === "Learn" && back) {
      return;
    }
    back = !back;
  }

  function onkeydown(e: KeyboardEvent) {
    e.preventDefault();
    if (e.code == "Space" || e.code == "ArrowDown" || e.code == "ArrowUp") {
      flip();
    } else if (e.code == "ArrowRight") {
      increment();
    } else if (e.code == "ArrowLeft") {
      decrement();
    }
  }

  let increment = () => {};
  let decrement = () => {};

  if (type === "Page") {
    increment = () => {
      back = true;
      if (current + 1 < cards.length) {
        current++;
      } else {
        finished = true;
      }
    };
    decrement = () => {
      back = true;
      if (current - 1 >= 0) {
        current--;
      }
    };
  } else if (type === "Preview") {
    increment = () => {
      back = true;
      if (current + 1 < cards.length) {
        current++;
      } else {
        current = 0;
      }
    };
    decrement = () => {
      back = true;
      if (current - 1 >= 0) {
        current--;
      } else {
        current = cards.length - 1;
      }
    };
  }

  //   $: if (type === "Learn") {
  //     // answerCondition = true;
  //   }
</script>

<Container center={type === "Learn"} onclick={flip} {onkeydown}>
  {#if !finished}
    {#if type != "Learn"}
      <div class="pt-5">
        <p class="text-highlight-color-dark">
          {back ? "Definition" : "Term"}
        </p>
        <p>
          {current + 1 + "/" + cards.length}
        </p>
      </div>
    {/if}

    <div>
      <p class="text-3xl">
        {back ? cards[current].definition : cards[current].term}
      </p>
    </div>
    {#if type === "Learn" && back}
      <button
        on:click={() => {
          back = false;
          // learnAddCorrect(index);
          {
            next ? next() : null;
          }
        }}
        class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pt-1 pb-1 rounded-md ml-1 mr-1"
      >
        Next
      </button>
    {/if}
    {#if type != "Learn"}
      <div class="pt-5 pb-5">
        <button
          on:click={decrement}
          class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
        >
          {"<"}
        </button>
        <button
          on:click={increment}
          class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
        >
          {">"}
        </button>
      </div>
    {/if}
  {:else}
    <h1>100% Finished</h1>
    <div class="pt-5 pb-5">
      <button
        on:click={() => {
          finished = false;
          current = 0;
          back = false;
        }}
        class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pt-1 pb-1 rounded-md ml-1 mr-1"
      >
        Reset cards
      </button>
    </div>
  {/if}
</Container>

<svelte:window
  on:keydown={(e) => {
    if (type !== "Learn") {
    } else {
      // setFlip(flip);
    }
  }}
/>
