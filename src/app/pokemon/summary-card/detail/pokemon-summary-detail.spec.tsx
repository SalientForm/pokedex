import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../../state/root-store';
import PokemonSummaryDetail from './pokemon-summary-detail';

describe('PokemonDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokemonSummaryDetail />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
