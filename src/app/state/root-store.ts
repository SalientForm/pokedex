import { configureStore } from '@reduxjs/toolkit';
import { POKEMON_INDEX_FEATURE_KEY, pokemonIndexReducer } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import {
  EVOLUTION_CHAIN_FEATURE_KEY,
  evolutionChainReducer
} from "../pokemon/state/evolution-chain/evolution-chain.slice";
import { POKEMON_FEATURE_KEY, pokemonReducer } from '../pokemon/state/pokemon/pokemon.slice';
import {
  POKEMON_VIEW_HISTORY_FEATURE_KEY,
  pokemonViewHistoryReducer,
} from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';

export type PokedexDispatch = typeof rootStore.dispatch;

export const rootStore = configureStore({
  reducer: {
    [POKEMON_FEATURE_KEY]: pokemonReducer,
    [POKEMON_INDEX_FEATURE_KEY]: pokemonIndexReducer,
    [POKEMON_VIEW_HISTORY_FEATURE_KEY]: pokemonViewHistoryReducer,
    [EVOLUTION_CHAIN_FEATURE_KEY]: evolutionChainReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
