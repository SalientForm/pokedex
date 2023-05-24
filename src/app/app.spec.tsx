import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app';
import { rootStore } from './state/root-store';

vi.mock('./pokedex/pokedex');

const getDefaultRender = () => render(
  <Provider store={rootStore}>
    <App />
  </Provider>
);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = getDefaultRender();
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = getDefaultRender();
    expect(getByText(/Pokédex/i)).toBeTruthy();
  });
});
