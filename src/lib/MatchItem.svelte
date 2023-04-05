<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { get, type Writable } from "svelte/store";
  import type { MatchItemPair } from "../routes/[userid]/[set]/match/+page.svelte";

  const matches: Writable<MatchItemPair[]> = getContext("matches");
  const aabb: (match: MatchItemPair) => boolean = getContext("aabb");
  const left: Writable<number> = getContext("left");

  export let text: string;
  export let index: number;
  export let term: boolean;
  export let x: number = 0;
  export let y: number = 0;

  let selected: boolean = false;
  let matched: boolean = false;

  onMount(() => {
    if (term) {
      $matches[index].term.w.set(ref.offsetWidth);
      $matches[index].term.h.set(ref.offsetHeight);
    } else {
      $matches[index].definition.w.set(ref.offsetWidth);
      $matches[index].definition.h.set(ref.offsetHeight);
    }
  });

  $: {
    if (term) {
      $matches[index].term.x.set(x);
      $matches[index].term.y.set(y);
    } else {
      $matches[index].definition.x.set(x);
      $matches[index].definition.y.set(y);
    }
  }

  $: {
    $matches[index].selected.set(selected);
  }

  $: {
    $matches[index].matched.subscribe(m => matched = m);
  }

  let ref: HTMLSpanElement;
</script>

{#if !matched}
  <span
    bind:this={ref}
    on:mousedown={() => {
      selected = true;
    }}
    class="absolute select-none cursor-move bg-undertone-color-dark p-1 max-w-sm rounded-lg"
    style="left: {x}px; top: {y}px"
  >
    {text}
  </span>
{/if}

<svelte:window
  on:mousemove|preventDefault={(e) => {
    if (!selected) return;
    x = e.clientX - ref.offsetWidth / 2;
    y = e.clientY - ref.offsetHeight / 2;
  }}
  on:mouseup={() => {
    if (selected || get($matches[index].selected)) {
      selected = false;
      if (get($matches[index].matched)) return;
      if (aabb($matches[index])) {
        $matches[index].matched.set(true);
        left.set($left - 1);
      }
    }
  }}
/>
