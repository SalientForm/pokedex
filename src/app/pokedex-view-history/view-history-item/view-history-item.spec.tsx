import { render } from '@testing-library/react';
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
      <ViewHistoryItem viewHistoryItem={mockViewHistoryItem} />
    );
    expect(baseElement).toBeTruthy();
  });
});
