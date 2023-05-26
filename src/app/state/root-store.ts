import { configureStore } from '@reduxjs/toolkit';
import { POKEMON_INDEX_FEATURE_KEY, pokemonIndexReducer } from './pokemon-index/pokemon-index.slice';
import { POKEMON_FEATURE_KEY, pokemonReducer } from './pokemon/pokemon.slice';
import { VIEW_HISTORY_FEATURE_KEY, viewHistoryReducer } from './view-history/view-history.slice';

export type PokedexDispatch = typeof rootStore.dispatch;

export const rootStore = configureStore({
  reducer: {
    [POKEMON_FEATURE_KEY]: pokemonReducer,
    [POKEMON_INDEX_FEATURE_KEY]: pokemonIndexReducer,
    [VIEW_HISTORY_FEATURE_KEY]: viewHistoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
