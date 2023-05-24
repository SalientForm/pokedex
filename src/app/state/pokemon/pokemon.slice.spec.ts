import {
  fetchPokemonById,
  pokemonAdapter,
  pokemonReducer,
} from './pokemon.slice';

describe('pokemon reducer', () => {
  it('should handle initial state', () => {
    const expected = pokemonAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(pokemonReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPokemonById', () => {
    let state = pokemonReducer(undefined, fetchPokemonById.pending('', 1));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = pokemonReducer(
      state,
      fetchPokemonById.fulfilled({ id: 1, name: 'test' }, '', 1)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = pokemonReducer(
      state,
      fetchPokemonById.rejected(new Error('Uh oh'), '', 1)
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
