import { fetchAllPokemonIndex, pokemonIndexAdapter, pokemonIndexReducer } from './pokemon-index.slice';

describe('pokemonIndex reducer', () => {
  it('should handle initial state', () => {
    const expected = pokemonIndexAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: '',
    });

    expect(pokemonIndexReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchAllPokemonIndex', () => {
    let state = pokemonIndexReducer(undefined, fetchAllPokemonIndex.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: '',
        entities: {},
      })
    );

    const mockPokemonIndex = { id: 1, name: 'name', url: 'url' };

    state = pokemonIndexReducer(state, fetchAllPokemonIndex.fulfilled([mockPokemonIndex], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: '',
        entities: { 1: mockPokemonIndex },
      })
    );

    state = pokemonIndexReducer(state, fetchAllPokemonIndex.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: mockPokemonIndex },
      })
    );
  });
});
