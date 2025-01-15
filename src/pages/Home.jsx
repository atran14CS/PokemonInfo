import { useEffect, useState } from 'react';
import Navbar from '../componets/Navbar';
import Searchbar from '../componets/Searchbar';
import Card from '../componets/Card';
import { fetchPokemonDetails } from '../utils/pokemonUtils';
import './home.css';

const Home = () => {
  const offsetArr = [0, 151, 251, 386, 493, 565, 651, 747, 867];
  const limitArr = [151, 100, 135, 107, 156, 72, 86, 96, 120];
  const [pokemon, setPokemon] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchPokemon, setSearchPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pokémon list based on generation
  const fetchAllGenerations = async () => {
    if (!searchActive) {
      setLoading(true);
      let allPokemon = [];
      for (let i = 0; i < offsetArr.length; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limitArr[i]}&offset=${offsetArr[i]}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.results) {
          const generationPokemon = await fetchPokemonDetails(data.results);
          allPokemon = [...allPokemon, ...generationPokemon];
        }
      }
      setPokemon(allPokemon);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGenerations();
  }, [searchActive]);

  return (
    <div>
      <Navbar />
      <Searchbar setSearchActive={setSearchActive} setSearchPokemon={setSearchPokemon}/>
      <div className="pokemon-list">
        {loading ? (
          <p>Please wait... Loading Pokémon data...</p>
        ) : (
          (searchActive ? searchPokemon : pokemon).map((poke, index) => (
            <Card key={index} name={poke.name} sprite={poke.sprite} id={poke.number} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
