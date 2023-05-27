import { POKEMON_INDEX_FEATURE_KEY, PokemonIndexState } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import { POKEMON_FEATURE_KEY, PokemonState } from '../pokemon/state/pokemon/pokemon.slice';
import {
  POKEMON_VIEW_HISTORY_FEATURE_KEY,
  PokemonViewHistoryState,
} from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';

export interface PokedexFeatureState {
  [POKEMON_FEATURE_KEY]: PokemonState;
  [POKEMON_INDEX_FEATURE_KEY]: PokemonIndexState;
  [POKEMON_VIEW_HISTORY_FEATURE_KEY]: PokemonViewHistoryState;
}
