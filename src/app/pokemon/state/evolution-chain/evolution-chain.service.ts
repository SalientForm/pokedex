import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { EvolutionChain, PokemonSpecies } from '../../../pokeapi/model';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchEvolutionChainBySpecies: builder.query<EvolutionChain, string>({
      async queryFn(pokemonSpeciesName: string, _queryApi, _extraOptions, fetchWithBQ) {
        const speciesResponse = await fetchWithBQ(`https://pokeapi.co/api/v2/evolution-chain/${pokemonSpeciesName}`);
        const species = speciesResponse.data as PokemonSpecies;
        const evolutionChainResponse = await fetchWithBQ(`https://pokeapi.co/api/v2/evolution-chain/${species.evolution_chain}`);
        return evolutionChainResponse.data
          ? { data: evolutionChainResponse.data as EvolutionChain }
          : { error: evolutionChainResponse.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useFetchEvolutionChainBySpeciesQuery } = pokemonApi;
