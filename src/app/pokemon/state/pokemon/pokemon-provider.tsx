import { createContext, PropsWithChildren } from 'react';
import { Pokemon } from '../../../pokeapi/model';
import { useFetchEvolutionChainBySpeciesQuery } from '../evolution-chain/evolution-chain.service';
import { useFetchPokemonByIdQuery } from './pokemon.service';

export const PokemonContext = createContext<Pokemon | undefined>(undefined);

export interface PokemonProviderProps extends PropsWithChildren {
  pokemonId?: number;
}

/**
 * - passing in a pokemon id will provide that pokemon
 * - the value from param will be used if id not passed in
 * -
 * - the pokemon will be fetched of not already
 *
 * @param props
 * @constructor
 */
export const PokemonProvider = (props: PokemonProviderProps) => {
  const pokemonId = props.pokemonId ?? 0;

  const {
    data: pokemon$,
    error: pokemon$Error,
    isLoading: pokemon$IsLoading,
  } = useFetchPokemonByIdQuery(pokemonId, { skip: pokemonId === 0 });

  // const speciesName = pokemon$IsLoading || !pokemon$ ? '' : pokemon$.species.name ?? '';
  // const {
  //   data: evolutionChain,
  //   error: evolutionChainError,
  //   isLoading: evolutionChainIsLoading,
  // } = useFetchEvolutionChainBySpeciesQuery(speciesName, { skip: pokemon$IsLoading || !pokemon$ });

  // if id is 0 either no Pokemon was selected, or we wish not to display
  // if (pokemon$IsLoading || props.pokemonId === 0) {
  //   return <></>;
  // } else if (pokemon$Error) {
  //   return <div>Pokemon fetch error?</div>;
  // }

  return <PokemonContext.Provider value={pokemon$}>{props.children}</PokemonContext.Provider>;
};
