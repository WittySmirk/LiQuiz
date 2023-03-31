import { testset } from "$lib/testset"
import type { LayoutServerLoad } from "./$types"

export const load = (async ({ params }) => {
    return testset.sets[Number(params.set)];
    
}) satisfies LayoutServerLoad;