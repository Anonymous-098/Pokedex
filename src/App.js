import React, { useEffect, useRef, useState } from "react";
import PokeBall from "./svgs/PokeBall";
import classes from "./App.module.css";
import Loader from "./components/Loader";
import PokemonList from "./components/PokemonList";
import PokemonInfo from "./components/PokemonInfo";
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [previousPokemon,setPreviousPokemon] = useState();

  var kantoLength = 151;

  // SECONDARY SOLUTION 

  async function getPokemon() {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + kantoLength
    );
    const data = await response.data;
    const result = await data.results;

    const promises = result.map(async (pokemon) => {
      const nestedResponse = await axios.get(pokemon.url);
      return nestedResponse;
    });

    const temp = await Promise.all(promises);

    temp.map((pokemon) => {
      var tempDesc;
      const doubleNestedResponse = axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.data.id
      );
      doubleNestedResponse.then(function (descData) {
        var desc = descData.data.flavor_text_entries.map(
          (flavor_text_array) => {
            if (flavor_text_array.language.name === "en") {
              return flavor_text_array.flavor_text;
            }
          }
        );
        var finalDesc = desc.filter(function (element) {
          return element !== undefined;
        });
        tempDesc = finalDesc[0];
      });

      var pokemonObject = {
        pokemonName: pokemon.data.name,
        pokemonData: pokemon.data,
        pokemonDesc: tempDesc,
        pokemonSprite: pokemon.data.sprites.versions["generation-v"]["black-white"].animated.front_default
      };
      sendData(pokemonObject);
    });
  }
  
  useEffect(() => {
    setIsLoading(true);
    getPokemon();
    setIsLoading(false);
  }, []);

  function sendData(pokeObj) {
    setPokemons((prevState) => {
      return [...prevState, pokeObj];
    });
  }

  const getPokemonIdHandler = (id) => {
    for (var i = 0; i < pokemons.length; i++) {
      if (pokemons[i].pokemonData.id === id) {
        setPreviousPokemon(currentPokemon);
        setCurrentPokemon(pokemons[i]);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && pokemons.length < kantoLength && <Loader />}
      {!isLoading && pokemons.length === kantoLength && (
        <>
          <div className={classes.pokeball}>
            <PokeBall />
          </div>
          <div className={classes.gridContainer}>
            <PokemonList
              getPokemonIdHandler={getPokemonIdHandler}
              pokemons={pokemons}
              setIsClicked={setIsClicked}
            />
            <PokemonInfo
              currentPokemonInfo={currentPokemon}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              previousPokemonInfo={previousPokemon}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;