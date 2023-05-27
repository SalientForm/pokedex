import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PokedexFeatureState } from '../../../state/pokedex-feature-state';
import { selectPokemonIndexItemById } from '../pokemon-index/pokemon-index.slice';
import { v4 as uuidv4 } from 'uuid';

export const POKEMON_VIEW_HISTORY_FEATURE_KEY = 'pokemonViewHistory';

export interface PokemonViewHistoryEntity {
  id: string;
  pokemonId: number;
  name: string;
  viewTimestamp: number;
}

export type PokemonViewHistoryState = EntityState<PokemonViewHistoryEntity>;

export const pokemonViewHistoryAdapter = createEntityAdapter<PokemonViewHistoryEntity>();

// TODO: migrate to regular thunk with redux-thunk
export const addPokemonViewHistoryItemByPokemonId = createAsyncThunk(
  'pokemonViewHistory/addHydratedItem',
  async (pokemonId: number, thunkAPI) => {
    const pokedexFeatureState: PokedexFeatureState = thunkAPI.getState() as PokedexFeatureState;
    const pokemonIndexItem = selectPokemonIndexItemById(pokemonId)(pokedexFeatureState);
    let viewHistory = selectAllPokemonViewHistory(pokedexFeatureState);
    viewHistory = viewHistory.filter((item) => item.pokemonId !== pokemonId);
    const newHistoryItem: PokemonViewHistoryEntity = {
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

export const initialPokemonViewHistoryState: PokemonViewHistoryState = pokemonViewHistoryAdapter.getInitialState({});

export const pokemonViewHistorySlice = createSlice({
  name: POKEMON_VIEW_HISTORY_FEATURE_KEY,
  initialState: initialPokemonViewHistoryState,
  reducers: {
    add: pokemonViewHistoryAdapter.addOne,
    remove: pokemonViewHistoryAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      addPokemonViewHistoryItemByPokemonId.fulfilled,
      (state: PokemonViewHistoryState, action: PayloadAction<PokemonViewHistoryEntity[]>) => {
        pokemonViewHistoryAdapter.setAll(state, action.payload);
      }
    );
  },
});

export const pokemonViewHistoryReducer = pokemonViewHistorySlice.reducer;

export const pokemonViewHistoryActions = pokemonViewHistorySlice.actions;


const { selectAll, selectEntities } = pokemonViewHistoryAdapter.getSelectors();

export const selectPokemonViewHistoryState = (rootState: PokedexFeatureState): PokemonViewHistoryState =>
  rootState[POKEMON_VIEW_HISTORY_FEATURE_KEY];

export const selectAllPokemonViewHistory = createSelector(selectPokemonViewHistoryState, selectAll);

export const selectPokemonViewHistoryEntities = createSelector(selectPokemonViewHistoryState, selectEntities);
