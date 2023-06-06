import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../../../pokeapi/model';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchPokemonById: builder.query<Pokemon, number>({
      query: (id: number) => `pokemon/${id.toString()}`,
      extraOptions: {}
    }),
  }),
});

export const { useFetchPokemonByIdQuery } = pokemonApi;
