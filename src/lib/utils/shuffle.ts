import type { card } from "./testset";

export function shuffle (cards: card[]): card[] {
    let j, x, i;
    let temp = cards;
    for (i=temp.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = temp[i];
        temp[j] = temp[i];
        temp[j] = x;
    }
    return temp;
}