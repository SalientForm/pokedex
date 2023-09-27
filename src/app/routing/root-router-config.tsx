import { createBrowserRouter, Navigate } from 'react-router-dom';
import Pokedex from '../pokedex/pokedex';
import Pokemon from '../pokemon/pokemon';
import ErrorPage from './error-page/route-error';
import React from 'react';
import Root from '../root';

export const pokedexRouter = createBrowserRouter([
  {
    path: '',
    element: <Navigate to='/pokedex/search' replace={true} />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'pokedex/search',
        element: <Pokedex />,
      },
      {
        path: 'pokemon',
        children: [
          {
            path: 'detail',
            element: <Pokemon />,
          },
          {
            path: 'detail/:id',
            element: <Pokemon />,
          },
        ],
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
