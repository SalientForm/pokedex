import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { rootStore } from '../../../state/root-store';
import PokedexSearchResult, { PokedexSearchResultProps } from './pokedex-search-result';

const mockProps: PokedexSearchResultProps = { searchText: 'text' };

describe('PokedexSearchResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <MemoryRouter>
          <PokedexSearchResult searchText={mockProps.searchText} />
        </MemoryRouter>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
