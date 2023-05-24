import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../state/root-store';
import ViewHistoryItem from './view-history-item';
import { ViewHistoryEntity } from '../../state/view-history/view-history.slice';

const mockViewHistoryItem: ViewHistoryEntity = {
  id: 'id',
  name: 'name',
  viewTimestamp: 123456,
  pokemonId: 1,
};

describe('ViewHistoryItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <ViewHistoryItem viewHistoryItem={mockViewHistoryItem} />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
