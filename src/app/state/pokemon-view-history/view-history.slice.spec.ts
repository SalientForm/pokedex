import {
  fetchViewHistory,
  viewHistoryAdapter,
  viewHistoryReducer,
} from './view-history.slice';

describe('viewHistory reducer', () => {
  it('should handle initial state', () => {
    const expected = viewHistoryAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(viewHistoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchViewHistorys', () => {
    let state = viewHistoryReducer(
      undefined,
      fetchViewHistory.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = viewHistoryReducer(
      state,
      fetchViewHistory.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = viewHistoryReducer(
      state,
      fetchViewHistory.rejected(new Error('Uh oh'), null, null)
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
