import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
import { getIdFromUrl } from '../../../common/helpers';
import { PokeApiListResponse } from '../../../state/pokeapi.model';
import { PokedexFeatureState } from '../../../state/pokedex-feature-state';

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
  selected: number;
}

export const pokemonIndexAdapter = createEntityAdapter<PokemonIndexEntity>();

/**
 *
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

export const initialPokemonIndexState: PokemonIndexState = pokemonIndexAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
  selected: 1,
  ids: [],
  entities: {},
});

export const pokemonIndexSlice = createSlice({
  name: POKEMON_INDEX_FEATURE_KEY,
  initialState: initialPokemonIndexState,
  reducers: {
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

export const pokemonIndexActions = pokemonIndexSlice.actions;

const { selectIds, selectAll, selectEntities } = pokemonIndexAdapter.getSelectors();

export const selectPokemonIndexState = (rootState: PokedexFeatureState): PokemonIndexState =>
  rootState[POKEMON_INDEX_FEATURE_KEY] as PokemonIndexState;

export const selectAllPokemonIndex = createSelector(selectPokemonIndexState, selectAll);
export const selectPokemonIndexIds = createSelector(selectPokemonIndexState, selectIds);

export const selectPokemonIndexEntities = createSelector(selectPokemonIndexState, selectEntities);

export const selectPokemonFromIndexByName = (searchText: string, limit = 25) =>
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

export const selectSelectedPokemonId = createSelector(selectPokemonIndexState, (state) => state.selected);

export const selectPreviousPokemonId = createSelector(selectSelectedPokemonId, selectPokemonIndexIds, (currentId, ids) => {
  const currentIndex = ids.indexOf(currentId);
  if (currentIndex > 0) {
    return ids[currentIndex - 1];
  } else {
    return ids[ids.length - 1];
  }
});

export const selectNextPokemonId = createSelector(selectSelectedPokemonId, selectPokemonIndexIds, (currentId, ids) => {
  const currentIndex = ids.indexOf(currentId);
  if (currentIndex < ids.length - 1) {
    return ids[currentIndex + 1];
  } else {
    return ids[0];
  }
});
