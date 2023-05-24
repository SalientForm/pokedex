import {
  fetchPokemonById,
  pokemonAdapter,
  pokemonReducer,
} from './pokemon.slice';

describe('pokemon reducer', () => {
  it('should handle initial state', () => {
    const expected = pokemonAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: ''
    });

    expect(pokemonReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPokemonById', () => {
    let state = pokemonReducer(undefined, fetchPokemonById.pending('', 1));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: '',
        entities: {},
      })
    );

    const mockPokemonEntity = { id: 1, name: 'test' };

    state = pokemonReducer(
      state,
      fetchPokemonById.fulfilled(mockPokemonEntity, '', 1)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: '',
        entities: { 1: mockPokemonEntity },
      })
    );

    state = pokemonReducer(
      state,
      fetchPokemonById.rejected(new Error('Uh oh'), '', 1)
    );

    console.log(state);

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: mockPokemonEntity },
      })
    );
  });
});
