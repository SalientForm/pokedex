import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../state/root-store';
import PokemonDetail from './pokemon-detail';

describe('PokemonDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokemonDetail />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
