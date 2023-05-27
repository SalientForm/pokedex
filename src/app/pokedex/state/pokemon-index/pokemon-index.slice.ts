import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
import { PokeApiListResponse } from '../../../state/pokeapi.model';
import { PokedexFeatureState } from '../../../state/pokedex-feature-state';
import { selectPokemonEntities } from '../../../pokemon/state/pokemon/pokemon.slice';

export const POKEMON_INDEX_FEATURE_KEY = 'pokemonIndex';

/*
 * Update these interfaces according to your requirements.
 */
export interface PokemonIndexEntity {
  id: number;
  name: string;
  url: string;
}

export interface PokemonIndexState extends EntityState<PokemonIndexEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  selected?: number;
}

export const pokemonIndexAdapter = createEntityAdapter<PokemonIndexEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchPokemonIndex())
 * }, [dispatch]);
 * ```
 */
export const fetchAllPokemonIndex = createAsyncThunk('pokemonIndex/fetchStatus', async (_) => {
  // SUGGESTION: instead of utilizing fetch here, consider a query library or request library
  const POKEMON_LIMIT = 2000;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${POKEMON_LIMIT}`);
  const responseBody: PokeApiListResponse<PokemonIndexEntity[]> = await response.json();
  responseBody.results?.map((pokemonIndex) => {
    pokemonIndex.id = getIdFromUrl(pokemonIndex.url);
    return pokemonIndex;
  });
  const pokemonIndex: PokemonIndexEntity[] = responseBody.results ?? [];
  return Promise.resolve(pokemonIndex);
});

// NOTE: api does not provide id, only url
function getIdFromUrl(url: string) {
  const idIndex = url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1;
  return parseInt(url.substring(idIndex, url.length - 1) ?? 0);
}

export const initialPokemonIndexState: PokemonIndexState = pokemonIndexAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const pokemonIndexSlice = createSlice({
  name: POKEMON_INDEX_FEATURE_KEY,
  initialState: initialPokemonIndexState,
  reducers: {
    add: pokemonIndexAdapter.addOne,
    remove: pokemonIndexAdapter.removeOne,
    setSelectedPokemon(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemonIndex.pending, (state: PokemonIndexState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchAllPokemonIndex.fulfilled,
        (state: PokemonIndexState, action: PayloadAction<PokemonIndexEntity[]>) => {
          pokemonIndexAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchAllPokemonIndex.rejected, (state: PokemonIndexState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message ?? '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const pokemonIndexReducer = pokemonIndexSlice.reducer;
/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(pokemonIndexActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const pokemonIndexActions = pokemonIndexSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPokemonIndex);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = pokemonIndexAdapter.getSelectors();

export const selectPokemonIndexState = (rootState: PokedexFeatureState): PokemonIndexState =>
  rootState[POKEMON_INDEX_FEATURE_KEY] as PokemonIndexState;

export const selectAllPokemonIndex = createSelector(selectPokemonIndexState, selectAll);

export const selectPokemonIndexEntities = createSelector(selectPokemonIndexState, selectEntities);

export const selectPokemonFromIndexByName = (searchText: string, limit = 20) =>
  createSelector(selectPokemonIndexState, selectAllPokemonIndex, (state, pokemonIndex) => {
    const fuse = new Fuse(pokemonIndex, {
      keys: ['name'],
      findAllMatches: false,
      threshold: 0.4,
      distance: 3,
    });
    return fuse.search<PokemonIndexEntity>(searchText, { limit });
  });

export const selectPokemonIndexItemById = (pokemonId: number) =>
  createSelector(selectPokemonIndexEntities, (entities) => {
    return entities[pokemonId];
  });

export const selectSelected = createSelector(selectPokemonIndexState, (state) => state.selected);

// TODO: should be moved to different location because circular references can occur once many complex selectors are created
export const selectSelectedPokemon = createSelector(selectSelected, selectPokemonEntities, (id, pokemonEntities) => {
  return id ? pokemonEntities[id] : undefined;
});
