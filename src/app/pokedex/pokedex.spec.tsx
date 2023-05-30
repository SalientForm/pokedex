import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../state/root-store';
import Pokedex from './pokedex';

vi.mock('./search/pokedex-search');
vi.mock('./view-history/pokedex-pokemon-view-history');

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
