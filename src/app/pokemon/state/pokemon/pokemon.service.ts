import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../../../pokeapi/model';


export const pokemonAdapter = createEntityAdapter<Pokemon>();

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchPokemonById: builder.query<Pokemon, number>({
      query: (id: number) => `pokemon/${id.toString()}`,
      extraOptions: {},
      transformResponse(response: Pokemon) {
        pokemonAdapter.upsertOne<EntityState<Pokemon>>(pokemonAdapter.getInitialState(), response);
        return response;
      },
      // TODO: fix 0 value result
    }),
  }),
});

export const { useFetchPokemonByIdQuery } = pokemonApi;
