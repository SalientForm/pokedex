import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../state/root-store';
import Pokedex from './pokedex';

vi.mock('../pokedex-search/pokedex-search');
vi.mock('../pokedex-view-history/pokedex-view-history');
vi.mock('../pokemon-detail/pokemon-detail');

describe('Pokedex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <Pokedex />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
