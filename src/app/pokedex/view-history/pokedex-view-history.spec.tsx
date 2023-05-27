import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootStore } from '../../state/root-store';
import PokedexViewHistory from './pokedex-view-history';

describe('PokedexViewHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={rootStore}>
        <PokedexViewHistory />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
