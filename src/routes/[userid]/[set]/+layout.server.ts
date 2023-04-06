import { testset } from "$lib/utils/testset"

export function load ({ params })  {
    return testset.sets[Number(params.set)]; 
}