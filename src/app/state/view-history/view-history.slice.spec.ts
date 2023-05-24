import {
  addViewHistoryItemByPokemonId,
  viewHistoryAdapter,
  ViewHistoryEntity,
  viewHistoryReducer,
} from './view-history.slice';

describe('viewHistory reducer', () => {
  it('should handle initial state', () => {
    const expected = viewHistoryAdapter.getInitialState({});

    expect(viewHistoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchViewHistorys', () => {
    let state = viewHistoryReducer(
      undefined,
      addViewHistoryItemByPokemonId.pending('', 1)
    );

    const mockViewHistoryItem: ViewHistoryEntity = {
      id: '123XYZ',
      viewTimestamp: 123456,
      name: 'name',
      pokemonId: 1,
    };

    state = viewHistoryReducer(
      state,
      addViewHistoryItemByPokemonId.fulfilled([mockViewHistoryItem], '', 1)
    );

    expect(state).toEqual(
      expect.objectContaining({
        entities: { [mockViewHistoryItem.id]: mockViewHistoryItem },
      })
    );
  });
});
