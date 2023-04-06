<script context="module" lang="ts">
  export type MatchItemType = {
    x: Writable<number>;
    y: Writable<number>;
    w: Writable<number>;
    h: Writable<number>;
  };

  export type MatchItemPair = {
    card: card;
    selected: Writable<boolean>;
    matched: Writable<boolean>;
    term: MatchItemType;
    definition: MatchItemType;
  };
</script>

<script lang="ts">
  import { get, writable, type Writable } from "svelte/store";
  import { onMount, setContext } from "svelte";
  import MatchItem from "$lib/MatchItem.svelte";
  import  type { card } from "$lib/utils/testset.js";
  import { shuffle } from "$lib/utils/shuffle.js";

  let width: number;
  let height: number;
  let cards: card[] = [];
  const matches: Writable<MatchItemPair[]> = writable([]);
  const left: Writable<number> = writable();

  export let data;
  function makeCards(cards: card[]) {
    let newCards: card[] = shuffle(cards);
    if (newCards.length > 5) {
      return newCards.slice(0, 5);
    } else {
      return newCards;
    }
  }

  function makeMatches(): MatchItemPair[] {
    let matches: MatchItemPair[] = [];
    for (let i = 0; i < cards.length; i++) {
      matches.push({
        card: cards[i],
        selected: writable(false),
        matched: writable(false),
        term: {
          x: writable(Math.floor(Math.random() * width)),
          y: writable(Math.floor(Math.random() * height)),
          w: writable(0),
          h: writable(0),
        },
        definition: {
          x: writable(Math.floor(Math.random() * width)),
          y: writable(Math.floor(Math.random() * height)),
          w: writable(0),
          h: writable(0),
        },
      });
    }
    return matches;
  }

  function aabb(match: MatchItemPair): boolean {
    const term = {
      x: get(match.term.x),
      y: get(match.term.y),
      w: get(match.term.w),
      h: get(match.term.h),
    };
    const definition = {
      x: get(match.definition.x),
      y: get(match.definition.y),
      w: get(match.definition.w),
      h: get(match.definition.h),
    };

    if (
      term.x + term.w > definition.x &&
      term.x < definition.x + definition.w &&
      term.y + term.h > definition.y &&
      term.y < definition.y + definition.h
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  onMount(() => {
    cards = makeCards(data!.cards);
    matches.set(makeMatches());
    left.set(cards.length);
  });

  setContext("matches", matches);
  setContext("aabb", aabb);
  setContext("left", left);
</script>

<h1>Match</h1>

{#each $matches as match, index}
  <MatchItem
    text={match.card.term}
    {index}
    term={true}
    x={get(match.term.x)}
    y={get(match.term.y)}
  />
  <MatchItem
    text={match.card.definition}
    {index}
    term={false}
    x={get(match.definition.x)}
    y={get(match.definition.y)}
  />
{/each}

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
