import { Reducer } from '@reduxjs/toolkit';
import { POKEMON_INDEX_FEATURE_KEY, PokemonIndexState } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import {
  POKEMON_VIEW_HISTORY_FEATURE_KEY,
  PokemonViewHistoryState,
} from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import { pokemonApi } from '../pokemon/state/pokemon/pokemon.service';

export interface PokedexFeatureState {
  [POKEMON_INDEX_FEATURE_KEY]: PokemonIndexState;
  [POKEMON_VIEW_HISTORY_FEATURE_KEY]: PokemonViewHistoryState;
  // [pokemonEvolutionChainApi.reducerPath]: Reducer,
  [pokemonApi.reducerPath]: Reducer;
}
