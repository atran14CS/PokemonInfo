
export const fetchPokemonDetails = async (pokemonList) => {
    const promises = pokemonList.map(async (pokemon) => {
      const url = pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch data for ${pokemon.name}`);
        const details = await res.json();
        return {
          number: details.id,
          name: details.name,
          sprite: details.sprites.other['official-artwork'].front_default,
        };
      } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}:`, error);
        return null;
      }
    });
    const results = await Promise.all(promises);
    return results.filter(pokemon => pokemon !== null);
  };