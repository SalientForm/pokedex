import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PokedexFeatureState } from '../pokedex-feature-state';
import { selectPokemonIndexItemById } from '../pokemon-index/pokemon-index.slice';
import { v4 as uuidv4 } from 'uuid';

export const VIEW_HISTORY_FEATURE_KEY = 'viewHistory';

export interface ViewHistoryEntity {
  id: string;
  pokemonId: number;
  name: string;
  viewTimestamp: number;
}

export interface ViewHistoryState extends EntityState<ViewHistoryEntity> {}

export const viewHistoryAdapter = createEntityAdapter<ViewHistoryEntity>();

// TODO: migrate to regular thunk with redux-thunk
export const addViewHistoryItemByPokemonId = createAsyncThunk(
  'viewHistory/addHydratedItem',
  async (pokemonId: number, thunkAPI) => {
    const pokedexFeatureState: PokedexFeatureState = thunkAPI.getState() as PokedexFeatureState;
    const pokemonIndexItem = selectPokemonIndexItemById(pokemonId)(pokedexFeatureState);
    let viewHistory = selectAllViewHistory(pokedexFeatureState);
    viewHistory = viewHistory.filter((item) => item.pokemonId !== pokemonId);
    const newHistoryItem: ViewHistoryEntity = {
      id: uuidv4(),
      viewTimestamp: new Date().getTime(),
      pokemonId,
      name: pokemonIndexItem?.name ?? '',
    };
    viewHistory.push(newHistoryItem);
    viewHistory.sort((a, b) => b.viewTimestamp - a.viewTimestamp);
    return Promise.resolve(viewHistory);
  }
);

export const initialViewHistoryState: ViewHistoryState = viewHistoryAdapter.getInitialState({});

export const viewHistorySlice = createSlice({
  name: VIEW_HISTORY_FEATURE_KEY,
  initialState: initialViewHistoryState,
  reducers: {
    add: viewHistoryAdapter.addOne,
    remove: viewHistoryAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      addViewHistoryItemByPokemonId.fulfilled,
      (state: ViewHistoryState, action: PayloadAction<ViewHistoryEntity[]>) => {
        viewHistoryAdapter.setAll(state, action.payload);
      }
    );
  },
});

/*
 * Export reducer for store configuration.
 */
export const viewHistoryReducer = viewHistorySlice.reducer;

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
 *   dispatch(viewHistoryActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const viewHistoryActions = viewHistorySlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllViewHistory);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = viewHistoryAdapter.getSelectors();

export const getViewHistoryState = (rootState: PokedexFeatureState): ViewHistoryState =>
  rootState[VIEW_HISTORY_FEATURE_KEY];

export const selectAllViewHistory = createSelector(getViewHistoryState, selectAll);

export const selectViewHistoryEntities = createSelector(getViewHistoryState, selectEntities);
