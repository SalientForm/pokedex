import { createContext, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
 * - passing in no pokemon id will provide the selectedPokemon tracked in the index store
 * - when the pokemon comes from the selectedPokemon, the view will be added to view history
 *
 * @param props
 * @constructor
 */
export const PokemonProvider = (props: PokemonProviderProps) => {
  const useSelectedPokemon = !props.pokemonId;
  const selectedPokemonId$ = useSelector(selectSelectedPokemonId);
  const pokemonId = props.pokemonId || selectedPokemonId$ || 0;

  const { data: pokemon$, error: pokemon$Error, isLoading: pokemon$IsLoading } = useFetchPokemonByIdQuery(pokemonId);

  const dispatch = useDispatch<PokedexDispatch>();

  useEffect(() => {
    if (selectedPokemonId$ && useSelectedPokemon) {
      dispatch(addPokemonViewHistoryItemByPokemonId(selectedPokemonId$));
    }
  }, [dispatch, useSelectedPokemon, selectedPokemonId$]);

  // if id is 0 either no pokemon was selected, or we wish not to display
  if (pokemonId === 0) {
    return <></>;
  } else if (pokemon$Error) {
    return <div>pokemon fetch error</div>;
  }

  return <PokemonContext.Provider value={pokemon$}>{props.children}</PokemonContext.Provider>;
};
