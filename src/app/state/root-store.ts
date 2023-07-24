import { configureStore } from '@reduxjs/toolkit';
import { pokemonEvolutionChainApi } from "../pokemon/state/evolution-chain/evolution-chain.service";
import { pokemonApi } from '../pokemon/state/pokemon/pokemon.service';
import { POKEMON_INDEX_FEATURE_KEY, pokemonIndexReducer } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import {
  POKEMON_VIEW_HISTORY_FEATURE_KEY,
  pokemonViewHistoryReducer,
} from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';

export type PokedexDispatch = typeof rootStore.dispatch;

export const rootStore = configureStore({
  reducer: {
    [POKEMON_INDEX_FEATURE_KEY]: pokemonIndexReducer,
    [POKEMON_VIEW_HISTORY_FEATURE_KEY]: pokemonViewHistoryReducer,
    [pokemonEvolutionChainApi.reducerPath]: pokemonEvolutionChainApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(pokemonApi.middleware).concat(pokemonEvolutionChainApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});
