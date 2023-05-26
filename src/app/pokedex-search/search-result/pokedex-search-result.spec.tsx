import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../state/root-store';
import PokedexSearchResult, { PokedexSearchResultProps } from './pokedex-search-result';

const mockProps: PokedexSearchResultProps = { searchText: 'text' };

describe('PokedexSearchResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokedexSearchResult searchText={mockProps.searchText} />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
