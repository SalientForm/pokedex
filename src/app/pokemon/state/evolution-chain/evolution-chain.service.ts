
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
