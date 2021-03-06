import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ContextPokemons } from "./GlobalContext";

//<img src = {pokemon.sprites.other.dream_world.front_default}></img> Caminho para imagens dos pokemos(estão com qualidade melhor)

const GlobalState = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemonData = async (results) => {
    const listPokemons = [...pokemons];
    await Promise.all(
      results.map(async (pokemon) => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        listPokemons.push(response.data);
      })
    );
    console.log(listPokemons); // tem detalhes sobre outras requisiçoes
    setPokemons(listPokemons);
  };

  const getPokemons = () => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        getPokemonData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const request = { pokemons, pokedex, setPokedex, setPokemons, loading };

  return (
    <div>
      <ContextPokemons.Provider value={request}>
        {props.children}
      </ContextPokemons.Provider>
    </div>
  );
};

export default GlobalState;
