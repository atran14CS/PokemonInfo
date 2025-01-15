import { useState } from 'react';
import { fetchPokemonDetails } from '../utils/pokemonUtils';
import './Searchbar.css';

const Searchbar = ({ setSearchActive, setSearchPokemon }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const searchRequest = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return [{
      number: data.id,
      name: data.name,
      sprite: data.sprites.other['official-artwork'].front_default
    }];
  };

  const filterRequest = async (filter) => {
    const url = `https://pokeapi.co/api/v2/type/${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemonList = data.pokemon.map(poke => poke.pokemon); // Map to get Pokémon URLs
    return await fetchPokemonDetails(pokemonList);
  };

  const handleSearch = async () => {
    let searchPokemon;
    if (filter === "default" || filter === "") {
      searchPokemon = await searchRequest();
    } else {
      searchPokemon = await filterRequest(filter);
    }
    setSearchPokemon(searchPokemon);
    setSearchActive(true);
  };

  return (
    <div id='searchbar'>
      <div>
        <input type="text" placeholder='Search Pokémon' onChange={e => setSearch(e.target.value)} />
        <select name="pokemonFilters" id="pokemonFilters" onChange={e => setFilter(e.target.value)}>
          <option value="default" selected>Filter</option>
          <optgroup label="Types">
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="thunder">Thunder</option>
            <option value="dragon">Dragon</option>
            <option value="steel">Steel</option>
            <option value="dark">Dark</option>
            <option value="psychic">Psychic</option>
            <option value="ghost">Ghost</option>
            <option value="fairy">Fairy</option>
          </optgroup>
        </select>
        <div className='control-container'>
          <button onClick={handleSearch} id='search-btn'>Search</button>
          <button onClick={() => { setSearchActive(false) }} id='home-btn'>Home</button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
