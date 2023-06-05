import { fetchEvolutionChain, evolutionChainAdapter, evolutionChainReducer } from './evolution-chain.slice';

const testSpeciesName = 'test';
const mockEvolutionChain = { id: 1, chain: null, baby_trigger_item: null };

describe('evolutionChain reducer', () => {
  it('should handle initial state', () => {
    const expected = evolutionChainAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: '',
    });

    expect(evolutionChainReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchEvolutionChains', () => {
    let state = evolutionChainReducer(undefined, fetchEvolutionChain.pending(testSpeciesName, testSpeciesName));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: '',
        entities: {},
      })
    );

    state = evolutionChainReducer(
      state,
      fetchEvolutionChain.fulfilled(mockEvolutionChain, testSpeciesName, testSpeciesName)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: '',
        entities: { 1: mockEvolutionChain },
      })
    );

    state = evolutionChainReducer(
      state,
      fetchEvolutionChain.rejected(new Error('Uh oh'), testSpeciesName, testSpeciesName)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: mockEvolutionChain },
      })
    );
  });
});
