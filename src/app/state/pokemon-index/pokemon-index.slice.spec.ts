import {
  fetchAllPokemonIndex,
  pokemonIndexAdapter,
  pokemonIndexReducer,
} from './pokemon-index.slice';

describe('pokemonIndex reducer', () => {
  it('should handle initial state', () => {
    const expected = pokemonIndexAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(pokemonIndexReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchAllPokemonIndex', () => {
    let state = pokemonIndexReducer(
      undefined,
      fetchAllPokemonIndex.pending('')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = pokemonIndexReducer(
      state,
      fetchAllPokemonIndex.fulfilled([{ id: 1, name: 'name', url: 'url' }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = pokemonIndexReducer(
      state,
      fetchAllPokemonIndex.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
