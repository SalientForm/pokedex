import {
  addPokemonViewHistoryItemByPokemonId,
  pokemonViewHistoryAdapter,
  PokemonViewHistoryEntity,
  pokemonViewHistoryReducer,
} from './pokemon-view-history.slice';

describe('pokemonViewHistory reducer', () => {
  it('should handle initial state', () => {
    const expected = pokemonViewHistoryAdapter.getInitialState({});

    expect(pokemonViewHistoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle addPokemonViewHistoryItemByPokemonId', () => {
    let state = pokemonViewHistoryReducer(undefined, addPokemonViewHistoryItemByPokemonId.pending('', 1));

    const mockViewHistoryItem: PokemonViewHistoryEntity = {
      id: '123XYZ',
      viewTimestamp: 123456,
      name: 'name',
      pokemonId: 1,
    };

    state = pokemonViewHistoryReducer(state, addPokemonViewHistoryItemByPokemonId.fulfilled([mockViewHistoryItem], '', 1));

    expect(state).toEqual(
      expect.objectContaining({
        entities: { [mockViewHistoryItem.id]: mockViewHistoryItem },
      })
    );
  });
});
