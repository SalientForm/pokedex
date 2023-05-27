import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { rootStore } from './state/root-store';

const getDefaultRender = () =>
  render(
    <Provider store={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
