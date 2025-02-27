import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { rootStore } from './app/state/root-store';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={rootStore}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
