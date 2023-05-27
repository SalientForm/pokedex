import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { pokedexRouter } from './app/routing/root-router-config';
import { rootStore } from './app/state/root-store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={rootStore}>
    <StrictMode>
      <RouterProvider router={pokedexRouter} />
    </StrictMode>
  </Provider>
);
