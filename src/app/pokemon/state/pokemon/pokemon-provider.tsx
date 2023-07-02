import { createContext, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Pokemon } from '../../../pokeapi/model';
import { useFetchPokemonByIdQuery } from './pokemon.service';
import { selectSelectedPokemonId } from '../../../pokedex/state/pokemon-index/pokemon-index.slice';
import { addPokemonViewHistoryItemByPokemonId } from '../../../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import { PokedexDispatch } from '../../../state/root-store';

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

  // if id is 0 either no Pokemon was selected, or we wish not to display
  if (pokemon$IsLoading || props.pokemonId === 0) {
    return <></>;
  } else if (pokemon$Error) {
    return <div>Pokemon fetch error?</div>;
  }

  return <PokemonContext.Provider value={pokemon$}>{props.children}</PokemonContext.Provider>;
};
