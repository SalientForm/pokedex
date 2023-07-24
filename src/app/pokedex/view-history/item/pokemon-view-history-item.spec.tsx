import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../../state/root-store';
import PokemonViewHistoryItem from './pokemon-view-history-item';
import { PokemonViewHistoryEntity } from '../../state/pokemon-view-history/pokemon-view-history.slice';

const mockViewHistoryItem: PokemonViewHistoryEntity = {
  id: 'id',
  name: 'name',
  viewTimestamp: 123456,
  pokemonId: 1,
};

describe('ViewHistoryItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokemonViewHistoryItem onClick={()=> ({})} viewHistoryItem={mockViewHistoryItem} />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
