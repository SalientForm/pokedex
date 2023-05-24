import { render } from '@testing-library/react';
import PokedexSearchResult, {
  PokedexSearchResultProps,
} from './pokedex-search-result';

const mockProps: PokedexSearchResultProps = { searchText: 'text' };

describe('PokedexSearchResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PokedexSearchResult searchText={mockProps.searchText} />
    );
    expect(baseElement).toBeTruthy();
  });
});
