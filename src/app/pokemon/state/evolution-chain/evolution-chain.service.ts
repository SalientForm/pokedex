// export const fetchEvolutionChain = createAsyncThunk(
//   'evolutionChain/fetchStatus',
//   async (pokemonSpeciesName: string, thunkAPI) => {
//     const speciesResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonSpeciesName}`);
//     const species = await speciesResponse.json();
//
//     const evolutionsResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${species.evolution_chain}`);
//     const evolutions = await evolutionsResponse.json();
//
//     return Promise.resolve({} as EvolutionChainEntity);
//   }
// );

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Pokemon } from '../../../pokeapi/model';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchPokemonById: builder.query<Pokemon, number>({
      query: (id: number) => `pokemon/${id.toString()}`,
      extraOptions: {},
    }),
  }),
});

export const { useFetchPokemonByIdQuery } = pokemonApi;
