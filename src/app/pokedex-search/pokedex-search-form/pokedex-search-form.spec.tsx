import { render } from '@testing-library/react';
import PokedexSearchForm, {
  PokedexSearchFormProps,
} from './pokedex-search-form';

const mockProps: PokedexSearchFormProps = {
  handlePokemonSearch: (searchText: string) => {
    return undefined;
  },
};

describe('PokedexSearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PokedexSearchForm handlePokemonSearch={mockProps.handlePokemonSearch} />
    );
    expect(baseElement).toBeTruthy();
  });
});
