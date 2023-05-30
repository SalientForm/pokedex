import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PokedexDispatch, rootStore } from '../../state/root-store';
import PokedexSearch from './pokedex-search';
import { PokedexSearchResultProps } from './result/pokedex-search-result';

vi.mock('./result/pokedex-search-result', () => ({
  default: (props: PokedexSearchResultProps) => <div data-testid='pokedexSearchResult'>{props.searchText}</div>,
}));

describe('PokedexSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render', () => {
    render(
      <Provider store={rootStore}>
        <PokedexSearch />
      </Provider>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates search text when a new value is inputted', () => {
    rootStore.dispatch = vi.fn() as PokedexDispatch;

    render(
      <Provider store={rootStore}>
        <PokedexSearch />
      </Provider>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'bulb' },
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByTestId('pokedexSearchResult').textContent).toEqual('bulb');
  });
});
