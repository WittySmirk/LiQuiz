import type { card } from "./testset";

export function shuffle (cards: card[]): card[] {
    const copy = cards.slice();
    let result = [];
    while (copy.length > 0) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }
    return result;
}