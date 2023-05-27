import { configureStore } from '@reduxjs/toolkit';
import { POKEMON_INDEX_FEATURE_KEY, pokemonIndexReducer } from '../pokedex/search/state/pokemon-index/pokemon-index.slice';
import { POKEMON_FEATURE_KEY, pokemonReducer } from '../pokemon/state/pokemon/pokemon.slice';
import { POKEMON_VIEW_HISTORY_FEATURE_KEY, pokemonViewHistoryReducer } from '../pokedex/view-history/state/view-history/view-history.slice';

export type PokedexDispatch = typeof rootStore.dispatch;

export const rootStore = configureStore({
  reducer: {
    [POKEMON_FEATURE_KEY]: pokemonReducer,
    [POKEMON_INDEX_FEATURE_KEY]: pokemonIndexReducer,
    [POKEMON_VIEW_HISTORY_FEATURE_KEY]: pokemonViewHistoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
