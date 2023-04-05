import { testset } from "$lib/testset"

export function load ({ params })  {
    return testset.sets[Number(params.set)]; 
}