import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { PokedexDispatch, rootStore } from '../state/root-store';
import Pokemon from './pokemon';

describe('Pokemon', () => {
  it('should render successfully', () => {
    rootStore.dispatch = vi.fn() as PokedexDispatch;
    const { baseElement } = render(
      <Provider store={rootStore}>
        <Pokemon />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
