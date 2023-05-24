import {
  POKEMON_INDEX_FEATURE_KEY,
  PokemonIndexState,
} from './pokemon-index/pokemon-index.slice';
import { POKEMON_FEATURE_KEY, PokemonState } from './pokemon/pokemon.slice';
import {
  VIEW_HISTORY_FEATURE_KEY,
  ViewHistoryState,
} from './view-history/view-history.slice';

export interface PokedexFeatureState {
  [POKEMON_FEATURE_KEY]: PokemonState;
  [POKEMON_INDEX_FEATURE_KEY]: PokemonIndexState;
  [VIEW_HISTORY_FEATURE_KEY]: ViewHistoryState;
}
