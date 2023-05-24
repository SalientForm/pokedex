import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../state/root-store';
import PokedexSearch from './pokedex-search';

vi.mock('./pokedex-search-form/pokedex-search-form');
vi.mock('./search-result/pokedex-search-result');

describe('PokedexSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokedexSearch />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
