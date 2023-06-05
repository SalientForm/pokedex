import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PokedexFeatureState } from '../../../state/pokedex-feature-state';
import { EvolutionChain } from './evolution-chain.model';

export const EVOLUTION_CHAIN_FEATURE_KEY = 'evolutionChain';

export type EvolutionChainEntity = EvolutionChain;

export interface EvolutionChainState extends EntityState<EvolutionChainEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const evolutionChainAdapter = createEntityAdapter<EvolutionChainEntity>();

export const fetchEvolutionChain = createAsyncThunk(
  'evolutionChain/fetchStatus',
  async (pokemonSpeciesName: string) => {
    // const basePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    // const loadedPokemon: PokemonEntity = await basePokemon.json();

    // TODO: obtain evolution chain
    // const evolutions= await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`);
    // loadedPokemon.evolutions = await evolutions.json();

    return Promise.resolve({} as EvolutionChainEntity);
  }
);

export const initialEvolutionChainState: EvolutionChainState = evolutionChainAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const evolutionChainSlice = createSlice({
  name: EVOLUTION_CHAIN_FEATURE_KEY,
  initialState: initialEvolutionChainState,
  reducers: {
    set: evolutionChainAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvolutionChain.pending, (state: EvolutionChainState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchEvolutionChain.fulfilled,
        (state: EvolutionChainState, action: PayloadAction<EvolutionChainEntity>) => {
          evolutionChainAdapter.setOne(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchEvolutionChain.rejected, (state: EvolutionChainState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message ?? '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const evolutionChainReducer = evolutionChainSlice.reducer;

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
 *   dispatch(evolutionChainActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const evolutionChainActions = evolutionChainSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllEvolutionChain);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = evolutionChainAdapter.getSelectors();

export const getEvolutionChainState = (rootState: PokedexFeatureState): EvolutionChainState =>
  rootState[EVOLUTION_CHAIN_FEATURE_KEY] as EvolutionChainState;

export const selectAllEvolutionChain = createSelector(getEvolutionChainState, selectAll);

export const selectEvolutionChainEntities = createSelector(getEvolutionChainState, selectEntities);
