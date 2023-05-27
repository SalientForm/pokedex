import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../app';
import Pokedex from '../pokedex/pokedex';
import PokemonDetail from '../pokemon/detail/pokemon-detail';
import ErrorPage from './error-page/route-error';

export const pokedexRouter = createBrowserRouter([
  {
    path: '',
    element: <Navigate to='/pokedex/search' replace={true} />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'pokedex/search',
        element: <Pokedex />,
      },
      {
        path: 'pokemon/detail',
        element: <PokemonDetail />,
      },
      {
        path: 'pokemon/detail/:id',
        element: <PokemonDetail />,
      },
      {
        path: '*',
        element: <Navigate to='/pokedex/search' replace={false} />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/pokedex/search' replace={false} />,
    errorElement: <ErrorPage />,
  },
]);
