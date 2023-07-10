import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { EvolutionChain, PokemonSpecies } from '../../../pokeapi/model';

export const evolutionChainApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetchEvolutionChainBySpecies: builder.query<EvolutionChain, string>({
      async queryFn(pokemonSpeciesName: string, _queryApi, _extraOptions, fetchWithBQ) {
        console.log('pokemonSpeciesName', pokemonSpeciesName);
        const speciesResponse = await fetchWithBQ(`https://pokeapi.co/api/v2/pokemon-species/${pokemonSpeciesName}`);
        const species = speciesResponse.data as PokemonSpecies;
        console.log('speciesResponse', species);
        const evolutionChainResponse = await fetchWithBQ(`${species.evolution_chain.url}`);
        console.log('evolutionChainResponse', evolutionChainResponse.data);
        return evolutionChainResponse.data
          ? { data: evolutionChainResponse.data as EvolutionChain }
          : { error: evolutionChainResponse.error as FetchBaseQueryError };
      },
    }),
    fetchEvolutionChainById: builder.query<PokemonSpecies, number>({
      query: (evolutionChainId: number) => `evolution-chain/${evolutionChainId}`,
      extraOptions: {},
    }),
    fetchPokemonSpeciesByName: builder.query<PokemonSpecies, string>({
      query: (pokemonSpeciesName: string) => `pokemon-species/${pokemonSpeciesName}`,
      extraOptions: {},
    }),

  }),
});

export const { useFetchEvolutionChainBySpeciesQuery } = evolutionChainApi;

