import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Pokemon } from "../../../pokeapi/model";
import { PokedexFeatureState } from '../../../state/pokedex-feature-state';


export const POKEMON_FEATURE_KEY = 'pokemon';

/*
 * Update these interfaces according to your requirements.
 */
export interface PokemonEntity extends Partial<Pokemon> {
  id: number;
  name?: string;
}

export interface PokemonState extends EntityState<PokemonEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const pokemonAdapter = createEntityAdapter<PokemonEntity>();

export const fetchPokemonById = createAsyncThunk('pokemon/fetchStatus', async (pokemonId: number, thunkAPI) => {
  const pokedexFeatureState: PokedexFeatureState = thunkAPI.getState() as PokedexFeatureState;
  const cachedPokemon = selectPokemonById(pokemonId)(pokedexFeatureState);
  if (cachedPokemon) {
    return Promise.resolve(cachedPokemon);
  }

  const basePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const loadedPokemon: PokemonEntity = await basePokemon.json();

  return Promise.resolve(loadedPokemon);
});

export const initialPokemonState: PokemonState = pokemonAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const pokemonSlice = createSlice({
  name: POKEMON_FEATURE_KEY,
  initialState: initialPokemonState,
  reducers: {
    add: pokemonAdapter.addOne,
    remove: pokemonAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonById.pending, (state: PokemonState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchPokemonById.fulfilled, (state: PokemonState, action: PayloadAction<PokemonEntity>) => {
        pokemonAdapter.addOne(state, action.payload);
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchPokemonById.rejected, (state: PokemonState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message ?? '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const pokemonReducer = pokemonSlice.reducer;

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
 *   dispatch(pokemonActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const pokemonActions = pokemonSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPokemon);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = pokemonAdapter.getSelectors();

export const selectPokemonState = (rootState: PokedexFeatureState): PokemonState =>
  rootState[POKEMON_FEATURE_KEY] as PokemonState;

export const selectAllPokemon = createSelector(selectPokemonState, selectAll);

export const selectPokemonEntities = createSelector(selectPokemonState, selectEntities);

export const selectPokemonById = (pokemonId: number) =>
  createSelector(selectPokemonState, (state) => {
    return state.entities[pokemonId];
  });
