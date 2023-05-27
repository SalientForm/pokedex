import {
  addViewHistoryItemByPokemonId,
  viewHistoryAdapter,
  ViewHistoryEntity,
  pokemonViewHistoryReducer,
} from './view-history.slice';

describe('viewHistory reducer', () => {
  it('should handle initial state', () => {
    const expected = viewHistoryAdapter.getInitialState({});

    expect(pokemonViewHistoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchViewHistorys', () => {
    let state = pokemonViewHistoryReducer(undefined, addViewHistoryItemByPokemonId.pending('', 1));

    const mockViewHistoryItem: ViewHistoryEntity = {
      id: '123XYZ',
      viewTimestamp: 123456,
      name: 'name',
      pokemonId: 1,
    };

    state = pokemonViewHistoryReducer(state, addViewHistoryItemByPokemonId.fulfilled([mockViewHistoryItem], '', 1));

    expect(state).toEqual(
      expect.objectContaining({
        entities: { [mockViewHistoryItem.id]: mockViewHistoryItem },
      })
    );
  });
});
