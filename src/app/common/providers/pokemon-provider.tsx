import { createContext, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchPokemonByIdQuery } from '../../pokemon/state/pokemon/pokemon.service';
import { selectSelectedPokemonId } from '../../pokedex/state/pokemon-index/pokemon-index.slice';
import { addPokemonViewHistoryItemByPokemonId } from '../../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import { PokemonEntity } from '../../pokemon/state/pokemon/pokemon.slice';
import { PokedexDispatch } from '../../state/root-store';

export const PokemonContext = createContext<PokemonEntity | undefined>(undefined);

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

  if (pokemon$IsLoading) {
    return <div>Loading</div>;
  } else if(pokemon$Error) {
    return <div>Error</div>;
  }

  return <PokemonContext.Provider value={pokemon$}>{props.children}</PokemonContext.Provider>;
};
