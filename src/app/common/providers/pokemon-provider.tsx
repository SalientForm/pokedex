import { createContext, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelected, selectSelectedPokemon } from '../../pokedex/state/pokemon-index/pokemon-index.slice';
import { addPokemonViewHistoryItemByPokemonId } from '../../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import { fetchPokemonById, PokemonEntity, selectPokemonById } from '../../pokemon/state/pokemon/pokemon.slice';
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
  const selectedPokemonId$ = useSelector(selectSelected);
  const pokemonId = props.pokemonId || selectedPokemonId$ || 0;
  const pokemonSelector = useSelectedPokemon ? selectSelectedPokemon : selectPokemonById(pokemonId);
  const pokemon$ = useSelector(pokemonSelector);

  const dispatch = useDispatch<PokedexDispatch>();

  useEffect(() => {
    if (selectedPokemonId$ && useSelectedPokemon) {
      dispatch(addPokemonViewHistoryItemByPokemonId(selectedPokemonId$));
    }
  }, [dispatch, useSelectedPokemon, selectedPokemonId$]);

  useEffect(() => {
    if (!pokemon$ && pokemonId !== 0) {
      dispatch(fetchPokemonById(pokemonId));
    }
  }, [dispatch, pokemon$, pokemonId]);

  if (pokemon$ === undefined) {
    return <div></div>;
  }

  return <PokemonContext.Provider value={pokemon$}>{props.children}</PokemonContext.Provider>;
};
