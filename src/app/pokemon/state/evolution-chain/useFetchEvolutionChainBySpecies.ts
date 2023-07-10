import { useState } from 'react';
import { getIdFromUrl } from "../../../common/helpers";
import { PokemonSpecies } from "../../../pokeapi/model";
import { evolutionChainApi } from "./evolution-chain.service";
// useDispatch then see if promise!
// export const fetchEvolutionChainBySpecies = async(speciesName:string) => {
  // const species= await evolutionChainApi.endpoints.fetchPokemonSpeciesByName.initiate(speciesName);
  // console.log('p', species);
  // const evolutionChainId = getIdFromUrl(species.evolution_chain.url);
  // const evolutionChain = await evolutionChainApi.endpoints.fetchEvolutionChainById.initiate(evolutionChainId);
};
//
// export function useFetchEvolutionChainBySpecies(speciesName: string) {
//   const [species, setSpecies] = useState<PokemonSpecies>(async () => {
//
//     return specicesResult;
//   });
//   const setValue = (value: PokemonSpecies | ((val: PokemonSpecies) => PokemonSpecies)) => {
//     setSpecies(value);
//   };
//   return [storedValue, setValue] as const;
// }
