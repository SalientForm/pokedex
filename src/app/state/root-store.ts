import { configureStore } from '@reduxjs/toolkit';
import {
  POKEMON_INDEX_FEATURE_KEY,
  pokemonIndexReducer,
} from './index/pokemon-index.slice';
import { POKEMON_FEATURE_KEY, pokemonReducer } from './pokemon/pokemon.slice';
import {
  VIEW_HISTORY_FEATURE_KEY,
  viewHistoryReducer,
} from './view-history/view-history.slice';

export type PokedexDispatch = typeof rootStore.dispatch;

export const rootStore = configureStore({
  reducer: {
    [POKEMON_FEATURE_KEY]: pokemonReducer,
    [POKEMON_INDEX_FEATURE_KEY]: pokemonIndexReducer,
    [VIEW_HISTORY_FEATURE_KEY]: viewHistoryReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});
